<template>
  <nav class="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white py-2.5 px-6 sm:px-4">
    <div class="container flex flex-wrap items-center justify-between max-w-6xl mx-auto">
      <a href="#" class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 mr-3 text-emerald-500 sm:h-9"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          />
        </svg>

        <span class="self-center text-xl font-semibold whitespace-nowrap">Mimi-Shop</span>
      </a>
      <div class="mt-2 sm:mt-0 sm:flex md:order-2">
        <template v-if="!authStore.isAuthenticated">
          <!-- Login Button -->
          <RouterLink
            to="/auth/login"
            type="button"
            class="mr-3 hidden border border-emerald-700 py-1.5 px-6 text-center text-sm font-medium text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 md:inline-block rounded-lg"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/auth/register"
            type="button"
            class="mr-3 hidden bg-emerald-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 md:mr-0 md:inline-block rounded-lg"
          >
            Register
          </RouterLink>
          <!-- Register Button -->
        </template>

        <template v-if="authStore.isAuthenticated">
          <!-- Login Button -->
          <RouterLink
            v-if="authStore.isAdmin"
            to="/admin"
            type="button"
            class="mr-3 hidden border border-emerald-700 py-1.5 px-6 text-center text-sm font-medium text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 md:inline-block rounded-lg"
          >
            Admin
          </RouterLink>
          <button
            @click="authStore.logout()"
            type="button"
            class="mr-3 hidden bg-red-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 md:mr-0 md:inline-block rounded-lg"
          >
            Logout
          </button>
          <!-- Register Button -->
        </template>

        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="items-center justify-between hidden w-full md:order-1 md:flex md:w-auto"
        id="navbar-sticky"
      >
        <ul
          class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium"
        >
          <li>
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-white rounded bg-emerald-700 md:bg-transparent md:p-0 md:text-emerald-700"
              aria-current="page"
              >Home</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-emerald-700"
              >About</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-emerald-700"
              >Services</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-emerald-700"
              >Contact</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/modules/auth/stores/auth.store';

const authStore = useAuthStore();
</script>
