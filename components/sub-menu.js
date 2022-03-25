import {LitElement, html, css} from 'lit';

class SubMenu extends LitElement {
  static styles = css`
    ul {
      display: none;
    }
  `;

  constructor () {
    super();
  }

  render () {
    return html`
      <ul>
        <slot></slot>
      </ul>
    `;
  }
}

customElements.define('sub-menu', SubMenu);
