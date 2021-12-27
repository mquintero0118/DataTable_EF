<template>
  <div class="container">
    <h1>Tabs</h1>
    <div class="col-12 p-2 border bg-white">
      <TabContainer class="mb-3">
        <TabItem v-for="entry, index in entries"
          :title="entry.title"
          :key="index"
          :disabled="entry.disabled"
          :active="entry.active"
        >
          {{ entry.body }}
        </TabItem>
        <TabItem id="hola-mundo">
          <template v-slot:title>
            <b>Cinco</b>
            <span>!!!!</span>
          </template>
          Hola mundo
        </TabItem>
      </TabContainer>
    </div>

    <div class="col-12 p-2 mt-4 border bg-white">
      <TabContainer class="mb-3" pills>
        <TabItem title="Hola">
          <i>Hola mundo</i>
        </TabItem>
        <TabItem title="Mundo" :active="true">
          Hola mundo
        </TabItem>
      </TabContainer>
    </div>
  </div>
</template>
<script>
import TabContainer from '@/components/elements/Tab/Container.vue';
import TabItem from '@/components/elements/Tab/Item.vue';

export default {
  setup() {
    const entries = [
      {
        title: 'Hola',
        body: '<b>Hola mundo</b>',
      },
      {
        title: 'Mundo',
        body: 'Simón',
      },
      {
        title: 'Link',
        body: 'Hola mundo',
      },
      {
        title: 'Disabled',
        disabled: true,
      },
    ];

    return { entries };
  },
  components: { TabContainer, TabItem },
};
</script>
