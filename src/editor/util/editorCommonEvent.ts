import {Constants} from "../constants";
import {processHeading} from "../ir/process";
import {processKeydown as irProcessKeydown} from "../ir/processKeydown";
import {getMarkdown} from "../markdown/getMarkdown";
import {previewImage} from "../preview/image";
import {processHeading as processHeadingSV} from "../sv/process";
import {processKeydown as mdProcessKeydown} from "../sv/processKeydown";
import {setEditMode} from "../toolbar/EditMode";
import {hidePanel} from "../toolbar/setToolbar";
import {getEventName, isCtrl} from "./compatibility";
import {execAfterRender, paste} from "./fixBrowserBehavior";
import {getSelectText} from "./getSelectText";
import {hasClosestByAttribute, hasClosestByMatchTag} from "./hasClosest";
import {matchHotKey} from "./hotKey";
import {getCursorPosition, getEditorRange} from "./selection";

export const focusEvent = (vditor: LGEditor, editorElement: HTMLElement) => {
    editorElement.addEventListener("focus", () => {
        if (vditor.options.focus) {
            vditor.options.focus(getMarkdown(vditor));
        }
        hidePanel(vditor, ["subToolbar", "hint"]);
    });
};

export const dblclickEvent = (vditor: LGEditor, editorElement: HTMLElement) => {
    editorElement.addEventListener("dblclick", (event: MouseEvent & { target: HTMLElement }) => {
        if (event.target.tagName === "IMG") {
            previewImage(event.target as HTMLImageElement, vditor.options.lang, vditor.options.theme);
        }
    });
};

export const blurEvent = (vditor: LGEditor, editorElement: HTMLElement) => {
    editorElement.addEventListener("blur", (event) => {
        if (vditor.currentMode === "ir") {
            const expandElement = vditor.ir.element.querySelector(".vditor-ir__node--expand");
            if (expandElement) {
                expandElement.classList.remove("vditor-ir__node--expand");
            }
        }
        vditor[vditor.currentMode].range = getEditorRange(vditor);
        if (vditor.options.blur) {
            vditor.options.blur(getMarkdown(vditor));
        }
    });
};

export const dropEvent = (vditor: LGEditor, editorElement: HTMLElement) => {
    editorElement.addEventListener("dragstart", (event) => {
        // ???????????????????????????????????????
        event.dataTransfer.setData(Constants.DROP_EDITOR, Constants.DROP_EDITOR);
    });
    editorElement.addEventListener("drop",
        (event: ClipboardEvent & { dataTransfer?: DataTransfer, target: HTMLElement }) => {
            if (event.dataTransfer.getData(Constants.DROP_EDITOR)) {
                // ??????????????????????????????
                execAfterRender(vditor);
            } else if (event.dataTransfer.types.includes("Files") || event.dataTransfer.types.includes("text/html")) {
                // ??????????????????????????????????????????????????????????????????
                paste(vditor, event, {
                    pasteCode: (code: string) => {
                        document.execCommand("insertHTML", false, code);
                    },
                });
            }
        });
};

export const copyEvent =
    (vditor: LGEditor, editorElement: HTMLElement, copy: (event: ClipboardEvent, vditor: LGEditor) => void) => {
        editorElement.addEventListener("copy", (event: ClipboardEvent) => copy(event, vditor));
    };

export const cutEvent =
    (vditor: LGEditor, editorElement: HTMLElement, copy: (event: ClipboardEvent, vditor: LGEditor) => void) => {
        editorElement.addEventListener("cut", (event: ClipboardEvent) => {
            copy(event, vditor);
            document.execCommand("delete");
        });
    };

export const scrollCenter = (vditor: LGEditor) => {
    if (!vditor.options.typewriterMode) {
        return;
    }
    const editorElement = vditor[vditor.currentMode].element;
    const cursorTop = getCursorPosition(editorElement).top;
    if (vditor.options.height === "auto" && !vditor.element.classList.contains("vditor--fullscreen")) {
        window.scrollTo(window.scrollX,
            cursorTop + vditor.element.offsetTop + vditor.toolbar.element.offsetHeight - window.innerHeight / 2 + 10);
    }
    if (vditor.options.height !== "auto" || vditor.element.classList.contains("vditor--fullscreen")) {
        editorElement.scrollTop = cursorTop + editorElement.scrollTop - editorElement.clientHeight / 2 + 10;
    }
};

export const hotkeyEvent = (vditor: LGEditor, editorElement: HTMLElement) => {
    editorElement.addEventListener("keydown", (event: KeyboardEvent & { target: HTMLElement }) => {
        // hint: ????????????
        if ((vditor.options.hint.extend.length > 1 || vditor.toolbar.elements.emoji) &&
            vditor.hint.select(event, vditor)) {
            return;
        }

        if (vditor.currentMode === "sv") {
            if (mdProcessKeydown(vditor, event)) {
                return;
            }
        }  else if (vditor.currentMode === "ir") {
            if (irProcessKeydown(vditor, event)) {
                return;
            }
        }

        if (vditor.options.ctrlEnter && matchHotKey("???Enter", event)) {
            vditor.options.ctrlEnter(getMarkdown(vditor));
            event.preventDefault();
            return;
        }

        // undo
        if (matchHotKey("???Z", event) && !vditor.toolbar.elements.undo) {
            vditor.undo.undo(vditor);
            event.preventDefault();
            return;
        }

        // redo
        if (matchHotKey("???Y", event) && !vditor.toolbar.elements.redo) {
            vditor.undo.redo(vditor);
            event.preventDefault();
            return;
        }

        // esc
        if (event.key === "Escape") {
            if (vditor.hint.element.style.display === "block") {
                vditor.hint.element.style.display = "none";
            } else if (vditor.options.esc && !event.isComposing) {
                vditor.options.esc(getMarkdown(vditor));
            }
            event.preventDefault();
            return;
        }

        // h1 - h6 hotkey
        if (isCtrl(event) && event.altKey && !event.shiftKey && /^Digit[1-6]$/.test(event.code)) {
            if (vditor.currentMode === "sv") {
                processHeadingSV(vditor, "#".repeat(parseInt(event.code.replace("Digit", ""), 10)) + " ");
            } else if (vditor.currentMode === "ir") {
                processHeading(vditor, "#".repeat(parseInt(event.code.replace("Digit", ""), 10)) + " ");
            }
            event.preventDefault();
            return true;
        }

        // toggle edit mode
        if (isCtrl(event) && event.altKey && !event.shiftKey && /^Digit[7-9]$/.test(event.code)) {
            if (event.code === "Digit8") {
                setEditMode(vditor, "ir", event);
            } else if (event.code === "Digit9") {
                setEditMode(vditor, "sv", event);
            }
            return true;
        }

        // toolbar action
        vditor.options.toolbar.find((menuItem: IMenuItem) => {
            if (!menuItem.hotkey || menuItem.toolbar) {
                if (menuItem.toolbar) {
                    const sub = menuItem.toolbar.find((subMenuItem: IMenuItem) => {
                        if (!subMenuItem.hotkey) {
                            return false;
                        }
                        if (matchHotKey(subMenuItem.hotkey, event)) {
                            vditor.toolbar.elements[subMenuItem.name].children[0]
                                .dispatchEvent(new CustomEvent(getEventName()));
                            event.preventDefault();
                            return true;
                        }
                    });
                    return sub ? true : false;
                }
                return false;
            }
            if (matchHotKey(menuItem.hotkey, event)) {
                vditor.toolbar.elements[menuItem.name].children[0].dispatchEvent(new CustomEvent(getEventName()));
                event.preventDefault();
                return true;
            }
        });
    });
};

export const selectEvent = (vditor: LGEditor, editorElement: HTMLElement) => {
    editorElement.addEventListener("selectstart", (event: Event & { target: HTMLElement }) => {
        editorElement.onmouseup = () => {
            setTimeout(() => { // ??????????????? range ??????????????????
                const selectText = getSelectText(vditor[vditor.currentMode].element);
                if (selectText.trim()) {
                    if (vditor.options.select) {
                        vditor.options.select(selectText);
                    }
                }
            });
        };
    });
};
