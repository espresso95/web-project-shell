import { beforeEach, describe, expect, it } from 'vitest';
import '../../src/v1/project-shell.ts';

function getLink(element: HTMLElement): HTMLAnchorElement {
  const link = element.shadowRoot?.querySelector('a');
  if (!(link instanceof HTMLAnchorElement)) {
    throw new Error('Expected the project shell to render an anchor');
  }
  return link;
}

function getStyles(element: HTMLElement): string {
  const styles = element.shadowRoot?.querySelector('style')?.textContent;
  if (!styles) {
    throw new Error('Expected the project shell to render its styles');
  }
  return styles;
}

describe('web-project-shell', () => {
  beforeEach(() => {
    document.body.replaceChildren();
  });

  it('links directly to the configured home URL', () => {
    const element = document.createElement('web-project-shell');
    element.setAttribute('home-url', '/');
    element.setAttribute('label', 'Your Name');
    document.body.append(element);

    const link = getLink(element);
    expect(link.pathname).toBe('/');
    expect(link.textContent).toContain('Your Name');
    expect(link.getAttribute('aria-label')).toBe('Return to Your Name');
  });

  it('updates when its public attributes change', () => {
    const element = document.createElement('web-project-shell');
    document.body.append(element);

    element.setAttribute('home-url', '/collection/');
    element.setAttribute('label', 'Collection');

    const link = getLink(element);
    expect(link.pathname).toBe('/collection/');
    expect(link.textContent).toContain('Collection');
  });

  it('uses the shared position and control-size contract', () => {
    const element = document.createElement('web-project-shell');
    document.body.append(element);

    const styles = getStyles(element);
    expect(styles).toContain('--web-shell-control-inset-block-start');
    expect(styles).toContain('--web-shell-control-inset-inline-start');
    expect(styles).toContain('box-sizing: border-box');
    expect(styles).toContain('--web-shell-control-block-size');
  });
});
