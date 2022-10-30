import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { State, TodoEntry, Pages, TodoEntryLocal } from './state'
import { useStore } from '@/store'
import { useCookies } from "vue3-cookies"
import { authClient, clientWithAuth } from '../http/http-client';
import { notify } from "@kyvg/vue3-notification";

export enum ActionTypes {
  GetTodoList = 'GET_TODO_LIST',
  UpdateTodoEntry = 'UPDATE_TODO_ENTRY',
  DeleteTodoEntry = 'DELETE_TODO_ENTRY',
  CreateTodoEntry = 'CREATE_TODO_ENTRY',
  PreviousPage = 'PREVIOUS_PAGE',
  NextPage = 'NEXT_PAGE',
  Login = 'LOGIN',
  Register = 'REGISTER',
  Logout = 'LOGOUT'
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
    TodoEntry: TodoEntryLocal
  ): void
  [ActionTypes.CreateTodoEntry](
    context: ActionAugments,
    todoEntry: TodoEntry
  ): void
  [ActionTypes.DeleteTodoEntry](
    context: ActionAugments,
    id: number 
  ): void
  [ActionTypes.PreviousPage](context: ActionAugments): void
  [ActionTypes.NextPage](context: ActionAugments): void
  [ActionTypes.Login](context: ActionAugments): void
  [ActionTypes.Register](context: ActionAugments): void
  [ActionTypes.Logout](context: ActionAugments): void
}
  
export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetTodoList]({ commit }) {
    commit(MutationType.SetLoading, true)

    const recordsOnPage = useStore().state.maxOnPage
    const currentPage = useStore().state.currentPage
    try{
    const response = await clientWithAuth(useStore().state.uuid).get(`/list?start=${recordsOnPage*currentPage}&count=${recordsOnPage}`)
    if (response.status === 200) {
      commit(MutationType.SetTodoList, <TodoEntryLocal[]>response.data.list)

      const pages = <Pages>{
        count:         response.data.count,
        completedCount:response.data.completedCount
      }
      commit(MutationType.SetCompletedCount, pages)

      const count = <number>response.data.count
      const maxPage = count/recordsOnPage - ((count%recordsOnPage > 0) ? 0 : 1)
      commit(MutationType.SetMaxPage, maxPage)
      
    } else if (response.status === 401) {
      notify({
        title:"Authorization",
        text: "You were logged out",
      });
      commit(MutationType.SetUUID, "")
    } else {
      notify({
        title:`Error code:${response.status}`,
        text: `The server returned an error.\n <br> data: ${response.data}`,
      });
    }
  } catch(err) {
    notify({
      title:`Error while making the request: ${(<Error>err).name}`,
      text: (<Error>err).message
    });
  }
    commit(MutationType.SetLoading, false)
  },

  async [ActionTypes.UpdateTodoEntry]({ commit }, todoEntry) {
    commit(MutationType.SetLoading, true)
    try {
    const response = await clientWithAuth(useStore().state.uuid).post("/update", <TodoEntry>todoEntry )
    if (response.status === 200) {
      const data = <TodoEntryLocal>response.data
      data.edit = todoEntry.edit

      const oldEntry = <TodoEntryLocal>useStore().state.TodoList.find(elem => elem.id == data.id)
      if (oldEntry.completed !== todoEntry.completed) {
        const pages = <Pages>{
          count:         useStore().state.pages.count,
          completedCount:useStore().state.pages.completedCount  
        }
        if (todoEntry.completed) {
          pages.completedCount++
        } else {
          pages.completedCount--
        }
        commit(MutationType.SetCompletedCount, pages)
      }

      commit(MutationType.UpdateTodoEntry, data)
    }  else if (response.status === 401) {
      notify({
        title:"Authorization",
        text: "You were logged out",
      });
      commit(MutationType.SetUUID, "")
    } else {
      notify({
        title:`Error code:${response.status}`,
        text: `The server returned an error.\n <br> data: ${response.data}`,
      });
    }
  } catch(err) {
    notify({
      title:`Error while making the request: ${(<Error>err).name}`,
      text: (<Error>err).message
    });
  }
    commit(MutationType.SetLoading, false)
  },

  async [ActionTypes.CreateTodoEntry]({ commit, dispatch }, TodoEntry) {
    commit(MutationType.SetLoading, true)
    try {
    const response = await clientWithAuth(useStore().state.uuid).post("/add", TodoEntry )
    if (response.status === 200) {
      dispatch(ActionTypes.GetTodoList)
    }  else if (response.status === 401) {
      notify({
        title:"Authorization",
        text: "You were logged out",
      });
      commit(MutationType.SetUUID, "")
    } else {
      notify({
        title:`Error code:${response.status}`,
        text: `The server returned an error.\n <br> data: ${response.data}`,
      });
    }
  } catch(err) {
    notify({
      title:`Error while making the request: ${(<Error>err).name}`,
      text: (<Error>err).message
    });
  }
    commit(MutationType.SetLoading, false)
  },

  async [ActionTypes.DeleteTodoEntry]({ commit, dispatch }, id) {
    commit(MutationType.SetLoading, true)
    try {
    const response = await clientWithAuth(useStore().state.uuid).post("/delete", {id: id})
    if (response.status === 200) {
      commit(MutationType.DeleteTodoEntry, id)      
      dispatch(ActionTypes.GetTodoList)
    }  else if (response.status === 401) {
      notify({
        title:"Authorization",
        text: "You were logged out",
      });
      commit(MutationType.SetUUID, "")
    } else {
      notify({
        title:`Error code:${response.status}`,
        text: `The server returned an error.\n <br> data: ${response.data}`,
      });
    }
  } catch(err) {
    notify({
      title:`Error while making the request: ${(<Error>err).name}`,
      text: (<Error>err).message
    });
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
  },

  async [ActionTypes.Login]({ commit, dispatch }) {
    commit(MutationType.SetLoading, true)
    try {
      const response = await authClient.post("/login", {
        "login":    useStore().state.authdata.login,
        "password": useStore().state.authdata.password
      })
      if (response.status === 200) {
        commit(MutationType.SetUUID, response.data)
        dispatch(ActionTypes.GetTodoList)
        notify({
          title:"Login",
          text: "You successfully logged in",
        });
      } else {
        notify({
          title:`Error code:${response.status}`,
          text: `The server returned an error.\n <br> data: ${response.data}`,
        });
      }
    } catch(err) {
      notify({
        title:`Error while making the request: ${(<Error>err).name}`,
        text: (<Error>err).message
      });
    }

    commit(MutationType.SetLoading, false)
  },

  async [ActionTypes.Register]({ commit, dispatch }) {
    commit(MutationType.SetLoading, true)
    try {
      const response = await authClient.post("/register", {
        login:     useStore().state.authdata.login,
        password:  useStore().state.authdata.password,
        password2: useStore().state.authdata.password2
      })
      if (response.status === 201) {
        dispatch(ActionTypes.Login)
        notify({
          title:"Registration",
          text: "You successfully registered an account",
        });
      } else {
        notify({
          title:`Error code:${response.status}`,
          text: `The server returned an error.\n <br> data: ${response.data}`,
        });
      }
    } catch(err) {
      notify({
        title:`Error while making the request: ${(<Error>err).name}`,
        text: (<Error>err).message
      });
    }
    commit(MutationType.SetLoading, false)
  },

  async [ActionTypes.Logout]({ commit }) {
    commit(MutationType.SetLoading, true)
    const { cookies } = useCookies()

    try {
      const response = await authClient.post("/logout")
      if (response.status === 204) {
        notify({
          title:"Logout",
          text: "You successfully logged out",
        });
      } else {
        notify({
          title:"Logout",
          text: `You successfully logged out but the server returned code ${response.status}`,
        });
      }
    } catch(err) {
      notify({
        title:`Error while making the request: ${(<Error>err).name}`,
        text: (<Error>err).message
      });
    }

      commit(MutationType.SetUUID, "")
      cookies.set("Authorization", "null")
      commit(MutationType.SetLoading, false)
  },
}