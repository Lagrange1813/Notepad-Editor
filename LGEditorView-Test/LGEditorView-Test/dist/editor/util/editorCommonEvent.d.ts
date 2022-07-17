/// <reference types="./types" />
export declare const focusEvent: (vditor: LGEditor, editorElement: HTMLElement) => void;
export declare const dblclickEvent: (vditor: LGEditor, editorElement: HTMLElement) => void;
export declare const blurEvent: (vditor: LGEditor, editorElement: HTMLElement) => void;
export declare const dropEvent: (vditor: LGEditor, editorElement: HTMLElement) => void;
export declare const copyEvent: (vditor: LGEditor, editorElement: HTMLElement, copy: (event: ClipboardEvent, vditor: LGEditor) => void) => void;
export declare const cutEvent: (vditor: LGEditor, editorElement: HTMLElement, copy: (event: ClipboardEvent, vditor: LGEditor) => void) => void;
export declare const scrollCenter: (vditor: LGEditor) => void;
export declare const hotkeyEvent: (vditor: LGEditor, editorElement: HTMLElement) => void;
export declare const selectEvent: (vditor: LGEditor, editorElement: HTMLElement) => void;
