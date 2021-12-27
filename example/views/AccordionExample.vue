<template>
  <div class="container-fluid">
    <h1>hello world home</h1>
    <AccordionWrapper multiple>
      <AccordionItem title="Accordion 1">
        Hola mundo
      </AccordionItem>
      <AccordionItem title="Accordion 2" open>
        Hello world
      </AccordionItem>
      <AccordionItem title="Accordion 3">
        <template v-slot:title>
          <b>HTML Test</b>
        </template>
        Привет мир
      </AccordionItem>
    </AccordionWrapper>
    <hr>
    <AccordionWrapper>
      <AccordionItem :title="entry.title" v-for="entry, index in entries" :key="index + uniqueId()">
        <div v-html="entry.body" />
      </AccordionItem>
    </AccordionWrapper>
  </div>
</template>

<script>
import { uniqueId } from 'lodash';
import AccordionWrapper from '@/components/elements/Accordion/Container.vue';
import AccordionItem from '@/components/elements/Accordion/Item.vue';

export default {
  name: 'Home',
  setup() {
    const entries = [
      {
        title: 'Home',
        body: 'Hola mundo',
        open: true,
      },
      {
        title: 'Home',
        body: '<b>Hola mundo</b>',
      },
      {
        title: 'Home',
        body: 'Hola mundo',
      },
      {
        title: 'Home',
        body: 'Hola mundo',
      },
    ];

    return { entries, uniqueId };
  },
  components: { AccordionWrapper, AccordionItem },
};
</script>
