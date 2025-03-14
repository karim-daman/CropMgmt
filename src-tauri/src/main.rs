use std::process::Command;
use serde::{Serialize, Deserialize};
use sha2::{Sha256, Digest};
use serde_json::{Map, Value};
use std::error::Error;

#[derive(Serialize, Deserialize)]
struct HardwareFingerprint {
    motherboard_product: String,
    motherboard_serial: String,
    disks: Vec<DiskInfo>,
}

#[derive(Serialize, Deserialize)]
struct DiskInfo {
    model: String,
    serial: String,
}

#[tauri::command]
async fn generate_hardware_fingerprint() -> Result<serde_json::Value, String> {
    // Collect hardware information
    let mut fingerprint = HardwareFingerprint {
        motherboard_product: get_motherboard_product().unwrap_or_default(),
        motherboard_serial: get_motherboard_serial().unwrap_or_default(),
        disks: Vec::new(),
    };

    // Get Disk Information for all internal disks
    let disk_models = get_disk_models().unwrap_or_default();
    let disk_serials = get_disk_serials().unwrap_or_default();

    for (model, serial) in disk_models.iter().zip(disk_serials.iter()) {
        fingerprint.disks.push(DiskInfo {
            model: model.clone(),
            serial: serial.clone(),
        });
    }

    // Convert the HardwareFingerprint struct to a serde_json::Value
    let mut map = Map::new();
    map.insert("motherboard_product".to_string(), Value::String(fingerprint.motherboard_product));
    map.insert("motherboard_serial".to_string(), Value::String(fingerprint.motherboard_serial));

    let mut disks_array = Vec::new();
    for disk in fingerprint.disks {
        let mut disk_map = Map::new();
        disk_map.insert("model".to_string(), Value::String(disk.model));
        disk_map.insert("serial".to_string(), Value::String(disk.serial));
        disks_array.push(Value::Object(disk_map));
    }
    map.insert("disks".to_string(), Value::Array(disks_array));

    // Print the JSON string
    println!("{}", serde_json::to_string(&map).map_err(|e| e.to_string())?);

    // Return the JSON value
    Ok(Value::Object(map))
}

#[cfg(target_os = "windows")]
fn get_motherboard_product() -> Result<String, String> {
    let output = Command::new("wmic")
        .args(&["baseboard", "get", "product"])
        .output()
        .map_err(|e| e.to_string())?;
    let output_str = String::from_utf8_lossy(&output.stdout);
    let product = output_str.lines().nth(1).unwrap_or("").trim().to_string();
    Ok(product)
}

#[cfg(target_os = "windows")]
fn get_motherboard_serial() -> Result<String, String> {
    let output = Command::new("wmic")
        .args(&["baseboard", "get", "serialnumber"])
        .output()
        .map_err(|e| e.to_string())?;
    let output_str = String::from_utf8_lossy(&output.stdout);
    let serial = output_str.lines().nth(1).unwrap_or("").trim().to_string();
    Ok(serial)
}

#[cfg(target_os = "windows")]
fn get_disk_models() -> Result<Vec<String>, String> {
    let output = Command::new("wmic")
        .args(&["diskdrive", "get", "model"])
        .output()
        .map_err(|e| e.to_string())?;
    let output_str = String::from_utf8_lossy(&output.stdout);
    let models: Vec<String> = output_str.lines()
        .skip(1)
        .filter_map(|line| {
            let trimmed = line.trim();
            if !trimmed.is_empty() {
                Some(trimmed.to_string())
            } else {
                None
            }
        })
        .collect();
    Ok(models)
}

#[cfg(target_os = "windows")]
fn get_disk_serials() -> Result<Vec<String>, String> {
    let output = Command::new("wmic")
        .args(&["diskdrive", "get", "serialnumber"])
        .output()
        .map_err(|e| e.to_string())?;
    let output_str = String::from_utf8_lossy(&output.stdout);
    let serials: Vec<String> = output_str.lines()
        .skip(1)
        .filter_map(|line| {
            let trimmed = line.trim();
            if !trimmed.is_empty() {
                Some(trimmed.to_string())
            } else {
                None
            }
        })
        .collect();
    Ok(serials)
}

/// Hashes a JSON fingerprint using SHA-256 and returns the hash as a hex string.
fn hash_fingerprint(fingerprint: &Value) -> Result<String, Box<dyn Error>> {
    // Convert the JSON fingerprint to a string
    let fingerprint_json = serde_json::to_string(fingerprint)?;

    // Hash the JSON string using SHA-256
    let mut hasher = Sha256::new();
    hasher.update(fingerprint_json.as_bytes());
    let hash = hasher.finalize();

    // Convert the hash to a hex string
    let hash_hex = format!("{:x}", hash);
    Ok(hash_hex)
}

#[tauri::command]
async fn verify_hardware_fingerprint(provided_hash: String) -> Result<String, String> {
    // Generate the current fingerprint
    let current_fingerprint = match generate_hardware_fingerprint().await {
        Ok(fingerprint) => fingerprint,
        Err(e) => return Err(format!("Failed to generate hardware fingerprint: {}", e)),
    };

    // Parse the fingerprint JSON
    let current_fingerprint_json: serde_json::Value = match serde_json::from_str(&current_fingerprint.to_string()) {
        Ok(json) => json,
        Err(e) => return Err(format!("Failed to parse fingerprint JSON: {}", e)),
    };

    // Hash the current fingerprint JSON
    let current_hash = match hash_fingerprint(&current_fingerprint_json) {
        Ok(hash) => hash,
        Err(e) => return Err(format!("Failed to hash fingerprint: {}", e)),
    };

    // Compare the provided hash with the current hash
    if provided_hash == current_hash {
        Ok("Hardware verification successful.".to_string())
    } else {
        Err("Hardware verification failed.".to_string())
    }
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(desktop)]
            app.handle().plugin(tauri_plugin_updater::Builder::new().build())?;
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![generate_hardware_fingerprint,verify_hardware_fingerprint])
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_process::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}