<template>
  <h1 class="mb-4 text-2xl font-semibold">Login</h1>
  <form @submit.prevent="onLogin">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <input
        v-model="myForm.email"
        ref="emailInputRef"
        type="text"
        id="email"
        name="email"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Password</label>
      <input
        v-model="myForm.password"
        ref="passwordInputRef"
        type="password"
        id="password"
        name="password"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
        autocomplete="off"
      />
    </div>
    <!-- Remember Me Checkbox -->
    <div class="flex items-center mb-4">
      <input
        v-model="myForm.rememberMe"
        type="checkbox"
        id="remember"
        name="remember"
        class="text-green-500"
      />
      <label for="remember" class="ml-2 text-gray-600">Remember Me</label>
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-green-500">
      <a href="#" class="hover:underline">Forgot Password?</a>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
    >
      Login
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-center text-green-500">
    <RouterLink :to="{ name: 'register' }" class="hover:underline"
      >Create Account</RouterLink
    >
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from "vue";
import { useAuthStore } from '../stores/auth.store';
import { useToast } from "vue-toastification";

const authStore = useAuthStore();
const toast = useToast();

const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);

const myForm = reactive({
  email: "",
  password: "",
  rememberMe: false,
});

const onLogin = async () => {
  if (myForm.email === "") {
    return emailInputRef.value?.focus();
  }

  if (myForm.password.length < 6) {
    return passwordInputRef.value?.focus();
  }

  if (myForm.rememberMe) {
    localStorage.setItem("email", myForm.email);
  } else {
    localStorage.removeItem("email");
  }

  const ok = await authStore.login(myForm.email, myForm.password);

  if (ok) return;

  toast.error("Invalid credentials");
};

watchEffect(() => {
  const email = localStorage.getItem("email");
  if (email) {
    myForm.email = email;
    myForm.rememberMe = true;
  }
});
</script>
