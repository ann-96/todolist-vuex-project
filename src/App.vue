<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useCookies } from "vue3-cookies"
import CompletedCount from './components/CompletedCount.vue'
import LoginForm from './components/LoginForm.vue'
import DropDownList from './components/DropDownList.vue'
import NewTodoEntry from './components/NewTodoEntry.vue'
import TodoList from './components/TodoList.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import { useStore } from './store'
import { ActionTypes } from './store/actions'
export default defineComponent({
  components: { LoginForm, CompletedCount, TodoList, NewTodoEntry, DropDownList, LoadingScreen },
  setup() {
    const store = useStore()
    const { cookies } = useCookies()
    const loading = computed(() => store.state.loading)
    const isAutorized = computed(() => store.state.uuid !== "")
    onMounted(() => {
      let authorized = isAutorized.value;
      let authCookie = cookies.get("auth")
      
      if (authCookie != "null") {
        console.log(authCookie)
        authorized = true;
        store.state.uuid = authCookie;
      }
      if (authorized) {
        store.dispatch(ActionTypes.GetTodoList)
        cookies.set("auth", store.state.uuid)
      }
    })
    const completedCount = computed(() => store.getters.completedCount)
    const totalCount = computed(() => store.getters.totalCount)
    return { loading, isAutorized, completedCount, totalCount, cookies }
  }
})
</script>

<template>
  <notifications duration="15000"/>
  <div class="container mx-auto mt-4 dash_main">
    <h1 class="text-3xl text-center p-2 font-bold">
      Vue 3+Vuex Todo List App
    </h1>
  </div>
  <div v-if="loading">
    <p class="text-center mt-5">
      <LoadingScreen
      v-bind:loading="loading"      
       />
    </p>
  </div>
  <div class="text-center" v-else>
    <div v-if="!isAutorized">
      <LoginForm />
    </div>
    <div v-else>
      <CompletedCount
      v-bind:completedCount="completedCount"
      v-bind:totalCount    ="totalCount"
      />
      <DropDownList />
      <NewTodoEntry />
      <TodoList />
    </div>
  </div>
</template>

<style scoped>
.dash_main {
  background: #fafafa;
  flex: 1 1 100%;
  margin: 0;
  position: relative;
}
</style>