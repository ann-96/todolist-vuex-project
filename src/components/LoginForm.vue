<template> 
  <form class="form-group">
    <div class="flex-grow m-1 ml-3">
      <input
        class="w-full focus:outline-none"
        type="text"
        placeholder="Login"
        v-model="login"
      />
      </div>
      
    <div class="flex-grow m-1 ml-3">
      <input
        class="w-full focus:outline-none"
        type="password"
        placeholder="Password"
        v-model="password"
      />
    </div>
    <div class="flex-shrink-0">
      <button
        type="submit"
        class="btn btn-primary"
        @click="Login()">
        Login
      </button></div>
      
    <div class="flex-grow m-1 ml-3">
      <input
        class="w-full focus:outline-none"
        type="password"
        placeholder="Confirm Password"
        v-model="password2"
      /></div>
        <div class="flex-shrink-0">
      <button
        type="submit"
        class="btn btn-primary"
        @click="Register()">
        Register
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { ActionTypes } from '@/store/actions'
import { MutationType } from '@/store/mutations'


export default defineComponent({
   setup() {
    const store = useStore()
    const login = ref('')
    const password = ref('')
    const password2 = ref('')
    const Login = () => {
      store.commit(MutationType.SetAuthData, {
        login:login.value,
        password:password.value,
        password2:password2.value
      })
      store.dispatch(ActionTypes.Login)
    }

    const Register = () => {
      store.commit(MutationType.SetAuthData, {
        login:login.value,
        password:password.value,
        password2:password2.value
      })
      store.dispatch(ActionTypes.Register)
    }
    
  return { Login, Register, login, password, password2 }
}
})
</script>


<style>

</style>

