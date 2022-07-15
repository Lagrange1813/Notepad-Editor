export const setTheme = (vditor: LGEditor) => {
    if (vditor.options.theme === "dark") {
        vditor.element.classList.add("vditor--dark");
    } else {
        vditor.element.classList.remove("vditor--dark");
    }
};
