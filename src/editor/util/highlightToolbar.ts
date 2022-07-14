import {highlightToolbarIR} from "../ir/highlightToolbarIR";

export const highlightToolbar = (vditor: IVditor) => {
    if (vditor.currentMode === "ir") {
        highlightToolbarIR(vditor);
    }
};
