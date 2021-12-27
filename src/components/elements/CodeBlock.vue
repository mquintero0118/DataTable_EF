<template>
  <div style="white-space:pre" v-html="escapedCode" />
</template>

<script>
import { computed } from 'vue';
import hljs from 'highlight.js';
import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/github.css';

hljs.registerLanguage('javascript', xml);

export default {
  name: 'CodeBlock',
  props: {
    code: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const escapedCode = computed(() => hljs.highlightAuto(props.code).value);

    return { escapedCode };
  },
};
</script>
