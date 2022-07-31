import {addScript} from "../util/addScript";
import {abcRenderAdapter} from "./adapterRender";

declare const ABCJS: {
    renderAbc(element: HTMLElement, text: string): void;
};

export const abcRender = (element: (HTMLElement | Document) = document) => {
    const abcElements = abcRenderAdapter.getElements(element);
    if (abcElements.length > 0) {
        addScript(`../dist/lib/abcjs/abcjs_basic.min.js`, "vditorAbcjsScript").then(() => {
            abcElements.forEach((item: HTMLDivElement) => {
                if (item.parentElement.classList.contains("vditor-wysiwyg__pre") ||
                    item.parentElement.classList.contains("vditor-ir__marker--pre")) {
                    return;
                }
                if (item.getAttribute("data-processed") === "true") {
                    return;
                }
                ABCJS.renderAbc(item, abcRenderAdapter.getCode(item).trim());
                item.style.overflowX = "auto";
                item.setAttribute("data-processed", "true");
            });
        });
    }
};
