import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { State, TodoEntry, Pages } from './state'
import { useStore } from '@/store'
import HttpClient from '../http/http-client';

export enum ActionTypes {
  GetTodoList = 'GET_TODO_LIST',
  UpdateTodoEntry = 'UPDATE_TODO_ENTRY',
  DeleteTodoEntry = 'DELETE_TODO_ENTRY',
  CreateTodoEntry = 'CREATE_TODO_ENTRY',
  PreviousPage = 'PREVIOUS_PAGE',
  NextPage = 'NEXT_PAGE'
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
  [ActionTypes.PreviousPage](context: ActionAugments): void
  [ActionTypes.NextPage](context: ActionAugments): void
}
  
export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetTodoList]({ commit }) {
    commit(MutationType.SetLoading, true)

    const recordsOnPage = 5
    const currentPage = useStore().state.currentPage

    const response = await HttpClient.get(`/list?start=${recordsOnPage*currentPage}&count=${recordsOnPage}`)
    if (response.status === 200) {
      commit(MutationType.SetTodoList, <TodoEntry[]>response.data.list)

      const pages = <Pages>{
        count:         response.data.count,
        completedCount:response.data.completedCount
      }
      commit(MutationType.SetCompletedCount, pages)

      const count = <number>response.data.count
      const maxPage = count/recordsOnPage - ((count%recordsOnPage > 0) ? 0 : 1)
      commit(MutationType.SetMaxPage, maxPage)
      
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

  async [ActionTypes.CreateTodoEntry]({ commit, dispatch }, TodoEntry) {

    commit(MutationType.SetLoading, true)

    const response = await HttpClient.post("/add", TodoEntry )
    if (response.status === 200) {
      dispatch(ActionTypes.GetTodoList)
    }

    commit(MutationType.SetLoading, false)
  },

  async [ActionTypes.DeleteTodoEntry]({ commit, dispatch }, id) {
    commit(MutationType.SetLoading, true)

    const response = await HttpClient.post("/delete", {id: id})
    if (response.status === 200) {
      commit(MutationType.DeleteTodoEntry, id)      
      dispatch(ActionTypes.GetTodoList)
    }

    commit(MutationType.SetLoading, false)
  },

  async [ActionTypes.PreviousPage]({ commit, dispatch }) {
    commit(MutationType.SetLoading, true)

    const val = useStore().state.currentPage - 1
    commit(MutationType.SetPage, val)
    dispatch(ActionTypes.GetTodoList)

    commit(MutationType.SetLoading, false)
  },

  async [ActionTypes.NextPage]({ commit, dispatch }) {
    commit(MutationType.SetLoading, true)

    const val = useStore().state.currentPage + 1
    commit(MutationType.SetPage, val)
    dispatch(ActionTypes.GetTodoList)

    commit(MutationType.SetLoading, false)
  }
}
  