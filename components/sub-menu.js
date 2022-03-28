import {LitElement, html, css} from 'lit';
import ParentMenu from './parent-menu';

export default class SubMenu extends ParentMenu(LitElement) {
  static properties = {
    panelId: {}
  };

  static styles = css`
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

  constructor () {
    super();
    this.menuItem = null;
  }

  get menuContainer () {
    return this.shadowRoot.querySelector('ul');
  }

  toggle (value) {
    const ul = this.menuContainer;
    if (value) {
      ul.classList.add('show');
    }
    else {
      ul.classList.remove('show');
    }
  }

  render () {
    return html`
      <ul id="${this.panelId}">
        <slot></slot>
      </ul>
    `;
  }
}

customElements.define('sub-menu', SubMenu);
