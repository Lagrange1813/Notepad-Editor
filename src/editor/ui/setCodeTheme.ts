import {Constants} from "../constants";
import {addStyle} from "../util/addStyle";

export const setCodeTheme = (codeTheme: string) => {
    if (!Constants.CODE_THEME.includes(codeTheme)) {
        codeTheme = "github";
    }
    const vditorHljsStyle = document.getElementById("vditorHljsStyle") as HTMLLinkElement;
    const href = `../dist/lib/highlight.js/styles/${codeTheme}.css`;
    if (!vditorHljsStyle) {
        addStyle(href, "vditorHljsStyle");
    } else if (vditorHljsStyle.href !== href) {
        vditorHljsStyle.remove();
        addStyle(href, "vditorHljsStyle");
    }
};
