import { LitElement, html } from 'lit';
import { subMenuCss } from './styles.css';
import ParentMenu from './parent-menu';

export default class SubMenu extends ParentMenu(LitElement) {
  static properties = {
    panelId: {}
  };

  static styles = subMenuCss;

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
