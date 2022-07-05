<template>
	<div class="wrapper">
		<div class="inner">
			<input
				type="text"
				class="input"
				v-model="searchInput"
				@focus="toogleFocusSearch(true)"
				@blur="toogleFocusSearch(false)"
			/>
		</div>

		<div v-show="focusSearch" class="wrapper-options">
			<div
				class="searched-option"
				v-for="element in searchedList()"
				:key="element.id"
				@click="setSearchedData({ id: element.id, name: element[propSearch] })"
			>
				<span>{{ element[propSearch] }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from '../store'
export default {
	props: {
		dataType: String,
		propSearch: String,
		setData: Function,
		hold: Boolean,
	},
	setup(props) {
		const store = useStore()
		const data = computed(() => store.getters[props.dataType])
		let searchInput = ref('')
		const focusSearch = ref(false)

		const searchedList = () => {
			return data.value.filter((element) => {
				if (searchInput.value === '') return false
				return element[props.propSearch].includes(searchInput.value)
			})
		}

		const toogleFocusSearch = (input) => {
			if (input === false) {
				setTimeout(function () {
					focusSearch.value = input
				}, 200)
			} else {
				searchInput.value = ''
				focusSearch.value = input
			}
		}

		const setSearchedData = (data) => {
			searchInput.value = data.name
			props.setData(data)
		}

		return {
			toogleFocusSearch,
			setSearchedData,
			searchedList,
			focusSearch,
			searchInput,
			data,
		}
	},
}
</script>

<style scoped>
.wrapper {
	width: 15rem;
}
.wrapper-options {
	width: 15rem;
	background: #2c3e50;
	color: white;
	position: absolute;
	z-index: 1;
}

.searched-option:hover {
	background: white;
	color: black;
	cursor: pointer;
}
</style>
