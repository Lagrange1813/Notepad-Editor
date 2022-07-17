/// <reference types="./types" />
declare global {
    interface Window {
        MathJax: any;
    }
}
export declare const mathRender: (element: HTMLElement, options?: {
    math?: LGMath;
}) => void;
