<template>
  <!-- component -->
  <!-- Create By Joker Banny -->
  <!-- Header Navbar -->
  <TopMenu />

  <!-- Main Content -->
  <RouterView />

  <!-- Footer -->
  <CustomFooter />
</template>

<script lang="ts" setup>
import TopMenu from '@/modules/shop/components/TopMenu.vue';
import CustomFooter from '@/modules/shop/components/CustomFooter.vue';
</script>
