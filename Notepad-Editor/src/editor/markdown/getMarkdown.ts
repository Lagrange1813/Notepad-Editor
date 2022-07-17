import {code160to32} from "../util/code160to32";

export const getMarkdown = (vditor: LGEditor) => {
    if (vditor.currentMode === "sv") {
        return code160to32(`${vditor.sv.element.textContent}\n`.replace(/\n\n$/, "\n"));
    } else if (vditor.currentMode === "wysiwyg") {
        return vditor.lute.VditorDOM2Md(vditor.wysiwyg.element.innerHTML);
    }
    return "";
};
