<template>
  <div class="frame">
    <input
      class="revert"
      type="button"
      value="revert"
      :disabled="disableRevert"
      @click="clickRevert"
    />
    <input
      class="save"
      type="button"
      value="save"
      :disabled="disableSave"
      @click="clickSave"
    />
  </div>
</template>

<script>
export default {
  props: [
    'clickRevert',
    'clickSave',
    'disableRevert',
    'disableSave',
  ],
}
</script>

<style scoped>
  .frame {
    text-align: right;
  }
</style>
