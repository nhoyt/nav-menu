import {LitElement, html, css} from 'lit';

export default class MenuButton extends LitElement {
  static properties = {
    controls: {}
  };

  static styles = css`
    [role="button"] {
      text-decoration: none;
    }
  `;

  constructor () {
    super();
  }

  toggleSubMenu () {

  }

  render () {
    return html`
      <a href="#" role="button" aria-controls="${this.controls}" aria-expanded="false">
        <slot></slot>
      </a>
    `;
  }
}

customElements.define('menu-button', MenuButton);
