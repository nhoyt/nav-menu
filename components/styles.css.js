import { css } from 'lit';

export const navMenuCss = css`
  ul, li, a {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
  }

  nav {
    background-color: #eee;
    padding: 0.5rem;
  }

  ul ::slotted(menu-item) {
    background-color: #fff;
    border-radius: 6px;
    border: 2px solid blue;
    margin-left: 8px;
    padding: 4px 8px;
  }
`;

export const menuItemCss = css`
  li {
    display: inline-block;
    list-style: none;
    white-space: nowrap;
  }
  li.submenu {
    margin: 0;
    padding: 6px;
  }
`;

export const menuButtonCss = css`
  [role="button"] {
    text-decoration: none;
  }
  [role="button"]:visited {
    color: inherit;
  }
`;

export const subMenuCss = css`
  ul {
    display: none;
    position: absolute;
    top: 35px;
    background-color: #eee;
    padding: 0.5rem;
    z-index: 10;
  }
  .show {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 1;
  }
`;
