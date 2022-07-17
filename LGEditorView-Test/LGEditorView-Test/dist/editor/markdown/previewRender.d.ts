/// <reference types="./types" />
export declare const md2html: (mdText: string, options?: LGPreviewOptions) => Promise<string>;
export declare const previewRender: (previewElement: HTMLDivElement, markdown: string, options?: LGPreviewOptions) => Promise<void>;
