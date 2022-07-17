/// <reference types="./types" />
import { MenuItem } from "./MenuItem";
export declare class Headings extends MenuItem {
    element: HTMLElement;
    constructor(vditor: LGEditor, menuItem: IMenuItem);
    _bindEvent(vditor: LGEditor, panelElement: HTMLElement): void;
}
