import { LitElement, ReactiveElement, html } from 'lit';
import { navMenuCss } from './styles.css';
import DebugController from './debug-controller';
import ParentMenu from './parent-menu';

class NavMenu extends ParentMenu(LitElement) {
  static properties = {
    label: {}
  };

  static styles = navMenuCss;

  constructor () {
    super();
    this.debug = new DebugController(this, true);
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
