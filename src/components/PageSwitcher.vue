<template>
  <div
    class="flex text-center bg-white rounded-md shadow-md m-2 p-1 border-4 bottom-pagination">
    <div v-if="currentPage>0">      
      <button 
        type="button" 
        class="btn btn-dark"
        @click="previousPage()">
        Previous page
      </button>
    </div>
    Page {{currentPage+1}} of {{maxPage+1}}
    <div v-if="currentPage<maxPage">      
      <button 
        type="button" 
        class="btn btn-dark"
        @click="nextPage()">
        Next page
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
    currentPage: { type: Number, required: true },
    maxPage: { type: Number, required: true }
  },
  setup() {
    const store = useStore()

    const previousPage = () => {
      store.dispatch(ActionTypes.PreviousPage)
    }

    const nextPage = () => {
      store.dispatch(ActionTypes.NextPage)
    }

    return { previousPage, nextPage }
  }
})
</script>

<style>
.bottom-pagination {
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
}
</style>
