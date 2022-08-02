export type TodoEntry = {
  id:        number
  text:      string
  completed: boolean
}

export type Pages = {
  count:          number
  completedCount: number
}

export type State = {
  loading:     boolean
  TodoList:    TodoEntry[]
  maxPage:     number
  currentPage: number
  pages:       Pages
}

export const state: State = {
  loading:     false,
  TodoList:    [],
  maxPage:     0,
  currentPage: 0,
  pages: {
    completedCount: 0,
    count:          0
  }
}