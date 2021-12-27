# Card

> Card/Box base on adminLTE implementarion

## Props

| Prop name   | Description                                                 | Type    | Values                                               | Default   |
| ----------- | ----------------------------------------------------------- | ------- | ---------------------------------------------------- | --------- |
| id          | Identifier for the card container                           | string  | -                                                    | ''        |
| title       | The title placed in the card header                         | string  | -                                                    | ''        |
| type        | Defines the default color set the card can take             | string  | `success`, `warning`, `danger`, `primary`, `default` | 'default' |
| outline     | Option to change de style of the card header                | boolean | -                                                    | false     |
| canCollapse | If the button to collapse the card should be display or not | boolean | -                                                    | false     |
| canClose    | If the button to remove the card should be display or not   | boolean | -                                                    | false     |

## Events

| Event name | Properties                                                                                                    | Description       |
| ---------- | ------------------------------------------------------------------------------------------------------------- | ----------------- |
| cardHidden |                                                                                                               |
| cardShown  | **content** `string` - content of the first prop passed to the event<br>**example** `array` - clicked element | Carde open event. |

## Slots

| Name    | Description        | Bindings |
| ------- | ------------------ | -------- |
| default | Use this slot body |          |

---
