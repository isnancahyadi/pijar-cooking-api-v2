export function capitalizeFirstLetter(text: string) {
  if (text) {
    const newText = text.toLowerCase();
    return newText[0].toUpperCase() + newText.slice(1);
  }
  return '';
}
