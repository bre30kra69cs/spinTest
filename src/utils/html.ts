export const html = (content: string) => {
  const template = document.createElement('template');
  template.innerHTML = content.trim();
  return template.content.firstChild;
};
