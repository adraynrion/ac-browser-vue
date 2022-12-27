<template>
  <header>
    <h1
      id="logo-h1"
      class="header-logo"
      :class="{
        'w-100': largestWidth,
      }"
    >
      Brotherhoods
    </h1>
    <h2
      id="logo-h2"
      class="header-logo"
      :class="{
        'w-100': largestWidth,
      }"
    >
      Adventure
    </h2>
  </header>
</template>

<script>
export default {
  props: {
    largestWidth: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.header-logo {
  position: absolute;
  text-align: center;
  width: 18rem;
  z-index: 100;
  display: block;
}

#logo-h1 {
  top: 1rem;
}
#logo-h2 {
  top: 3rem;
}
</style>
