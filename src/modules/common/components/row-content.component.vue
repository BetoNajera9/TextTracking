<template>
	<tr class="border border-black">
		<td
			v-for="(value, key) in orderedContent"
			:key="key"
			class="border border-black">
			<span v-show="!editing || editing !== content.id">{{ value }}</span>
		</td>
		<td class="flex">
			<mdicon
				name="pencil"
				v-show="!editing || editing !== content.id"
				@click="activateEdition(content.id)"
				class="text-black cursor-pointer" />
			<mdicon
				name="check"
				v-show="editing === content.id"
				@click="applyChanges(content.id)"
				class="cursor-pointer text-green-500" />
			<mdicon
				name="close"
				v-show="editing === content.id"
				@click="desactivateEdition()"
				class="cursor-pointer text-red-400" />
			<mdicon
				name="delete"
				v-show="editing === content.id"
				@click="deleteCustomer()"
				class="cursor-pointer text-red-600" />
		</td>
	</tr>
</template>

<script lang="ts">
import { computed, ref } from 'vue'

import { toUpperCaseFirstLetter, toPascalCase } from '@common/utils'
import { useMainStore } from '@/store'

export default {
	name: 'RowContent',

	props: {
		type: String,
		content: {
			type: Object,
			required: true,
		},
	},

	setup(props) {
		const mainStore = useMainStore()
		const stores = mainStore.getStores()
		const appStore = stores.appStore
		const store = stores[`${props.type}Store`]

		const orderedContent = computed(() => {
			const orderedKeys = ['name', 'phone', 'address']

			const data = orderedKeys.reduce(
				(obj, key) => ({ ...obj, [key]: props.content[key] }),
				{}
			)

			return toPascalCase(data)
		})

		const editing = computed(() => appStore.edition)
		const dataToEdit = ref(props.content)

		const activateEdition = () => {
			if (!editing.value) appStore.activateEdition(props.content.id)
		}

		const desactivateEdition = () => {
			appStore.desactivateEdition()
		}

		const applyChanges = () => {
			store.updateCustomer(dataToEdit.value)

			desactivateEdition()
		}

		const deleteCustomer = () => {
			store.deleteCustomer(props.content.id)

			desactivateEdition()
		}

		// TODO: Hacer delete edit, update edit, applyChanges and cancel changes

		return {
			desactivateEdition,
			activateEdition,
			orderedContent,
			deleteCustomer,
			applyChanges,
			dataToEdit,
			editing,
		}
	},
}
</script>
