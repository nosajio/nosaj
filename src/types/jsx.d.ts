// Redefine JSX return type to align with hyperscript return type, as
// hyperscript is the build target
export declare global {
  namespace JSX {
      interface Element extends HTMLElement { }
  }
}