import {LitElement, html, css} from 'lit';
import ParentMenu from './parent-menu';

class NavMenu extends ParentMenu(LitElement) {
  static properties = {
    label: {}
  };

  static styles = css`
    ul, li, a {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
    }

    nav {
      background-color: #ddd;
      padding: 0.5rem;
    }

    ul ::slotted(menu-item) {
      background-color: #eee;
      border-radius: 6px;
      border: 2px solid blue;
      margin-left: 8px;
      padding: 4px 8px;
    }
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
