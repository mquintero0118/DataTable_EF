# DateRangePicker

> A component to select date and dates ranges

## Props

| Prop name  | Description                                                                                                                                                 | Type    | Values | Default                             |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ----------------------------------- |
| id         | Identifier for the input container<br>If emprty a unique id will be generated<br/>`@default` string ''                                                      | string  | -      | ''                                  |
| value      | The input value<br>If empty the actual day will be de value (in formate (dd/mm/yyyy)<br/>`@default` Date Actual date                                        | func    | -      | () => moment().format('DD/MM/YYYY') |
| config     | Configuiration to be pass to the daterangepicker plugin<br/>`@see` See [DateRangePicker](https://www.daterangepicker.com/#options)<br/>`@default` object {} | object  | -      | () => {}                            |
| showRanges | Load a pre set options to the plugin<br>The default ranges are: `Ultimos 7 dias`,`Ultimos 30 dias`,`Este mes`,`Mes anterio`                                 | boolean | -      | false                               |

## Events

| Event name         | Properties | Description |
| ------------------ | ---------- | ----------- |
| pickerShow         |            |
| pickerHide         |            |
| pickerShowCalendar |            |
| pickerHideCalendar |            |
| pickerApply        |            |
| pickerCancel       |            |

---
