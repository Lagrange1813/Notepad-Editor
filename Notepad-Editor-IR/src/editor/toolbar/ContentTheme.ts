import {setContentTheme} from "../ui/setContentTheme";
import {getEventName} from "../util/compatibility";
import {MenuItem} from "./MenuItem";
import {hidePanel, toggleSubMenu} from "./setToolbar";

export class ContentTheme extends MenuItem {
    public element: HTMLElement;

    constructor(neditor: LGEditor, menuItem: IMenuItem) {
        super(neditor, menuItem);

        const actionBtn = this.element.children[0] as HTMLElement;

        const panelElement = document.createElement("div");
        panelElement.className = `vditor-hint${menuItem.level === 2 ? "" : " vditor-panel--arrow"}`;
        let innerHTML = "";
        Object.keys(neditor.options.preview.theme.list).forEach((key) => {
            innerHTML += `<button data-type="${key}">${neditor.options.preview.theme.list[key]}</button>`;
        });
        panelElement.innerHTML =
            `<div style="overflow: auto;max-height:${window.innerHeight / 2}px">${innerHTML}</div>`;
        panelElement.addEventListener(getEventName(), (event: MouseEvent & { target: HTMLElement }) => {
            if (event.target.tagName === "BUTTON") {
                hidePanel(neditor, ["subToolbar"]);
                neditor.options.preview.theme.current = event.target.getAttribute("data-type");
                setContentTheme(neditor.options.preview.theme.current, neditor.options.preview.theme.path);
                event.preventDefault();
                event.stopPropagation();
            }
        });
        this.element.appendChild(panelElement);

        toggleSubMenu(neditor, panelElement, actionBtn, menuItem.level);
    }
}
