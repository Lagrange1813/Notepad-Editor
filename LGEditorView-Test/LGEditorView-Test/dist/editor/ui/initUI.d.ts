/// <reference types="./types" />
declare global {
    interface Window {
        visualViewport: HTMLElement;
    }
}
export declare const initUI: (vditor: LGEditor) => void;
export declare const setPadding: (vditor: LGEditor) => void;
export declare const setTypewriterPosition: (vditor: LGEditor) => void;
export declare function UIUnbindListener(): void;
