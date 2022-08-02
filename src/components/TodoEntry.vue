<template>
  <div
    class="flex text-center bg-white rounded-md shadow-md m-2 p-1 border-4"
    :class="completed ? 'border-green-500' : 'border-white'"
  >
    <div class="flex-shrink-0 m-1 ml-3 align-middle">
      <input
        type="checkbox"
        :checked="completed"
        @change="toggleCompletion()"
      />
    </div>
    <div class="ml-6">
      <h4 class="text-xl text-gray-900 leading-tight">{{ text }}</h4>
    </div>
    <div class="ml-6">      
      <button 
        type="button" 
        class="btn btn-danger"
        @click="deleteEntry()">
        Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { ActionTypes } from '@/store/actions'

export default defineComponent({
  props: {
    id: { type: Number, required: true },
    text: { type: String, required: true },
    completed: { type: Boolean, required: true }
  },
  setup(props) {
    const store = useStore()

    const toggleCompletion = () => {
      store.dispatch(ActionTypes.UpdateTodoEntry, {
        id: props.id,
        text: props.text,
        completed: !props.completed
      })
    }

    const deleteEntry = () => {
      store.dispatch(ActionTypes.DeleteTodoEntry, props.id)
    }

    return { toggleCompletion, deleteEntry }
  }
})
</script>
