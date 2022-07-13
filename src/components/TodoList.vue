<template>
  <TodoEntry v-for="Entry in TodoList" :key="Entry" v-bind="Entry" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import TodoEntry from './TodoEntry.vue'
export default defineComponent({
  components: { TodoEntry },
  setup() {
    const store = useStore()
    const TodoList = computed(() => store.state.TodoList)
    return { TodoList }
  }
})
</script>