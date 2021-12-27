<template>
  <div class="container-fluid">
    <h3>Alerts</h3>
    <div class="col-12 bg-white p-3">
      <Alert :type="bgColor">
        Hola mundo
      </Alert>
      <Alert type="secondary">
        <template v-slot:header>
          <h5>Título</h5>
        </template>
        Hola mundo
      </Alert>
      <Alert type="danger" icon="exclamation-triangle">
        Hola mundo
      </Alert>
      <Alert type="warning" dismissible>
        Hola mundo
      </Alert>
    </div>
    <h3 class="mt-2">Badges</h3>
    <div class="col-12 bg-white p-3">
      Hola <Badge :bg="bgColor">New</Badge>
      Hola <Badge :bg="bgColor" pill>New</Badge>
    </div>
    <h3 class="mt-2">Breadcrumbs</h3>
    <div class="col-12 bg-white p-3">
      <Breadcrumb :entries="breadcrumbEntries"/>
    </div>
    <h3 class="mt-2">Pagination</h3>
    <div class="col-12 bg-white p-3">
      <nav>
        <Paginator :current="currentPaginator" :show="5" :total="420" :itemsPerPage="10"
          v-on:selected="loadPage"
        />
      </nav>
      <nav>
        <Paginator class="justify-content-center"
          :current="currentPaginator2"
          v-on:selected="changePage"
          :show="10"
          :total="423"
          :itemsPerPage="20"
        >
          <template v-slot:prev>
            <b>First</b>
          </template>
          <template v-slot:next>
            <b>End</b>
          </template>
        </Paginator>
      </nav>
    </div>
    <h3 class="mt-2">Tooltip</h3>
    <div class="col-12 bg-white p-3">
      <button class="btn btn-primary" v-tooltip="tooltipData" @click="changeTooltip">
        Hola mundo
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import Alert from '@/components/elements/Alert.vue';
import Badge from '@/components/elements/Badge.vue';
import Breadcrumb from '@/components/elements/Breadcrumb.vue';
import Paginator from '@/components/elements/Paginator.vue';

export default {
  setup() {
    const currentPaginator = ref(10);
    const currentPaginator2 = ref(3);

    function* colors() {
      const c = 'primary secondary success danger warning info light dark'.split(' ');
      let i = 0;
      while (true) {
        yield c[i];
        i += 1;
        if (i >= c.length) {
          i = 0;
        }
      }
    }

    const genColor = colors();

    const bgColor = ref(genColor.next().value);

    setInterval(() => {
      bgColor.value = genColor.next().value;
    }, 500);

    const breadcrumbEntries = [
      {
        text: 'Home',
        to: '/',
      },
      {
        text: 'About Us',
        href: 'https://google.com',
      },
      'Example',
    ];

    const loadPage = (page) => {
      currentPaginator.value = page;
    };

    const changePage = (page) => {
      currentPaginator2.value = page;
    };

    const tooltipData = ref({ title: 'Hola mundo', placement: 'right' });

    const getRandom = (choices) => choices[Math.floor(Math.random() * choices.length)];

    const changeTooltip = () => {
      const placement = getRandom(['top', 'bottom', 'left', 'right']);
      const title = getRandom(['Hola mundo', 'Hello world', 'Hallo welt', 'Olá mundo']);

      tooltipData.value.placement = placement;
      tooltipData.value.title = title;
    };

    return {
      bgColor,
      breadcrumbEntries,
      loadPage,
      currentPaginator,
      changePage,
      currentPaginator2,
      tooltipData,
      changeTooltip,
    };
  },
  components: {
    Alert, Badge, Breadcrumb, Paginator,
  },
};
</script>
