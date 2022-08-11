<template>
  <TodoEntry v-for="Entry in TodoList" :key="Entry" v-bind="Entry" />
  <PageSwitcher 
    v-bind:maxPage="Pages.maxPage.value" 
    v-bind:currentPage="Pages.currentPage.value" 
    :key="Pages" 
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import TodoEntry from './TodoEntry.vue'
import PageSwitcher from './PageSwitcher.vue'
export default defineComponent({
  components: { TodoEntry, PageSwitcher },
  setup() {
    const store = useStore()
    const Pages = {
        maxPage: computed(() => store.state.maxPage),
        currentPage: computed(() => store.state.currentPage),
    }
    const TodoList = computed(() => store.state.TodoList)

    const completedCount = computed(() => store.getters.completedCount)
    const totalCount = computed(() => store.getters.totalCount)

    return { TodoList, Pages, completedCount, totalCount }
  }
})
</script>