<template>
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      Tasks on page
    </button>
    <ul class="dropdown-menu">
      <li><a @click="setEntriesOnPage(5)" class="dropdown-item" href="#">5</a></li>
      <li><a @click="setEntriesOnPage(10)" class="dropdown-item" href="#">10</a></li>
      <li><a @click="setEntriesOnPage(15)" class="dropdown-item" href="#">15</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { MutationType } from '@/store/mutations'
import { ActionTypes } from '@/store/actions'


export default defineComponent({
  setup() {
    const store = useStore()

    const setEntriesOnPage = (num: number) => {
      store.commit(MutationType.SetEntriesOnPage, num)
      store.dispatch(ActionTypes.GetTodoList)
    }

    return { setEntriesOnPage }
}})
</script>