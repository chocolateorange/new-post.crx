<template>
  <section class="options">
    <TitleHeader class="title-header" title="new-post options" />

    <HorizontalLine class="horizontal-line" />

    <LabeledInput
      class="labeled-input"
      id="account"
      name="account"
      :placeholder="placeholders.account"
      :value="values.account"
      v-model="values.account"
    />
    <LabeledInput
      class="labeled-input"
      id="repository"
      name="repository"
      :placeholder="placeholders.repository"
      :value="values.repository"
      v-model="values.repository"
    />
    <LabeledInput
      class="labeled-input"
      id="branch"
      name="branch"
      :placeholder="placeholders.branch"
      :value="values.branch"
      v-model="values.branch"
    />
    <LabeledInput
      class="labeled-input"
      id="path"
      name="path"
      :placeholder="placeholders.path"
      :value="values.path"
      v-model="values.path"
    />

    <Definitions :definitions="definitions" />

    <LabeledTextArea
      class="labeled-textarea"
      id="template"
      name="template"
      :placeholder="placeholders.template"
      :value="values.template"
      v-model="values.template"
    />

    <HorizontalLine class="horizontal-line" />

    <SettingButtons class="setting-buttons"
      :disableRevert="disableRevert"
      :disableSave="disableSave"
      :clickRevert="clickRevert"
      :clickSave="clickSave"
    />
  </section>
</template>

<script>
import Definitions from './Definitions';
import HorizontalLine from './HorizontalLine';
import LabeledInput from './LabeledInput';
import LabeledTextArea from './LabeledTextArea';
import SettingButtons from './SettingButtons';
import TitleHeader from './TitleHeader';

export default {
  components: {
    Definitions,
    HorizontalLine,
    LabeledInput,
    LabeledTextArea,
    SettingButtons,
    TitleHeader,
  },
  data() {
    return {
      definitions: [
        {
          term: '{{ YYYY }}',
          description: 'replace to year',
        },
        {
          term: '{{ MM }}',
          description: 'replace to month',
        },
        {
          term: '{{ DD }}',
          description: 'replace to date',
        },
        {
          term: '{{ No }}',
          description: 'replace to serial number',
        },
      ],
      disableRevert: true,
      disableSave: true,
      placeholders: {
        account: 'chocolateorange',
        branch: 'master',
        path: '_posts/{{ YYYY }}/{{ MM }}/{{ YYYY }}-{{ MM }}-{{ DD }}-{{ No }}.md',
        repository: 'chocolateorange.github.io',
        template: '---\nlayout: default\ntitle:\n---',
      },
      values: {
        account: '',
        branch: '',
        path: '',
        repository: '',
        template: '',
      },
    };
  },
  methods: {
    /**
     * handler for click revert button
     */
    async clickRevert() {
      this.disableRevert = true;

      const {
        account = '',
        repository = '',
        branch = '',
        path = '',
        template = '',
      } = await this.$store.dispatch('loadConfigs');

      this.values.account = account;
      this.values.repository = repository;
      this.values.branch = branch;
      this.values.path = path;
      this.values.template = template;

      this.disableRevert = false;
    },
    /**
     * handler for click save button
     */
    async clickSave() {
      this.disableSave = true;

      await this.$store.dispatch('saveConfigs', this.values);

      this.disableSave = false;
    },
  },
  /**
   * life cycle method
   */
  async mounted() {
    const {
      account = '',
      repository = '',
      branch = '',
      path = '',
      template = '',
    } = await this.$store.dispatch('loadConfigs');

    this.values.account = account;
    this.values.repository = repository;
    this.values.branch = branch;
    this.values.path = path;
    this.values.template = template;

    this.disableRevert = false;
    this.disableSave = false;
  },
}
</script>

<style scoped>
  .options {
    background-color: #ffffff;
    border-radius: 3px;
    border: 1px solid #cccccc;
    margin: 16px;
  }

  .options .title-header {
    margin: 8px 0;
  }

  .options .horizontal-line {
    margin: 8px 0;
  }

  .options .labeled-input {
    margin: 0 16px;
  }
  .options .labeled-input + .labeled-input {
    margin-top: 16px;
  }
  .options .labeled-input:last-of-type {
    margin-bottom: 8px;
  }

  .options .labeled-textarea {
    margin-top: 16px;
  }

  .options .setting-buttons {
    margin: 0 8px 8px 8px;
  }
</style>
