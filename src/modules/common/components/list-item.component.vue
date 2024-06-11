<template>
	<li class="relative h-12 w-full mb-0 list-none leading-12">
		<router-link
			:to="link"
			:class="{'bg-black': iconSelected, 'text-white': iconSelected}"
			class="text-black flex items-center no-underline transition-all duration-200 ease-in rounded-md whitespace-nowrap hover:bg-black hover:text-white">
			<div class="flex items-center">
				<mdicon
					class="rounded-md leading-12 text-center flex justify-center items-center h-12 w-12"
					:name="iconName"
					@mouseover="showTooltip = true"
					@mouseout="showTooltip = false" />
			</div>
			<span
				:class="{ 'opacity-100': sideBar, 'opacity-0': !sideBar }"
				class="transition-all duration-300 ease-in"
				>{{ linkName }}</span
			>
		</router-link>
		<span
			:class="{ 'opacity-100': showTooltip, 'opacity-0': !showTooltip }"
			class="tooltip absolute left-32 top-2 transform -translate-x-1/2 rounded-md h-9 w-32 bg-black text-white leading-9 text-center shadow-md transition-none pointer-events-none block"
			>{{ linkName }}</span
		>
	</li>
</template>

<script>
import { reactive, watch, toRefs, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
	props: {
		link: String,
		iconName: String,
		linkName: String,
		sideBar: Boolean,
	},

	setup(props) {
		const iconSelected = ref(false)
		const location = useRoute()

		watch(
			() => location.path,
			(newPath) => {
				iconSelected.value = newPath === props.link ? true : false
			}
		)

		const state = reactive({
			showTooltip: false,
		})

		watch(
			() => props.sideBar,
			(newVal) => {
				if (newVal) {
					state.showTooltip = false
				}
			}
		)

		return {
			...toRefs(state),
			iconSelected,
		}
	},
}
</script>
