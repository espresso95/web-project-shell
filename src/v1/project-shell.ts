import './base.css';

const elementName = 'web-project-shell';

const controlStyles = `
  :host {
    --project-shell-background: rgb(246 245 241 / 92%);
    --project-shell-text: #151515;
    --project-shell-border: rgb(21 21 21 / 24%);
    --project-shell-focus: #151515;
    position: fixed;
    z-index: 2147483647;
    inset-block-start: 1rem;
    inset-inline-start: 1rem;
    display: inline-block;
    color: var(--project-shell-text);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.055em;
    line-height: 1;
    text-transform: uppercase;
  }

  :host([mode="inline"]) {
    position: static;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 2.5rem;
    padding: 0.7rem 0.85rem;
    border: 1px solid var(--project-shell-border);
    border-radius: 999px;
    color: inherit;
    background: var(--project-shell-background);
    backdrop-filter: blur(0.75rem);
    text-decoration: none;
  }

  a:focus-visible {
    outline: 0.18rem solid var(--project-shell-focus);
    outline-offset: 0.25rem;
  }

  @media (prefers-reduced-motion: no-preference) {
    a {
      transition: opacity 150ms ease, transform 150ms ease;
    }

    a:hover {
      opacity: 0.7;
      transform: translateY(-1px);
    }
  }
`;

export class WebProjectShellElement extends HTMLElement {
  static observedAttributes = ['home-url', 'label'];

  readonly #link: HTMLAnchorElement;
  readonly #label: HTMLSpanElement;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = controlStyles;

    this.#link = document.createElement('a');
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '←';

    this.#label = document.createElement('span');
    this.#link.append(arrow, this.#label);
    shadow.append(style, this.#link);
  }

  connectedCallback(): void {
    this.#render();
  }

  attributeChangedCallback(): void {
    this.#render();
  }

  #render(): void {
    this.#link.href = this.getAttribute('home-url') || '/';
    this.#label.textContent = this.getAttribute('label') || 'Home';
    this.#link.setAttribute(
      'aria-label',
      `Return to ${this.#label.textContent}`,
    );
  }
}

if (!customElements.get(elementName)) {
  customElements.define(elementName, WebProjectShellElement);
}
