<div class="group relative max-w-[fit-content]">
	<input type="text" class="peer px-3 py-3 outline-none" placeholder="" />

	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label
		class="pointer-events-none absolute top-px left-[9px] -translate-y-1/2 transform px-1 text-sm text-gray-500 transition-all duration-300
    group-focus-within:!top-px group-focus-within:!text-sm group-focus-within:!text-blue-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xl"
		>Label</label>

	<!--This fieldset+legend is used for the the border and notch transition-->
	<fieldset
		class="pointer-events-none invisible absolute inset-0 mt-[-9px] rounded border border-gray-400 group-focus-within:border-2
    group-focus-within:!border-blue-500 group-hover:border-gray-700 peer-placeholder-shown:visible">
		<legend
			class="invisible ml-2 max-w-[0.01px] px-0 text-sm whitespace-nowrap transition-all duration-300 group-focus-within:max-w-full group-focus-within:px-1"
			>Label</legend>
	</fieldset>

	<!--This fieldset+legend always has a notch and is shown when the input is filled, instead of the other, so the notch doesnt vanish when you unfocus the field-->
	<fieldset
		class="pointer-events-none visible absolute inset-0 mt-[-9px] rounded border border-gray-400 group-focus-within:border-2
    group-focus-within:!border-blue-500 group-hover:border-gray-700 peer-placeholder-shown:invisible">
		<legend class="invisible ml-2 max-w-full px-1 text-sm whitespace-nowrap">Label</legend>
	</fieldset>
</div>
