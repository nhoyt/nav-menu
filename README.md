# nav-menu Component Design

## Notes

* The content model for each element is expressed in both DTD and RELAX NG
  syntax.
* The RELAX NG keywords used are `element`, `attribute` and `text`.

## Named Patterns

The RELAX NG content models use the following named patterns:

```
a-element = element a {
  attribute href { text },
  text
}

menu-button-element = element menu-button {
  attribute href { text }?,
  text
}

menu-separator-element = element menu-separator {
  attribute label { text }?,
  empty
}

menu-item-element = element menu-item {
  a-element | ( menu-button-element, sub-menu-element )
}

sub-menu-element = element sub-menu {
  menu-separator-element?, menu-item-element+
}+
```

## Components

### nav-menu

#### Description
* The top-level container for a disclosure navigation menu system.
* Its required `label` attribute specifies the value for `aria-label` (it is
  not visually rendered).

#### Content model
```
<!ELEMENT nav-menu ( (menu-separator?, menu-item+)+ )>
<!ATTLIST nav-menu label CDATA #REQUIRED>

element nav-menu {
  attribute label { text },
  ( menu-separator-element?, menu-item-element+ )+
}
```
_In English:_ A `nav-menu` must have a `label` attribute and must contain one
or more instances of the following sequence: an _optional_ `menu-separator`
element followed by one or more `menu-item` elements.

### menu-item

#### Description
* Container for `menu-button`, `sub-menu` and `a` elements
* Child of `nav-menu` and `sub-menu` components

#### Content model
```
<!ELEMENT menu-item (a | (menu-button, sub-menu))>

element menu-item {
  a-element | ( menu-button-element, sub-menu-element )
}
```

_In English:_ A `menu-item` may contain _either_ an `a` element _or_ the
following sequence: a `menu-button` element followed by a `sub-menu` element.


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

element menu-button {
  attribute href { text }?,
  text
}
```

_In English:_ A `menu-button` must contain text content, and may have an
_optional_ `href` attribute.

### sub-menu

#### Description
* A container for `menu-item` components

* Must immediately follow the `menu-button` that controls it (the `sub-menu`)

* A `sub-menu` is initially hidden until the `menu-button` that controls it is
  activated.

* When groupings of `menu-item` elements are needed, a `sub-menu` can contain
  `menu-separator` elements (usually two or more).

#### Content model
```
<!ELEMENT sub-menu ( (menu-separator?, menu-item+)+ )>

element sub-menu {
  menu-separator-element?, menu-item-element+
}+
```

_In English:_ A `sub-menu` must contain one or more instances of the following
pattern: an _optional_ `menu-separator` element followed by one or more
`menu-item` elements.

### menu-separator

#### Description
* An object that separates groups of `menu-item` components within a `sub-menu`
  (or `nav-menu`). If the `menu-separator` contains text, its purpose is to label
  the group of `menu-item` components that follow it.

* If text is omitted, the separator will be rendered graphically as a
  horizontal or vertical line, depending on menu orientation.

#### Content model
```
<!ELEMENT menu-separator (PCDATA)*>

element menu-separator {
  attribute label { text }?
}
```

_In English:_ A `menu-separator` component has no text or element content, and
may have an _optional_ `label` attribute.

## Styling / Implementation Notes

* When a `menu-item` is a descendant of `nav-menu`, it is styled differently
  than when it is a descendant of a `sub-menu`.

### nav-menu

* _Marked up as_ `nav` element that contains a `ul` element, which in turn
  contains `menu-item` and optional `menu-separator` elements.

* Must have an ARIA role of `navigation` (default role of `nav` element).

* Its required `label` attribute provides the value for an `aria-label`
  attribute on the `nav` element.

### menu-item

* _Marked up as_ an `li` element.

* A `menu-item` may contain either a single `a` element or a `menu-button`
  followed by a `sub-menu`.

* In the latter case, the `menu-button` will need to reference, via its
  `aria-controls` attribute, the `sub-menu` that immediately follows it.

### menu-button

* _Marked up as_ an `a` element with `role="button"` within an `li` element
  that also contains a `sub-menu` element immediately following `menu-button`.

* The `a` element must have an `aria-controls` attribute with an IDREF value
  referencing the `sub-menu` it controls.

* The `a` element must have an `aria-expanded` attribute with value of `true`
  or `false`, indicating whether the `sub-menu` it controls is visible or not.

### sub-menu

* Child of `menu-item`.

* _Marked up as_ a list element (`ul`) within an `li` element. It will need
  an `id` attribute to which the controlling `menu-button` can refer.

* The `menu-button` that that immediately precedes the `sub-menu` within the
  `menu-item` is the `menu-button` that controls it.

* The visibility of the `sub-menu` is controlled via CSS using `display: none`
  and `display: block`.

### menu-separator

* _Marked up as_ an `li` element with optional text content, and
  `role="separator"`, which overrides the `li` default role.

* A `menu-separator`, with or without text content, is not focusable.

* When `menu-separator` component does not have a `label` attribute, it is
  rendered as a visual separator such as a horizontal or vertical line.

* The best practice for using `menu-separator` components with or without a
  `label` attribute is that you should not mix and match. Within a `sub-menu`,
   all of the `menu-separator` components should either have a `label`
   attribute or not.
