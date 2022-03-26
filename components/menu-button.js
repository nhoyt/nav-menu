import {LitElement, html, css} from 'lit';

export default class MenuButton extends LitElement {
  static properties = {
    controls: {}
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
  }

  set menuItem (element) {
    this._menuItem = element;
  }

  get subMenu () {
    return this._subMenu;
  }

  set subMenu (element) {
    this._subMenu = element;
  }

  toggleSubMenu () {
    const style = this.subMenu.subMenuContainer.style;
    console.log(`style.display: ${style.display}`);
    style.display = style.display === 'none' ? 'block' : 'none';
  }

  render () {
    return html`
      <a href="#" role="button" @click="${this.toggleSubMenu}" aria-controls="${this.controls}" aria-expanded="false">
        <slot></slot>
      </a>
    `;
  }
}

customElements.define('menu-button', MenuButton);
