# Datatable

> Datatable using bs5

## Props

| Prop name | Description                                                                                                                               | Type   | Values | Default |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | ------- |
| id        | Identifier for the table componer.                                                                                                        | string | -      |         |
| title     | String to be display on top of the table.                                                                                                 | string | -      |         |
| headers   | Array of string for the column names.                                                                                                     | array  | -      |         |
| rows      | Array that represent each row of the table.                                                                                               | array  | -      | []      |
| config    | Datatable configuratio to be pass.<br/>`@see` See [Datatable..net](https://datatables.net/manual/options)                                 | object | -      | {}      |
| methods   | An array compose of objects in the format of `trigger` `selector` `callbackFn`.<br>For each element in the array a listener will be added | array  | -      | []      |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| error.dt   |            |
| draw.dt    |            |

---
