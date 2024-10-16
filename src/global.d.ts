declare module '*.css' {
  const content: { [className: string]: string };
  export = content;
}

declare global {
  interface Window {
    Kakao: any;
  }
}

export {};
