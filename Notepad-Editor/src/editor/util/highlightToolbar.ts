import {highlightToolbarWYSIWYG} from "../wysiwyg/highlightToolbarWYSIWYG";

export const highlightToolbar = (vditor: LGEditor) => {
    if (vditor.currentMode === "wysiwyg") {
        highlightToolbarWYSIWYG(vditor);
    }
};
