<template>
  <form class="my-4" @submit.prevent="createTask">
    <div class="mx-auto flex text-center bg-white p-2 rounded-md shadow-md">
      <div class="flex-grow m-1 ml-3">
        <input
          v-model="text"
          class="w-full focus:outline-none"
          type="text"
          placeholder="What task do you need to complete?"
        />
      </div>
      <div class="flex-shrink-0">
        <button
          type="submit"
          class="btn btn-primary"
        >
          Add
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { TodoEntry } from '@/store/state'
import { ActionTypes } from '@/store/actions'
export default defineComponent({
  setup() {
    const text = ref('')
    const store = useStore()
    const createTask = () => {
      if (text.value === '') return
      const TodoEntry: TodoEntry = {
        id: Date.now(),
        text: text.value,
        completed: false
      }
      store.dispatch(ActionTypes.CreateTodoEntry, TodoEntry)
      text.value = ''
    }
    return { createTask, text }
  }
})
</script>