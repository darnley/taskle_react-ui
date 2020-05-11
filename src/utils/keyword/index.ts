export function parseKeyword(word: string) {
  if (!word) return '';

  return word
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\.+/g, '-')
    .replace(/^-+|-+$/g, '');
}
