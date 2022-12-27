<template>
  <div id="app" class="w-100 h-100">
    <LoadingScreen v-if="loading" />

    <router-view v-else />
  </div>
</template>

<script>
import LoadingScreen from "@/components/LoadingScreen.vue";

export default {
  components: {
    LoadingScreen,
  },

  data: () => ({
    loading: true,
  }),

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  },
};
</script>
