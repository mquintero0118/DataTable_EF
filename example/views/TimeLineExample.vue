<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h3>
          Example of AdminLTE
          <a target="_blank" href="https://adminlte.io/themes/v3/pages/UI/timeline.html"
            >Timeline</a
          >
        </h3>
      </div>
      <div class="col-12 m-2">
        <button class="btn btn-success text-white float-end" @click="changeOrder">
          <i
            class="fas"
            :class="{
              'fa-sort-amount-up-alt': sort === 'desc',
              'fa-sort-amount-down-alt': sort === 'asc',
            }"
          ></i>
        </button>
      </div>
      <div class="col-12 m-2">
        <Timeline :elements="timeItems" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import moment from 'moment';
import Timeline from '../../src/components/elements/Timeline.vue';

export default {
  components: { Timeline },
  setup() {
    const sort = ref('desc');
    const timeItems = ref({
      '10/11/2021': {
        config: {
          class: 'bg-success',
        },
        items: [
          {
            icon: 'fas fa-user bg-info',
            title: 'Title 1',
            content: 'content 1',
            time: '10:50',
          },
          {
            icon: 'fas fa-bell bg-warning text-black',
            title: 'Title 2',
            htmlContent: '<h4>HTML content her 1</h4>',
            time: '10:50',
          },
        ],
      },
      '10/12/2021': {
        config: {
          class: 'bg-danger',
        },
        items: [
          {
            icon: 'fas fa-envelope bg-dark',
            title: 'Title 3',
            content: 'content 3',
            time: '10:50',
          },
          {
            icon: 'fas fa-map-marker bg-secondary',
            title: 'Title 2',
            htmlContent: '<h4>HTML content her and custom class</h4>',
            time: '10:50',
            class: 'custom-class-exmaple',
          },
        ],
      },
      '9/12/2021': {
        items: [
          {
            icon: 'fas fa-ruler bg-success',
            title: 'Title 4',
            content: 'content 4',
            time: '10:50',
          },
          {
            icon: 'fas fa-marker bg-primary',
            title: 'Title 5',
            htmlContent: '<h4>HTML content her 5</h4>',
            time: '10:50',
          },
          {
            icon: 'fas fa-check bg-danger',
            title: 'Title 5',
            htmlContent: '<h4>HTML content her 5</h4>',
            time: '10:50',
          },
        ],
      },
      '9/11/2021': {},
      '8/11/2021': {
        items: [
          {
            icon: 'fas fa-eye',
            title: 'Title 10',
            content: 'content 10',
            time: '11:59',
          },
        ],
      },
    });

    const sortKeysAsc = (obj) => Object.assign(
      ...Object.entries(obj)
        .sort((a, b) => moment(a[0]).diff(moment(b[0])))
        .map(([key, value]) => ({
          [key]: value,
        })),
    );
    const sortKeysDesc = (obj) => Object.assign(
      ...Object.entries(obj)
        .sort((a, b) => moment(b[0]).diff(moment(a[0])))
        .map(([key, value]) => ({
          [key]: value,
        })),
    );

    const changeOrder = () => {
      if (sort.value === 'desc') {
        sort.value = 'asc';
        timeItems.value = sortKeysAsc(timeItems.value);
      } else {
        sort.value = 'desc';
        timeItems.value = sortKeysDesc(timeItems.value);
      }
    };
    // first sort
    timeItems.value = sortKeysDesc(timeItems.value);

    return { timeItems, changeOrder, sort };
  },
};
</script>

<style lang="scss">
.custom-class-exmaple .timeline-body {
  color: black;

  text-align: center;
  min-height: 150px;
}
.custom-class-exmaple .timeline-header {
  text-align: right;
  color: black;
}
</style>
