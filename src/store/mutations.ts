import { MutationTree } from 'vuex'
import { State, TodoEntry } from './state'

export enum MutationType {
    CreateTodoEntry = 'CREATE_TODO_ENTRY',
    DeleteTodoEntry = 'DELETE_TODO_ENTRY',
    SetTodoList = 'SET_TODO_LIST',
    UpdateTodoEntry = 'COMPLETE_TODO_ENTRY',
    SetLoading = 'SET_LOADING'
}

export type Mutations = {
  [MutationType.CreateTodoEntry](state: State, TodoEntry: TodoEntry): void
  [MutationType.DeleteTodoEntry](state: State, id: number): void
  [MutationType.SetTodoList](state: State, TodoList: TodoEntry[]): void
  [MutationType.UpdateTodoEntry](
    state: State,
    TodoEntry: Partial<TodoEntry> & { id: number }
  ): void
  [MutationType.SetLoading](state: State, value: boolean): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.CreateTodoEntry](state, TodoEntry) {
      state.TodoList.unshift(TodoEntry)
    },
    [MutationType.DeleteTodoEntry](state, id) {
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
    }
  }