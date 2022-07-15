import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { State, TodoEntry } from './state'
import HttpClient from '../http/http-client';

export enum ActionTypes {
  GetTodoList = 'GET_TODO_LIST',
  UpdateTodoEntry = 'UPDATE_TODO_ENTRY',
  DeleteTodoEntry = 'DELETE_TODO_ENTRY',
  CreateTodoEntry = 'CREATE_TODO_ENTRY'
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
  [ActionTypes.CreateTodoEntry](
    context: ActionAugments,
    TodoEntry: TodoEntry
  ): void
  [ActionTypes.DeleteTodoEntry](
    context: ActionAugments,
    id: number 
  ): void
}
  
export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetTodoList]({ commit }) {
    commit(MutationType.SetLoading, true)

    const response = await HttpClient.get("/list")
    if (response.status === 200) {
      commit(MutationType.SetTodoList, <TodoEntry[]>response.data)
    }

    commit(MutationType.SetLoading, false)
  },
  async [ActionTypes.UpdateTodoEntry]({ commit }, TodoEntry) {
    commit(MutationType.SetLoading, true)

    const response = await HttpClient.post("/update", TodoEntry )
    if (response.status === 200) {
      commit(MutationType.UpdateTodoEntry, <TodoEntry>response.data)
    }

    commit(MutationType.SetLoading, false)
  },

  async [ActionTypes.CreateTodoEntry]({ commit }, TodoEntry) {

    commit(MutationType.SetLoading, true)

    const response = await HttpClient.post("/add", TodoEntry )
    if (response.status === 200) {
      commit(MutationType.CreateTodoEntry, <TodoEntry>response.data)
    }

    commit(MutationType.SetLoading, false)
  },

  async [ActionTypes.DeleteTodoEntry]({ commit }, id) {
    commit(MutationType.SetLoading, true)

    const response = await HttpClient.post("/delete", {id: id})
    if (response.status === 200) {
      commit(MutationType.DeleteTodoEntry, id)
    }

    commit(MutationType.SetLoading, false)
  }
}
  