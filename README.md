# nav-menu Component Design

## Notes

* The content model for each element is expressed in both DTD and RELAX NG
  syntax.
* The RELAX NG keywords used are `element`, `attribute` and `text`.

## Components

### nav-menu

#### Description
* The top-level container for a disclosure navigation menu system
* Its required `label` attribute specifies the value for `aria-label` (i.e.
  it is not visually rendered).

#### Content model
```
<!ELEMENT nav-menu ((menu-item | menu-separator)+)>
<!ATTLIST nav-menu label CDATA #REQUIRED>
```

```
element nav-menu {
  attribute label { text },    # value for aria-label
  subMenuContent
}
```

### menu-item

#### Description
* Container for `menu-button`, `sub-menu` components and `a` elements
* Child of `nav-menu` and `sub-menu` components

#### Content model
```
<!ELEMENT menu-item (a | (menu-button, sub-menu))>
```

```
element menu-item { menuItemContent }

menuItemContent =
  element a { aContent }    # HTML 'a' element
  | ( element menu-button { menuButtonContent },
      element sub-menu { subMenuContent } )
```

#### Example
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

### menu-button

#### Description
* A focusable component within a `menu-item` with disclosure button behavior.

* Its text content describes the `sub-menu` that it controls.

* When activated, it toggles the visibility of the `sub-menu` that immediately
  follows it.

#### Content model
```
<!ELEMENT menu-button (PCDATA)>
<!ATTLIST menu-button href CDATA #IMPLIED>
```

```
element menu-button {
  attribute href { text }?,
  text    # button label
}
```

### sub-menu

#### Description
* A container for `menu-item` components

* Must immediately follow the `menu-button` that controls it (the `sub-menu`)

* A `sub-menu` is initially hidden until the `menu-button` that controls it is
  activated.

* When groupings of `menu-item` components are needed, a `sub-menu` can contain
  `menu-separator` components (usually two or more).

#### Content model
```
<!ELEMENT sub-menu (menu-item+ | menu-separator)+>
```

```
element sub-menu { subMenuContent }

subMenuContent =
  ( element menu-item { menuItemContent }+ | element menu-separator { text }? )+

```

### menu-separator

#### Description
* An object that separates groups of `menu-item` components within a `sub-menu`
  (or `nav-menu`). If the `menu-separator` contains text, its purpose is to label
  the group of `menu-item` components that follow it.

* If text is omitted, the separator will be rendered graphically as a
  horizontal (or vertical) line.

#### Content model
```
<!ELEMENT menu-separator (PCDATA)*>
```

```
element menu-separator { text }?    # describes group of menu-items that follow
```

## Styling / Implementation Notes

* When a `menu-item` is a descendant of `nav-menu`, it is styled differently
  than when it is a descendant of a `sub-menu`.

### nav-menu

* _Marked up as_ `nav` element that contains a `ul` element, which in turn
  contains `menu-item` and optional `menu-separator` elements.

* Must have an ARIA role of `navigation` (default role of `nav` element).

* Its required `label` attribute provides the value for an `aria-label`
  attribute on the `nav` element.

### menu-button

* _Marked up as_ an `a` element with `role="button"` within an `li` element
  that also contains a `sub-menu` element immediately following `menu-button`.

* The `a` element must have an `aria-controls` attribute with an IDREF value
  referencing the `sub-menu` it controls.

* The `a` element must have an `aria-expanded` attribute with value of `true`
  or `false`, indicating whether the `sub-menu` it controls is visible or not.

### sub-menu

* _Marked up as_ a list element (`ul`) within an `li` element.

* The `menu-button` that controls this `sub-menu` it the `menu-button` that
  immediately precedes it.

* The visibility of the `sub-menu` is controlled via CSS using `display: none`
  and `display: block`.

### menu-separator

* _Marked up as_ an `li` element with optional text content, and
  `role="separator"`, which overrides the `li` default role.

* A `menu-separator`, with or without text content, is not focusable.

* When `menu-separator` component does not have text content, it is rendered
  as a visual separator such as a horizontal or vertical line.

* The best practice for using `menu-separator` components with or without text
  content is that you should not mix and match. Within a `sub-menu`, all of the
  `menu-separator` components should either have text content or not.
