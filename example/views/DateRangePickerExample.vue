<template>
  <div class="container-fluid">
    <h1>Date Range Picker</h1>
    <div class="row">
      <div class="col-6">
        <label>
          Date 1
          <DateRangePicker
            :config="{ showDropdowns: false }"

            @pickerShow="show"
          />
        </label>
      </div>
      <div class="col-6">
        <label>
          Date 2
          <DateRangePicker
            :config="cutomConfig"
            value="17/07/2021 - 18/07/2021"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import DateRangePicker from '@/components/elements/DateRangePicker.vue';

export default {
  components: { DateRangePicker },
  name: 'DateRangePickerExample',
  data() {
    return {
      cutomConfig: {
        singleDatePicker: false,
        showDropdowns: true,
        minYear: 2021,
        maxYear: 2022,
        showWeekNumbers: true,
        autoApply: false,
        linkedCalendars: false,
        autoUpdateInput: true,
        showCustomRangeLabel: false,
      },
    };
  },
  methods: {
    show() {
      // const { type } = ev[0];
      // const { endDate } = ev[1];
      // console.log(`action:${type} value: ${endDate.format('DD/MM/YYYY')}`);
    },
  },
};
</script>
