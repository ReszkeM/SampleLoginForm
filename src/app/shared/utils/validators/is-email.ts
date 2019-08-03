export default function isEmail(value: string): boolean {
  const regexp = new RegExp(/^\w+[.]{0,1}\w+@\w+[.]{0,1}\w+\.[a-zA-Z]{2,3}$/);
  return regexp.test(value);
}
