import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { State, TodoEntry } from './state'

export enum ActionTypes {
  GetTodoList = 'GET_TODO_LIST',
  UpdateTodoEntry = 'UPDATE_TODO_ENTRY',
  DeleteTodoEntry = 'DELETE_TODO_ENTRY'
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
}
  
export type Actions = {
  [ActionTypes.GetTodoList](context: ActionAugments): void
  [ActionTypes.UpdateTodoEntry](
    context: ActionAugments,
    TodoEntry: Partial<TodoEntry> & { id: number }
  ): void
  [ActionTypes.DeleteTodoEntry](
    context: ActionAugments,
    id: number 
  ): void
}
  
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  
export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetTodoList]({ commit }) {
    commit(MutationType.SetLoading, true)

    await sleep(1000)

    commit(MutationType.SetLoading, false)
    commit(MutationType.SetTodoList, [
      {
        id: 1,
        text: 'Create an app',
        completed: true
      }
    ])
  },
  async [ActionTypes.UpdateTodoEntry]({ commit }, TodoEntry) {
    commit(MutationType.UpdateTodoEntry, TodoEntry)
  },

  async [ActionTypes.DeleteTodoEntry]({ commit }, id) {
    commit(MutationType.DeleteTodoEntry, id)
  }
}
  