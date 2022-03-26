import {LitElement, html, css} from 'lit';

export default class MenuButton extends LitElement {
  static properties = {
    controls: {},
    expanded: { state: true, attribute: false }
  };

  static styles = css`
    [role="button"] {
      text-decoration: none;
    }
    [role="button"]:visited {
      color: inherit;
    }
  `;

  constructor () {
    super();
    this.expanded = false;
  }

  toggle () {
    this.expanded = !this.expanded;
  }

  render () {
    return html`
      <a href="#" role="button" @click="${this.toggle}"
        aria-controls="${this.controls}"
        aria-expanded="${this.expanded}">
        <slot></slot>
      </a>
    `;
  }
}

customElements.define('menu-button', MenuButton);
