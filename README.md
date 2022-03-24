# Component Design

## Notes

* The content model for each element is expressed in both DTD and RELAX NG
  syntax.
* The RELAX NG keywords used are `element`, `attribute` and `text`.

## nav-menu
* The top-level container for a disclosure navigation menu system

Attributes:
* `label` - text describing the menu's purpose (not visually rendered)

Content model: `(menu-item | menu-separator)+`

```
element nav-menu {
  attribute label { text },    # value for aria-label
  subMenuContent
}
```

## menu-item
* Container for `menu-button`, `sub-menu` components and `a` elements
* Child of `nav-menu` and `sub-menu` components

Attributes: none

Content model: `( a | (menu-button, sub-menu) )`

```
element menu-item { menuItemContent }

menuItemContent =
  element a { aContent }    # HTML 'a' element
  | ( element menu-button { menuButtonContent },
      element sub-menu { subMenuContent } )
```

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

Attributes: href

Content model:
* `(PCDATA)+` - button label describing the `sub-menu` that it controls

```
element menu-button {
  attribute href { text },
  text    # button label
}
```

## sub-menu
* A container for `menu-item` components

* Must immediately follow the `menu-button` that controls it (the `sub-menu`)

* A `sub-menu` is initially hidden until the `menu-button` that controls it is
  activated.

* When groupings of `menu-item` components are needed, a `sub-menu` can contain
  `menu-separator` components (usually two or more).

Attributes: none

Content model: `(menu-item | menu-separator)+`

```
element sub-menu { subMenuContent }

subMenuContent =
  ( element menu-item { menuItemContent } | element menu-separator { text }? )+

```

## menu-separator

* An object that separates groups of `menu-item` components within a `sub-menu`
  (or `nav-menu`). If the `menu-separator` contains text, its purpose is to label
  the group of `menu-item` components that follow it.

* If text is omitted, the separator will be rendered graphically as a
  horizontal (or vertical) line.

Attributes: none

Content model: `(PCDATA)*`

```
element menu-separator { text }?    # describes group of menu-items that follow
```

## Styling / Implementation Notes

* When a `menu-item` is a descendant of `nav-menu`, it is styled differently
  than when it is a descendant of a `sub-menu`.

### nav-menu

* Must have an ARIA role of `navigation` (e.g., use `nav` element).

* Its required `label` attribute is typically hidden visually by being marked
  up using the `aria-label` attribute.

* Its `menu-item` descendants should be wrapped in a single list element such
  as `ul`.

### menu-button

* Must have an ARIA role of `button`. Typically marked up as an `a` element
  within an `li` element.

* Must have an `aria-controls` attribute with an IDREF value indicating the
 `sub-menu` it controls.

* Must have an `aria-expanded` attribute with value of `true` or `false`,
  indicating whether the `sub-menu` it controls is visible or not.

### sub-menu

* Marked up as a list element (`ul`) within an `li` element.

* Its visibility is controlled via CSS using `display: none` and
  `display: block`.

### menu-separator

* Marked up as an `li` element with optional text content, and
  `role="separator"`, which overrides the `li` default role.

* A `menu-separator`, with or without text content, is not focusable.

* When `menu-separator` component does not have text content, it is rendered
  as a visual separator such as a horizontal or vertical line.

* The best practice for using `menu-separator` components with or without text
  content is that you should not mix and match. Within a `sub-menu`, all of the
  `menu-separator` components should either have text content or not.
