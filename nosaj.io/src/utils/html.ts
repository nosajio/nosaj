import { JSDOM } from 'jsdom';

export function injectHTMLAtSelector(
  document: HTMLElement,
  selector: string,
  html: string,
) {
  const domEl = new JSDOM(document.outerHTML);
  const qel = domEl.window.document.querySelector(selector);
  if (qel) {
    qel.innerHTML = html;
  }
  return domEl.window.document;
}
