/// <reference types="./types" />
export declare const processPaste: (vditor: LGEditor, text: string) => void;
export declare const getSideByType: (spanNode: Node, type: string, isPrevious?: boolean) => false | Element;
export declare const processSpinVditorSVDOM: (html: string, vditor: LGEditor) => string;
export declare const processPreviousMarkers: (spanElement: HTMLElement) => string;
export declare const processAfterRender: (vditor: LGEditor, options?: {
    enableAddUndoStack: boolean;
    enableHint: boolean;
    enableInput: boolean;
}) => void;
export declare const processHeading: (vditor: LGEditor, value: string) => void;
export declare const processToolbar: (vditor: LGEditor, actionBtn: Element, prefix: string, suffix: string) => void;
