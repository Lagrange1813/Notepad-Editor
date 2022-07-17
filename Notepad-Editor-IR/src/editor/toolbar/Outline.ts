import {Constants} from "../constants";
import {getEventName} from "../util/compatibility";
import {MenuItem} from "./MenuItem";

export class Outline extends MenuItem {
    constructor(neditor: LGEditor, menuItem: IMenuItem) {
        super(neditor, menuItem);
        if (neditor.options.outline) {
            this.element.firstElementChild.classList.add("neditor-menu--current");
        }
        this.element.children[0].addEventListener(getEventName(), (event) => {
            event.preventDefault();
            const btnElement = neditor.toolbar.elements.outline.firstElementChild;
            if (btnElement.classList.contains(Constants.CLASS_MENU_DISABLED)) {
                return;
            }
            neditor.options.outline.enable = !this.element.firstElementChild.classList.contains("neditor-menu--current");
            neditor.outline.toggle(neditor, neditor.options.outline.enable);
        });
    }
}
