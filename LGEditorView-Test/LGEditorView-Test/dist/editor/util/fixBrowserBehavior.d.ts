/// <reference types="./types" />
export declare const fixGSKeyBackspace: (event: KeyboardEvent, vditor: LGEditor, startContainer: Node) => boolean;
export declare const fixCJKPosition: (range: Range, vditor: LGEditor, event: KeyboardEvent) => void;
export declare const fixCursorDownInlineMath: (range: Range, key: string) => void;
export declare const insertEmptyBlock: (vditor: LGEditor, position: InsertPosition) => void;
export declare const isFirstCell: (cellElement: HTMLElement) => false | HTMLTableElement;
export declare const isLastCell: (cellElement: HTMLElement) => false | HTMLTableElement;
export declare const insertAfterBlock: (vditor: LGEditor, event: KeyboardEvent, range: Range, element: HTMLElement, blockElement: HTMLElement) => boolean;
export declare const insertBeforeBlock: (vditor: LGEditor, event: KeyboardEvent, range: Range, element: HTMLElement, blockElement: HTMLElement) => boolean;
export declare const listToggle: (vditor: LGEditor, range: Range, type: string, cancel?: boolean) => void;
export declare const listIndent: (vditor: LGEditor, liElement: HTMLElement, range: Range) => void;
export declare const listOutdent: (vditor: LGEditor, liElement: HTMLElement, range: Range, topListElement: HTMLElement) => void;
export declare const setTableAlign: (tableElement: HTMLTableElement, type: string) => void;
export declare const isHrMD: (text: string) => boolean;
export declare const isHeadingMD: (text: string) => boolean;
export declare const execAfterRender: (vditor: LGEditor, options?: {
    enableAddUndoStack: boolean;
    enableHint: boolean;
    enableInput: boolean;
}) => void;
export declare const fixList: (range: Range, vditor: LGEditor, pElement: HTMLElement | false, event: KeyboardEvent) => boolean;
export declare const fixTab: (vditor: LGEditor, range: Range, event: KeyboardEvent) => boolean;
export declare const fixMarkdown: (event: KeyboardEvent, vditor: LGEditor, pElement: HTMLElement | false, range: Range) => boolean;
export declare const insertRow: (vditor: LGEditor, range: Range, cellElement: HTMLElement) => void;
export declare const insertRowAbove: (vditor: LGEditor, range: Range, cellElement: HTMLElement) => void;
export declare const insertColumn: (vditor: LGEditor, tableElement: HTMLTableElement, cellElement: HTMLElement, type?: InsertPosition) => void;
export declare const deleteRow: (vditor: LGEditor, range: Range, cellElement: HTMLElement) => void;
export declare const deleteColumn: (vditor: LGEditor, range: Range, tableElement: HTMLTableElement, cellElement: HTMLElement) => void;
export declare const fixTable: (vditor: LGEditor, event: KeyboardEvent, range: Range) => boolean;
export declare const fixCodeBlock: (vditor: LGEditor, event: KeyboardEvent, codeRenderElement: HTMLElement, range: Range) => boolean;
export declare const fixBlockquote: (vditor: LGEditor, range: Range, event: KeyboardEvent, pElement: HTMLElement | false) => boolean;
export declare const fixTask: (vditor: LGEditor, range: Range, event: KeyboardEvent) => boolean;
export declare const fixDelete: (vditor: LGEditor, range: Range, event: KeyboardEvent, pElement: HTMLElement | false) => boolean;
export declare const fixHR: (range: Range) => void;
export declare const fixFirefoxArrowUpTable: (event: KeyboardEvent, blockElement: false | HTMLElement, range: Range) => boolean;
export declare const paste: (vditor: LGEditor, event: (ClipboardEvent | DragEvent) & {
    target: HTMLElement;
}, callback: {
    pasteCode(code: string): void;
}) => Promise<void>;
