<template>
  <dl>
    <template v-for="definition in definitions">
      <dt>{{ definition.term }}</dt>
      <dd>{{ definition.description }}</dd>
    </template>
  </dl>
</template>

<script>
export default {
  props: [
    'definitions',
  ],
}
</script>

<style scoped>
dl {
  margin: 8px 16px;
}

dl > dt {
  background-color: #eeeeee;
  font-family: Inconsolata, Consolas, Monaco, Menlo, monospace;
  padding: 2px;
}

dl > dd {
  margin-left: 40px;
}

dl > dt + dd {
  margin-bottom: 8px;
}

dl > dd:last-of-type {
  margin-bottom: 0;
}
</style>
