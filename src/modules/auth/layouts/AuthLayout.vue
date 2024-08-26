<template>
  <!-- component -->
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <!-- Left: Image -->
    <div class="hidden w-1/2 h-screen bg-green-400 lg:block"></div>
    <!-- Right: Login Form -->
    <div class="w-full p-8 lg:p-36 md:p-52 sm:20 lg:w-1/2">
      <RouterView />
    </div>
  </div>
</template>
