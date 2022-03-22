# Component Design

## nav-menu

* The top-level container for a disclosure navigation menu system

Attributes:

* `label` - text describing the menu's purpose (will be used as `aria-label`)

Content model:

* (`menu-item`)+

## menu-item

* Container for `menu-button`, `sub-menu` components and `a` elements

* Child of `nav-menu`, `sub-menu` and `menu-group` components

Content model:

* `(menu-button, sub-menu) | (a)+`

Example

```
<menu-item>
  <menu-button>Button label</menu-button>
  <sub-menu>
    <menu-item<
      <a href="#">Item 1</a>
    </menu-item>
    <menu-item<
      <a href="#">Item 2</a>
    </menu-item>
  </sub-menu>
</menu-item>
```

## menu-button

* A focusable component within a `menu-item` with disclosure button behavior.

* When activated, it toggles the visibility of the `sub-menu` that immediately
  follows it.

Content model:

* `(CDATA)+` - button label describing the `sub-menu` that it controls

## sub-menu

* A container for `menu-item` or `menu-group` components

* Must immediately follow the `menu-button` that controls it (the `sub-menu`)

* A `sub-menu` is initially hidden until the `menu-button` that controls it is
  activated.

* When groupings of `menu-item` components are needed, a `sub-menu` can contain
  `menu-group` components (usually two or more).

Content model:

* `(menu-item)+ | (menu-group)+`

## menu-group

* A container for grouping `menu-item` components within a `sub-menu`

* It may have an optional label.

* When there are multiple `menu-group` components within a `sub-menu`,
  groupings are indicated (rendered) by the use of separators.

* When a `menu-group` has a label, it serves as the separator for the group.

* A separator, whether it is a label or a graphical indicator, is not focusable.

Attributes:

* `label` - text describing the `menu-group` (will be marked up as an `li` with
   role="separator")

Content model:

* `(menu-item)+`

## Styling Notes

* When a `menu-item` is a descendant of `nav-menu`, it is styled differently
  than when it is a descendant of a `sub-menu`.

## Implementation Notes

### nav-menu

* Must have an ARIA role of `navigation` (e.g., use `nav` element).

* Its required label is typically hidden visually by being marked up using the
  `aria-label` attribute.

* Its `menu-item` descendants should be wrapped in a single list element.

### menu-button

* Must have an ARIA role of `button`. Typically marked up as an `a` element.

* Must have an `aria-controls` attribute with an IDREF value indicating the
 `menu-panel` it controls.

* Must have an `aria-expanded` attribute with value of `true` or `false`.

### sub-menu

* Marked up as a list element within an `li` element.

* Its visibility is controlled via CSS using `display: none` and
  `display: block`.

* When it contains unlabeled `menu-group` components, visual separators are
  inserted.

### menu-group

* Marked up as an `li` element with only text content.

* Its `menu-button` and `menu-item` descendants should be wrapped in a list
  element.

* When it has a label, it should be marked up as a `div` element and have the
  ARIA role `separator`.

* When it has a label the `aria-describedby` attribute should be used on the
  list element to point to the separator div.

* The best practice for using labeled vs. unlabeled `menu-group` components
  is that you should not mix and match. Within a `menu-panel`, all of the
  `menu-group` components should either have labels or not have them.
