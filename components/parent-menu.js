import MenuItem from './menu-item';

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
          console.log(`${this.tagName} ERROR:`,
            `Unknown slotted element: ${child.tagName}`);
        }
      }
      console.log(`menuItems: ${this.menuItems.length}`);
    }
  }
}
