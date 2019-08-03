import { isValidPassword, isValidPasswordLength } from './is-valid-password';

describe('isValidPasswordLength', () => {
  describe('return false when password', () => {
    it('is empty', () => {
      expect(isValidPasswordLength('')).toBeFalsy();
    });

    it('is shorter than 6 characters', () => {
      expect(isValidPasswordLength('asdfg')).toBeFalsy();
    });
  });

  describe('return true when password', () => {
    it('is 6 letters long', () => {
      expect(isValidPasswordLength('asdfgh')).toBeTruthy();
    });

    it('is 6 numbers long', () => {
      expect(isValidPasswordLength('123456')).toBeTruthy();
    });

    it('is 20 characters long', () => {
      expect(isValidPasswordLength('123456789qwertyuiopa')).toBeTruthy();
    });
  });
});

describe('isValidPassword', () => {
  describe('return false when password', () => {
    it('contains only small letters', () => {
      expect(isValidPassword('asdfghj')).toBeFalsy();
    });

    it('contains only capital letters', () => {
      expect(isValidPassword('FSDGSDRD')).toBeFalsy();
    });

    it('contains only numbers', () => {
      expect(isValidPassword('1443414')).toBeFalsy();
    });

    it('is missing only number', () => {
      expect(isValidPassword('aaAA')).toBeFalsy();
    });

    it('is missing only capital letters', () => {
      expect(isValidPassword('aa11')).toBeFalsy();
    });

    it('is missing only small letters', () => {
      expect(isValidPassword('11AA')).toBeFalsy();
    });
  });

  describe('return true when password', () => {
    it('is valid', () => {
      expect(isValidPassword('aaAA11')).toBeTruthy();
    });

    it('contains special characters', () => {
      expect(isValidPassword('aaAA11!@#$%^&*()_+')).toBeTruthy();
    });
  });
});
