import isEmail from './is-email';

describe('isEmail', () => {
  describe('return false when email', () => {
    it('is empty', () => {
      expect(isEmail('')).toBeFalsy();
    });

    it('is garbage', () => {
      expect(isEmail('#@%^%#$@#$@#.com')).toBeFalsy();
    });

    it('don`t include user name', () => {
      expect(isEmail('@domain.com')).toBeFalsy();
    });

    it('don`t include `@` character and domain', () => {
      expect(isEmail('plainaddress')).toBeFalsy();
    });

    it('don`t include `@` character', () => {
      expect(isEmail('email.domain.com')).toBeFalsy();
    });

    it('include many `@` characters', () => {
      expect(isEmail('email@domain@domain.com')).toBeFalsy();
    });

    it('starts with `.` character', () => {
      expect(isEmail('.email@domain.com')).toBeFalsy();
    });

    it('contains multiple `.` character', () => {
      expect(isEmail('email..email@domain.com')).toBeFalsy();
    });
  });

  describe('return true when email', () => {
    it('is valid', () => {
      expect(isEmail('email@domain.com')).toBeTruthy();
    });

    it('contains `.` in user name', () => {
      expect(isEmail('firstname.lastname@domain.com')).toBeTruthy();
    });

    it('contains `.` with subdomain', () => {
      expect(isEmail('email@subdomain.domain.com')).toBeTruthy();
    });
  });
});
