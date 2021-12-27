<template>
  <div class="timeline">
    <template v-for="element in Object.keys(elements)" :key="element">
      <div class="time-label">
        <span class="bg-primary" v-bind="elements[element].config ?? {}">{{ element }}</span>
      </div>
      <template v-for="(row, index) in elements[element].items ?? []" :key="index">
        <div>
          <i v-if="row.icon" :class="row.icon"></i>
          <div
            :set="(tmpId = row.id ?? `timeline-item-${uniqueId()}`)"
            class="timeline-item"
            :class="row.class ?? ''"
            :id="tmpId"
          >
            <span class="time" v-if="row.time"><i class="fas fa-clock"></i>{{ row.time }}</span>
            <h3 class="timeline-header">{{ row.title ?? '' }}</h3>

            <div class="timeline-body" v-if="row.htmlContent" v-html="row.htmlContent"></div>
            <div class="timeline-body" v-else-if="row.content">{{ row.content }}</div>
            <div class="timeline-footer" v-if="row.footer">
              {{ row.footer }}
            </div>
          </div>
        </div>
      </template>
    </template>
    <div>
      <i class="fas fa-clock bg-default"></i>
    </div>
  </div>
</template>

<script>
import { uniqueId } from 'lodash';

export default {
  name: 'Timeline',
  props: {
    elements: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      uniqueId,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/elements/_timeline.scss';
</style>
