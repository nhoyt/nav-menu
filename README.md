# nav-menu

## Component Design

### `nav-menu`
* The top-level component that serves as a container for `menu-button` and
  `menu-item` components.

* It must have a label that describes its purpose.

* See *Styling Notes*

### `menu-button`
* A focusable component within a `nav-menu` or `menu-group` with disclosure
  button behavior.

* When activated, it toggles the visibility of a `menu-panel`.

* It has a text label describing the `menu-panel` that it controls.

### `menu-item`
* A focusable link within a `nav-menu` or `menu-group`.

* It contains text thats describes the link target.

### `menu-panel`
* A container for one or more `menu-group` components.

* It is initially hidden until the `menu-button` that controls it is activated.

### `menu-group`
* A grouping of `menu-item` and `menu-button` components within a `menu-panel`.

* It may have an optional label.

* When there are multiple `menu-group` components within a `menu-panel`,
  groupings are indicated by the use of separators.

* When a `menu-group` has a label, it serves as the separator for the group.

* A separator, whether it is a label or a graphical indicator, is not focusable.

## Styling Notes

* When a `menu-button` or a `menu-item` is a descendant of the `nav-menu`, it
  usually is styled differently than when it is a descendant of a `menu-panel`.

## Implementation Notes

### `nav-menu`
* Must have an ARIA role of `navigation`.

* Its required label is typically hidden visually by being marked up using the
  `aria-label` attribute.

* Its `menu-button` and `menu-item` descendants should be wrapped in a single
  list element.

### `menu-button`
* Must have an ARIA role of `button`. Typically marked up as an `a` element.

* Must have an `aria-controls` attribute with an IDREF value indicating the
 `menu-panel` it controls.

* Must have an `aria-expanded` attribute with value of `true` or `false`.

### `menu-item`
* Typically marked up as an `a` element.

### `menu-panel`
* Marked up as a `div` container.

* Its visibility is controlled via CSS using `display: none` and
  `display: block`.

* When it contains only unlabeled `menu-group` components, visual separators
  are inserted.

### `menu-group`
* Marked up as a list element

* Its `menu-button` and `menu-item` descendants should be wrapped in a list
  element.

* When it has a label, it should be marked up as a `div` element and have the
  ARIA role `separator`.

* When it has a label the `aria-describedby` attribute should be used on the
  list element to point to the separator div.

* The best practice for using labeled vs. unlabeled `menu-group` components
  is that you should not mix and match. Within a `menu-panel`, all of the
  `menu-group` components should either have labels or not have them.
