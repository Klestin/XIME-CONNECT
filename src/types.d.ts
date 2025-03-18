/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 