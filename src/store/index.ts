import {
	createStore,
	Store as VuexStore,
	CommitOptions,
	DispatchOptions,
} from 'vuex'

import { Mutations, mutations } from './mutations'
import { Getters, getters } from './getters'
import { Actions, actions } from './actions'
import { State, state } from './state'

export const store = createStore({
	state,
	getters,
	mutations,
	actions,
	modules: {},
})

export type Store = Omit<
	VuexStore<State>,
	'commit' | 'getters' | 'dispatch'
> & {
	commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
		key: K,
		payload: P,
		options?: CommitOptions
	): ReturnType<Mutations[K]>
} & {
	getters: {
		[K in keyof Getters]: ReturnType<Getters[K]>
	}
} & {
	dispatch<K extends keyof Actions>(
		key: K,
		payload: Parameters<Actions[K]>[1],
		options?: DispatchOptions
	): ReturnType<Actions[K]>
}

export function useStore() {
	return store as Store
}
