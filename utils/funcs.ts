export function incLetter(l: string): string {
  let v = l.charCodeAt(0) + 1 > 122 ? 97 : l.charCodeAt(0) + 1;

  return String.fromCharCode(v);
}
