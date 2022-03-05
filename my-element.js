import {LitElement, html, css} from 'lit';

class MyElement extends LitElement {

  static properties = {
    name: {},
  };

  static styles = css`
    p {
      color: #333;
    }
    label, input {
      font-size: 1rem;
    }
    input {
      padding: 0.25rem;
    }
    .name {
      font-weight: bold;
      color: #555;
    }
  `;

  constructor () {
    super();
    this.name = '[your name here]';
  }

  changeName (event) {
    const input = event.target;
    this.name = input.value;
  }

  render () {
    return html`
      <p>Hello, my name is <span class="name">${this.name}</span></p>
      <label>Name:
        <input @input=${this.changeName} placeholder="Enter your name">
      </label>
    `;
  }
}

customElements.define('my-element', MyElement);
