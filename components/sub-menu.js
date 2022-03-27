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
      top: 4rem;
      background-color: lightblue;
      width: 15rem;
      z-index: 10;
    }
  `;

  constructor () {
    super();
  }

  get menuContainer () {
    return this.shadowRoot.querySelector('ul');
  }

  toggle (value) {
    const style = this.menuContainer.style;
    style.display = value ? 'block' : 'none';
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
