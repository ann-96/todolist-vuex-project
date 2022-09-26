export type TodoEntry = {
  id:        number
  text:      string
  completed: boolean
}

export type TodoEntryLocal = Partial<TodoEntry>
   & { edit?: boolean }

export type Pages = {
  count:          number
  completedCount: number
}

export type authData = {
  login:       string
  password:    string
  password2:   string
}

export type State = {
  loading:     boolean
  TodoList:    TodoEntryLocal[]
  maxPage:     number
  currentPage: number
  maxOnPage:   number
  pages:       Pages
  uuid:        string
  authdata:    authData
}

export const state: State = {
  loading:     false,
  TodoList:    [],
  maxPage:     0,
  currentPage: 0,
  maxOnPage :  5,
  pages: {
    completedCount: 0,
    count:          0
  },
  uuid: "",
  authdata : {
    login:      "",
    password:   "",
    password2:  ""
  },
}