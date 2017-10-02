<template>
  <div class="frame">
    <label class="label" :for="id">
      <h2 class="title">{{ name }}</h2>
    </label>
    <input
      class="input"
      type="text"
      ref="input"
      :id="id"
      :placeholder="placeholder"
      :value="value"
      @input="input"
    />
  </div>
</template>

<script>
export default {
  props: [
    'id',
    'name',
    'placeholder',
    'value',
  ],
  methods: {
    /**
     * handler for input
     *
     * @param {Event} event
     */
    input(event) {
      this.$emit('input', event.target.value);
    },
  },
}
</script>

<style scoped>
  .label {
    display: block;
  }

  .title {
    font-weight: normal;
    margin: 0 0 8px 0;
  }

  .input {
    box-sizing: border-box;
    font-family: Inconsolata, Consolas, Monaco, Menlo, monospace;
    width: 100%;
  }
</style>
