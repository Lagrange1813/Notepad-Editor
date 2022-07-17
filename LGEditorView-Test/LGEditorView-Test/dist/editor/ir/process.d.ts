/// <reference types="./types" />
export declare const processHint: (vditor: LGEditor) => void;
export declare const processAfterRender: (vditor: LGEditor, options?: {
    enableAddUndoStack: boolean;
    enableHint: boolean;
    enableInput: boolean;
}) => void;
export declare const processHeading: (vditor: LGEditor, value: string) => void;
export declare const processToolbar: (vditor: LGEditor, actionBtn: Element, prefix: string, suffix: string) => void;
