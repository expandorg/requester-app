import { findVars } from '../restoreVariables';

describe('restoreVariables', () => {
  describe('findVars()', () => {
    it('should return empty array wnen no vars provided', () => {
      const result = findVars('');
      const result2 = findVars('test testtest');

      expect(result).toEqual([]);
      expect(result2).toEqual([]);
    });
  });
  describe('findVars()', () => {
    it('should find single var', () => {
      const result = findVars('test $(variable) asdsd');

      expect(result).toEqual([
        {
          name: '$(variable)',
          start: 5,
          end: 16,
        },
      ]);
    });
    it('should find multiple vars', () => {
      const result = findVars('$(v1) test $(v2) asdsd$(v3)');

      expect(result).toEqual([
        {
          name: '$(v1)',
          start: 0,
          end: 5,
        },
        {
          name: '$(v2)',
          start: 11,
          end: 16,
        },
        {
          name: '$(v3)',
          start: 22,
          end: 27,
        },
      ]);
    });
  });
});
