import {highlightToolbarWYSIWYG} from "../wysiwyg/highlightToolbarWYSIWYG";

export const highlightToolbar = (vditor: IVditor) => {
    if (vditor.currentMode === "wysiwyg") {
        highlightToolbarWYSIWYG(vditor);
    }
};
