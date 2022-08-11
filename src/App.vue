<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'

import CompletedCount from './components/CompletedCount.vue'
import DropDownList from './components/DropDownList.vue'
import NewTodoEntry from './components/NewTodoEntry.vue'
import TodoList from './components/TodoList.vue'
import { useStore } from './store'
import { ActionTypes } from './store/actions'
export default defineComponent({
  components: { CompletedCount, TodoList, NewTodoEntry, DropDownList },
  setup() {
    const store = useStore()
    const loading = computed(() => store.state.loading)
    onMounted(() => store.dispatch(ActionTypes.GetTodoList))
    const completedCount = computed(() => store.getters.completedCount)
    const totalCount = computed(() => store.getters.totalCount)
    return { loading, completedCount, totalCount }
  }
})
</script>

<template>
  <div class="container mx-auto mt-4 dash_main">
    <h1 class="text-3xl text-center p-2 font-bold">
      Vue 3+Vuex Todo List App
    </h1>

    <div v-if="loading">
      <p class="text-center mt-5">
        <pulse-loader></pulse-loader>
      </p>
    </div>
    <div class="text-center" v-else>
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