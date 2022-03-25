import {LitElement, html, css} from 'lit';

class NavMenu extends LitElement {
  static properties = {
    label: {}
  };

  static styles = css`
  `;

  constructor () {
    super();
  }

  render () {
    return html`
      <nav aria-label="${this.label}">
        <ul>
          <slot></slot>
        </ul>
      </nav>
    `;
  }
}

customElements.define('nav-menu', NavMenu);
