<template>
  <ul class="pagination mw-100 overflow-auto" v-if="pages">
    <template v-if="visiblePrev">
      <li class="page-item">
        <a class="page-link" href="#" v-on:click="selected(1, $event)">
          <slot name="prev">
            <span aria-hidden="true">&laquo;</span>
          </slot>
        </a>
      </li>
      <li class="page-item disabled">
        <a class="page-link" tabindex="-1" aria-disabled="true">
          ...
        </a>
      </li>
    </template>
    <li class="page-item" v-for="page in getRange" :key="page"
      :class="{
        'active': page === current
      }"
    >
      <a class="page-link" href="#" v-on:click="selected(page, $event)">{{ page }}</a>
    </li>
    <template v-if="visibleNext">
      <li class="page-item disabled">
        <a class="page-link" tabindex="-1" aria-disabled="true">
          ...
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" v-on:click="selected(pages, $event)">
          <slot name="next">
            <span aria-hidden="true">&raquo;</span>
          </slot>
        </a>
      </li>
    </template>
  </ul>
</template>
<script>
import { ref, computed, watchEffect } from 'vue';

export default {
  name: 'Paginator',
  props: {
    show: {
      type: Number,
      default: null,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
      validator: (val) => val > 0,
    },
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    const visiblePrev = ref(true);
    const visibleNext = ref(true);

    const pages = computed(() => Math.ceil(props.total / props.itemsPerPage));

    if (props.current > pages.value) {
      context.emit('selected', pages.value);
    }

    const selected = (page, e) => {
      e.preventDefault();
      if (props.current !== page) {
        context.emit('selected', page);
      }
    };

    const getFirst = (arr) => arr.slice(0, 1).pop();

    const getLast = (arr) => arr.slice(-1).pop();

    let safe = 0;

    const getRange = computed(() => {
      const range = [props.current];

      while (range.length < props.show) {
        const prev = getFirst(range) - 1;
        const next = getLast(range) + 1;

        if (prev < 1 && next > pages.value) {
          break;
        }

        if (next <= pages.value) {
          range.splice(range.length, 0, next);

          if (range.length >= props.show) {
            break;
          }
        }

        if (prev > 0) {
          range.splice(0, 0, prev);
        }

        safe += 1;
        if (safe > 1000) {
          console.warn('Safe loop');
          break;
        }
      }

      return range;
    });

    watchEffect(() => {
      visiblePrev.value = getFirst(getRange.value) !== 1;
      visibleNext.value = getLast(getRange.value) !== pages.value;
    });

    return {
      pages, getRange, visiblePrev, visibleNext, selected,
    };
  },
};
</script>
