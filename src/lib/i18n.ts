// import { derived, writable } from "svelte/store";
// import translations from "./translations";

// export const locale = writable("en");
// export const locales = Object.keys(translations);

// function translate(locale, key, vars) {
//   // Let's throw some errors if we're trying to use keys/locales that don't exist.
//   // We could improve this by using Typescript and/or fallback values.
//   if (!key) throw new Error("no key provided to $t()");
//   if (!locale) throw new Error(`no translation for key "${key}"`);

//   // Grab the translation from the translations object.
//   let text = translations[locale][key];

//   if (!text) throw new Error(`no translation found for ${locale}.${key}`);

//   // Replace any passed in variables in the translation string.
//   Object.keys(vars).map((k) => {
//     const regex = new RegExp(`{{${k}}}`, "g");
//     text = text.replace(regex, vars[k]);
//   });

//   return text;
// }

// export const translation = derived(
//   locale,
//   ($locale) =>
//     (key, vars = {}) =>
//       translate($locale, key, vars)
// );

import { derived, writable } from 'svelte/store';

// Define types for translations and locale
type translations = Record<string, Record<string, string>>;
type Locale = string;

// Load translations (assuming translations are in a separate file)
import translations from './translations';

// Function to get the saved locale from localStorage or default to "en"
const getSavedLocale = (): Locale => {
	const savedLocale = localStorage.getItem('locale');
	return savedLocale || 'en'; // Default to "en" if no locale is saved
};

// Create a writable store for the locale, initialized with the saved locale
export const locale = writable<Locale>(getSavedLocale());

// Save the locale to localStorage whenever it changes
locale.subscribe((value) => {
	localStorage.setItem('locale', value);
});

// List of available locales
export const locales: Locale[] = Object.keys(translations);

// Function to translate a key for a given locale
function translate(locale: Locale, key: string, vars: Record<string, string> = {}): string {
	if (!key) throw new Error('no key provided to $t()');
	if (!locale) throw new Error(`no translation for key "${key}"`);

	// Grab the translation from the translations object
	const text = translations[locale]?.[key];

	if (!text) throw new Error(`no translation found for ${locale}.${key}`);

	// Replace any passed-in variables in the translation string
	return Object.keys(vars).reduce((result, k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		return result.replace(regex, vars[k]);
	}, text);
}

// Derived store for translations
export const translation = derived(
	locale,
	($locale) =>
		(key: string, vars: Record<string, string> = {}) =>
			translate($locale, key, vars)
);
