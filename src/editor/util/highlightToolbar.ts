import {highlightToolbarIR} from "../ir/highlightToolbarIR";

export const highlightToolbar = (vditor: LGEditor) => {
    if (vditor.currentMode === "ir") {
        highlightToolbarIR(vditor);
    }
};
