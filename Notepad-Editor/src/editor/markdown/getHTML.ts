import {getMarkdown} from "./getMarkdown";

export const getHTML = (vditor: IVditor) => {
    if (vditor.currentMode === "sv") {
        return vditor.lute.Md2HTML(getMarkdown(vditor));
    } else if (vditor.currentMode === "wysiwyg") {
        return vditor.lute.VditorDOM2HTML(vditor.wysiwyg.element.innerHTML);
    }
};
