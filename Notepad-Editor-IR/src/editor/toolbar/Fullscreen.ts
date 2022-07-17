import {setPadding, setTypewriterPosition} from "../ui/initUI";
import {getEventName} from "../util/compatibility";
import {MenuItem} from "./MenuItem";

export class Fullscreen extends MenuItem {
    constructor(neditor: LGEditor, menuItem: IMenuItem) {
        super(neditor, menuItem);
        this._bindEvent(neditor, menuItem);
    }

    public _bindEvent(neditor: LGEditor, menuItem: IMenuItem) {
        this.element.children[0].addEventListener(getEventName(), function(event) {
            event.preventDefault();
            if (neditor.element.className.includes("neditor--fullscreen")) {
                if (!menuItem.level) {
                    this.innerHTML = menuItem.icon;
                }
                neditor.element.style.zIndex = "";
                document.body.style.overflow = "";
                neditor.element.classList.remove("neditor--fullscreen");
                Object.keys(neditor.toolbar.elements).forEach((key) => {
                    const svgElement = neditor.toolbar.elements[key].firstChild as HTMLElement;
                    if (svgElement) {
                        svgElement.className = svgElement.className.replace("__s", "__n");
                    }
                });
                if (neditor.counter) {
                    neditor.counter.element.className = neditor.counter.element.className.replace("__s", "__n");
                }
            } else {
                if (!menuItem.level) {
                    this.innerHTML = '<svg><use xlink:href="#neditor-icon-contract"></use></svg>';
                }
                neditor.element.style.zIndex = neditor.options.fullscreen.index.toString();
                document.body.style.overflow = "hidden";
                neditor.element.classList.add("neditor--fullscreen");
                Object.keys(neditor.toolbar.elements).forEach((key) => {
                    const svgElement = neditor.toolbar.elements[key].firstChild as HTMLElement;
                    if (svgElement) {
                        svgElement.className = svgElement.className.replace("__n", "__s");
                    }
                });
                if (neditor.counter) {
                    neditor.counter.element.className = neditor.counter.element.className.replace("__n", "__s");
                }
            }

            // if (neditor.devtools) {
            //     neditor.devtools.renderEchart(neditor);
            // }

            if (menuItem.click) {
                menuItem.click(event, neditor);
            }

            setPadding(neditor);

            setTypewriterPosition(neditor);
        });
    }
}
