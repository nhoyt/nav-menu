import {LitElement, html, css} from 'lit';

class MenuButton extends LitElement {
  static styles = css`
    [role="button"] {
      text-decoration: none;
    }
  `;

  constructor () {
    super();
  }

  render () {
    return html`
      <a href="#" role="button">
        <slot></slot>
      </a>
    `;
  }
}

customElements.define('menu-button', MenuButton);
