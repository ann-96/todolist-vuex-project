import { MutationTree } from 'vuex'
import { State, Pages, TodoEntryLocal, authData } from './state'
import { useCookies } from "vue3-cookies"

export enum MutationType {
    CreateTodoEntry = 'CREATE_TODO_ENTRY',
    DeleteTodoEntry = 'DELETE_TODO_ENTRY',
    SetTodoList = 'SET_TODO_LIST',
    UpdateTodoEntry = 'COMPLETE_TODO_ENTRY',
    SetLoading = 'SET_LOADING',
    SetPage = 'SET_PAGE',
    SetMaxPage = 'SET_MAX_PAGE',
    SetCompletedCount = 'SET_COMPLETED_COUNT',
    SetEntriesOnPage = 'SET_ENTRIES_ON_PAGE',
    SetUUID = 'SET_UUID',
    SetAuthData = 'SET_AUTH_DATA',
}

export type Mutations = {
  [MutationType.CreateTodoEntry](state: State, TodoEntry: TodoEntryLocal): void
  [MutationType.DeleteTodoEntry](state: State, id: number): void
  [MutationType.SetTodoList](state: State, TodoList: TodoEntryLocal[]): void
  [MutationType.UpdateTodoEntry](
    state: State,
    TodoEntry: TodoEntryLocal
  ): void
  [MutationType.SetLoading](state: State, value: boolean): void
  [MutationType.SetPage](state: State, val: number): void
  [MutationType.SetMaxPage](state: State, val: number): void
  [MutationType.SetCompletedCount](state: State, data: Pages): void
  [MutationType.SetEntriesOnPage](state: State, val: number): void
  [MutationType.SetUUID](state: State, val: string): void
  [MutationType.SetAuthData](state: State, data: authData): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.CreateTodoEntry](state, TodoEntry) {
      state.TodoList.unshift(TodoEntry)
    },
    [MutationType.DeleteTodoEntry](state, id) {
      const TodoEntryIdx = state.TodoList.findIndex(entry => entry.id === id)
      if (state.TodoList[TodoEntryIdx].completed) {
        state.pages.completedCount--
      }
      state.pages.count--

      state.TodoList = state.TodoList.filter(entry => entry.id !== id)
    },
    [MutationType.SetTodoList](state, TodoList) {
      state.TodoList = TodoList
    },
    [MutationType.UpdateTodoEntry](state, newTodoEntry) {
      const TodoEntryIdx = state.TodoList.findIndex(entry => entry.id === newTodoEntry.id)
      if (TodoEntryIdx === -1) return
      state.TodoList[TodoEntryIdx] = { ...state.TodoList[TodoEntryIdx], ...newTodoEntry }
    },
    [MutationType.SetLoading](state, value) {
      state.loading = value
    },
    [MutationType.SetPage](state, val) {
      state.currentPage = Math.floor(val)
    },
    [MutationType.SetMaxPage](state, val) {
      state.maxPage = Math.floor(val)
    },
    [MutationType.SetCompletedCount](state, pages) {
      state.pages.count = Math.floor(pages.count)
      state.pages.completedCount = Math.floor(pages.completedCount)
    },
    [MutationType.SetEntriesOnPage](state, val) {
      state.maxOnPage = Math.floor(val)
    },
    [MutationType.SetUUID](state, uuid) {
      state.uuid = uuid
      useCookies().cookies.set("auth", uuid)
    },
    [MutationType.SetAuthData](state, data) {
      state.authdata = data
    },
  }