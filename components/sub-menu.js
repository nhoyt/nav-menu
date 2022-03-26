import {LitElement, html, css} from 'lit';

export default class SubMenu extends LitElement {
  static properties = {
    panelId: {}
  };

  static styles = css`
    ul {
      display: none;
    }
  `;

  constructor () {
    super();
  }

  get subMenuContainer () {
    return this.shadowRoot.querySelector('ul');
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
