import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const stylesheet = readFileSync(
  resolve(process.cwd(), 'public/v1/mobile.css'),
  'utf8',
);

describe('the intrinsic sketch layout contract', () => {
  it('keeps the stage and footer in normal grid flow', () => {
    expect(stylesheet).toContain(':where([data-web-sketch-layout])');
    expect(stylesheet).toContain(
      'grid-template-rows: auto minmax(0, 1fr) auto',
    );
    expect(stylesheet).toContain(':where([data-web-sketch-stage])');
    expect(stylesheet).toContain(':where([data-web-sketch-footer])');
    expect(stylesheet).toContain('flex-wrap: wrap');
  });

  it('uses shared safe-area and touch-target policies', () => {
    expect(stylesheet).toContain('var(--web-shell-safe-bottom)');
    expect(stylesheet).toContain('var(--web-shell-touch-target)');
    expect(stylesheet).toContain("[data-web-sketch-layout='scroll']");
    expect(stylesheet).toContain('box-sizing: border-box');
    expect(stylesheet).toContain('margin: 0');
    expect(stylesheet).toContain('min-height: var(--web-shell-touch-target)');
    expect(stylesheet).toContain('height: var(--web-shell-touch-target)');
    expect(stylesheet).toContain("input:not([type='hidden'])");
    expect(stylesheet).toContain("[role='button']");
  });
});
