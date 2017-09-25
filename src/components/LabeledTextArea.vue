<template>
  <div class="frame">
    <label class="label" :for="id">
      <h2 class="title">{{ name }}</h2>
    </label>
    <textarea
      class="textarea"
      type="text"
      rows="8"
      ref="textarea"
      :id="id"
      :placeholder="placeholder"
      v-html="value"
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
  .frame {
    margin: 0 16px;
  }
  .frame + .frame {
    margin-top: 16px;
  }
  .frame:last-child {
    margin-bottom: 8px;
  }

  .label {
    display: block;
  }

  .title {
    font-weight: normal;
    margin: 0 0 8px 0;
  }

  .textarea {
    border: 1px solid #cccccc;
    box-sizing: border-box;
    font-family: Inconsolata, Consolas, Monaco, Menlo, monospace;
    resize: vertical;
    width: 100%;
  }
</style>
