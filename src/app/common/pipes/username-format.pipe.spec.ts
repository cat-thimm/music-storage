import {UsernameFormatPipe} from "./username-format.pipe";

describe('UsernameFormatPipe', () => {
  let pipe: UsernameFormatPipe;

  beforeEach(() => {
    pipe = new UsernameFormatPipe();
  });

  it('should return empty string for falsy values', () => {
    expect(pipe.transform('' as any)).toBe('');
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should capitalize first letter and lowercase the rest', () => {
    expect(pipe.transform('aNNa')).toBe('Anna');
    expect(pipe.transform('ANNA')).toBe('Anna');
    expect(pipe.transform('anna')).toBe('Anna');
    expect(pipe.transform('mAX')).toBe('Max');
  });

  it('should handle single-character inputs', () => {
    expect(pipe.transform('a')).toBe('A');
    expect(pipe.transform('A')).toBe('A');
  });

  it('should not trim whitespace (documents current behavior)', () => {
    // Führender Whitespace bleibt erhalten, da die Pipe nicht trimmt
    expect(pipe.transform('  anna')).toBe('  anna');
  });
});
