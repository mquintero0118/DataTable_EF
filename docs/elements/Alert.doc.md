# Alert

> Basic BS Alert component

Version: 1.0.0

## Props

| Prop name   | Description                                                                                                        | Type    | Values                                                                          | Default   |
| ----------- | ------------------------------------------------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------- | --------- |
| dismissible | Defines alert component can be dismiss from the DOM                                                                | boolean | -                                                                               | false     |
| type        | Defines the default color set the alert can take                                                                   | string  | `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark` | 'primary' |
| icon        | Prepend a fa icon to the main content<br/>`@value` any `fa-icon class`<br/>`@see` {@link https://fontawesome.com/} | string  | -                                                                               | ''        |

## Slots

| Name    | Description       | Bindings |
| ------- | ----------------- | -------- |
| header  | Header content    |          |
| default | Main item content |          |

---
