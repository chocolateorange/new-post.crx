<template>
  <h1 class="title">{{ title }}</h1>
</template>

<script>
export default {
  props: [
    'title',
  ],
}
</script>

<style scoped>
  .title {
    font-weight: normal;
    text-align: center;
  }
</style>
