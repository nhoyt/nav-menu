import { LitElement, html } from 'lit';
import { menuButtonCss } from './styles.css';

export default class MenuButton extends LitElement {
  static properties = {
    controls: {},
    expanded: { state: true, attribute: false }
  };

  static styles = menuButtonCss;

  constructor () {
    super();
    this.expanded = false;
    this.menuItem = null;
  }

  toggleExpanded () {
    this.expanded = !this.expanded;
  }

  render () {
    return html`
      <a href="#" role="button" @click="${this.toggleExpanded}"
        aria-controls="${this.controls}"
        aria-expanded="${this.expanded}">
        <slot></slot>
      </a>
    `;
  }
}

customElements.define('menu-button', MenuButton);
