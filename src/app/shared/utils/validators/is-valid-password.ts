export function isValidPasswordLength(value: string): boolean {
  const passwordSizeRegexp = new RegExp(/^.{6,}$/);
  return passwordSizeRegexp.test(value);
}

export function isValidPassword(value: string): boolean {
  const numberRegexp = new RegExp(/.*[0-9].*/);
  const smallLetterRegexp = new RegExp(/.*[a-z].*/);
  const capitalLetterRegexp = new RegExp(/.*[A-Z].*/);

  return numberRegexp.test(value) && smallLetterRegexp.test(value) && capitalLetterRegexp.test(value);
}
