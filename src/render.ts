import { extractCss } from "goober";
import "./styles/globals.css";

export const views = {
  async _document(props: Record<any, any>) {
    const file = (await import("./views/_document")).default;
    return file(props);
  },

  async home(props: Record<any, any>) {
    const file = (await import("./views/home")).default;
    return file(props);
  },
};

export async function jsx(
  view: keyof typeof views,
  options?: Record<string, any>
) {
  const renderFile = async () => {
    const body = await views[view](options ?? {});
    const css = extractCss();
    const doc = await views._document({ css, children: body });
    return doc.outerHTML;
  };

  try {
    return await renderFile();
  } catch (err) {
    console.error(err);
  }
}
