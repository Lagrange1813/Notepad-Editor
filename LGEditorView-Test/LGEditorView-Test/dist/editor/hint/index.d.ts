/// <reference types="./types" />
export declare class Hint {
    timeId: number;
    element: HTMLDivElement;
    recentLanguage: string;
    private splitChar;
    private lastIndex;
    constructor(hintExtends: IHintExtend[]);
    render(vditor: LGEditor): void;
    genHTML(data: IHintData[], key: string, vditor: LGEditor): void;
    fillEmoji: (element: HTMLElement, vditor: LGEditor) => void;
    select(event: KeyboardEvent, vditor: LGEditor): boolean;
    private getKey;
}
