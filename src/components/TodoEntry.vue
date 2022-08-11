<template>
  <div class="flex text-center bg-white rounded-md shadow-md m-2 p-1 border-4 entry">
    <div class="flex-shrink-0 m-1 ml-3 align-middle">
      <input
        type="checkbox"
        :checked="completed"
        @change="toggleCompletion()"
      />
    </div>
    <div v-if="!edit">
      <div class="ml-6">
        <h4
          class="text-xl text-gray-900 leading-tight"
          @dblclick="toggleEdit()">
          {{ text }}
        </h4>
        <button 
          type="button" 
          class="btn btn-danger"
          @click="deleteEntry()">
          Delete
        </button>
      </div>
    </div>
    <div v-else>
      <div class="ml-6">
        <form class="my-4" @submit.prevent="toggleEdit">
          <input
            v-model="input"
            class="w-full focus:outline-none"
            type="text"
          />      
          <button 
            type="button" 
            class="btn btn-success"
            @click="toggleEdit()">
            Save
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, ref } from 'vue'
import { useStore } from '@/store'
import { ActionTypes } from '@/store/actions'

export default defineComponent({
  props: {
    id: { type: Number, required: true },
    text: { type: String, required: true },
    completed: { type: Boolean, required: true },
    edit: { type: Boolean, required: false }
  },
  setup(props) {
    const store = useStore()

    const textRef = toRef(props, 'text')
    const input = ref('')
    input.value = textRef.value

    const toggleCompletion = () => {
      store.dispatch(ActionTypes.UpdateTodoEntry, {
        id: props.id,
        text: props.text,
        edit: props.edit,
        completed: !props.completed
      })
    }

    const toggleEdit = () => {
      store.dispatch(ActionTypes.UpdateTodoEntry, {
        id: props.id,
        text: input.value,
        edit: !props.edit,
        completed: props.completed
      })
    }

    const deleteEntry = () => {
      store.dispatch(ActionTypes.DeleteTodoEntry, props.id)
    }

    return { toggleCompletion, deleteEntry, toggleEdit, input }
  }
})
</script>

<style>
.entry {
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 4px;
  box-shadow: 0 0 10px #ececec;
  text-align: left;
  padding: 2rem;
}
</style>