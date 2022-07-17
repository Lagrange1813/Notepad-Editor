/// <reference types="./types" />
export declare class Hook {
    private neditor;
    constructor(neditor: LGEditor);
    setEditorMode(type: string): void;
    getText(): string;
}
