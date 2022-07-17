/// <reference types="./types" />
import { MenuItem } from "./MenuItem";
export declare class Record extends MenuItem {
    constructor(vditor: LGEditor, menuItem: IMenuItem);
    _bindEvent(vditor: LGEditor): void;
}
