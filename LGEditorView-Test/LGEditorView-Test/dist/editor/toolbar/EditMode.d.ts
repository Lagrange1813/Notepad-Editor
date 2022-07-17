/// <reference types="./types" />
import { MenuItem } from "./MenuItem";
export declare const setEditMode: (vditor: LGEditor, type: string, event: Event | string) => void;
export declare class EditMode extends MenuItem {
    element: HTMLElement;
    constructor(vditor: LGEditor, menuItem: IMenuItem);
    _bindEvent(vditor: LGEditor, panelElement: HTMLElement, menuItem: IMenuItem): void;
}
