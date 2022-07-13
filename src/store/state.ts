export type TodoEntry = {
    id: number
    text: string
    completed: boolean
}

export type State = {
    loading: boolean
    TodoList: TodoEntry[]
}

export const state: State = {
    loading: false,
    TodoList: []
}