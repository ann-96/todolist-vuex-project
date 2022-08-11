<template>
  <p class="mt-2">
    {{ completedCount }} of {{ totalCount }} completed.
  </p>
  

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    completedCount: { type: Number, required: true },
    totalCount: { type: Number, required: true }
  },
})
</script>
