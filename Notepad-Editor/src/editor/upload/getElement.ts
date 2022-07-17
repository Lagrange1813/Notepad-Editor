export const getElement = (vditor: LGEditor) => {
    switch (vditor.currentMode) {
        case "wysiwyg":
            return vditor.wysiwyg.element;
        case "sv":
            return vditor.sv.element;
    }
};
