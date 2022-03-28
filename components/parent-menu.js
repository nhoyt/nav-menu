import MenuItem from './menu-item';

const debug = { log: false, warn: false };

// Class mixin for keeping track of slotted MenuItem elements

export default function ParentMenu (superClass) {
  return class extends superClass {
    static properties = {
      menuItems: { attribute: false }
    };

    constructor () {
      super();
      this.menuItems = [];
    }

    get slottedChildren () {
      const slot = this.shadowRoot.querySelector('slot');
      return slot.assignedElements();
    }

    firstUpdated () {
      const children = this.slottedChildren;
      for (const child of children) {
        if (child instanceof MenuItem) {
          child.parentMenu = this;
          this.menuItems.push(child);
        }
        else {
          if (debug.warn) {
            console.warn(`In ${this.tagName} component:`,
              `Unknown slotted element: ${child.tagName}`);
          }
        }
      }
      if (debug.log) {
        console.log(`${this.tagName} menuItems: ${this.menuItems.length}`);
      }
    }
  }
}
