import { JSDOM } from 'jsdom';
import { _document } from '../views';

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

export function renderPage(page: (...args: any) => JSX.Element, props: Parameters<typeof page>) {
  const ch = page(props);
  const doc = _document({ children: ch });
  return doc;
}
