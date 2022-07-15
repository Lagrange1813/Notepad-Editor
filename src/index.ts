import "./assets/less/index.less";
import NeditorMethod from "./method";
import {Constants} from "./editor/constants";
import {Hint} from "./editor/hint/index";
import {IR} from "./editor/ir/index";
import {input as irInput} from "./editor/ir/input";
import {processAfterRender} from "./editor/ir/process";
import {getHTML} from "./editor/markdown/getHTML";
import {getMarkdown} from "./editor/markdown/getMarkdown";
import {setLute} from "./editor/markdown/setLute";
import {Outline} from "./editor/outline/index";
import {Preview} from "./editor/preview/index";
import {Resize} from "./editor/resize/index";
import {Editor} from "./editor/sv/index";
import {inputEvent} from "./editor/sv/inputEvent";
import {processAfterRender as processSVAfterRender} from "./editor/sv/process";
import {Tip} from "./editor/tip/index";
import {Toolbar} from "./editor/toolbar/index";
import {disableToolbar, hidePanel} from "./editor/toolbar/setToolbar";
import {enableToolbar} from "./editor/toolbar/setToolbar";
import {initUI, UIUnbindListener} from "./editor/ui/initUI";
import {setCodeTheme} from "./editor/ui/setCodeTheme";
import {setContentTheme} from "./editor/ui/setContentTheme";
import {setPreviewMode} from "./editor/ui/setPreviewMode";
import {setTheme} from "./editor/ui/setTheme";
import {Undo} from "./editor/undo/index";
import {addScript, addScriptSync} from "./editor/util/addScript";
import {getSelectText} from "./editor/util/getSelectText";
import {Options} from "./editor/util/Options";
import {processCodeRender} from "./editor/util/processCode";
import {getCursorPosition, getEditorRange} from "./editor/util/selection";

class Neditor extends NeditorMethod {
    // public readonly version: string;
    public neditor: LGEditor;

    /**
     * @param id 要挂载 Vditor 的元素或者元素 ID。
     * @param options Vditor 参数
     */
    constructor(id: string | HTMLElement, options?: LGOptions) {
        super();
        // this.version = VDITOR_VERSION;

        if (typeof id === "string") {
            if (!options) {
                options = {
                    cache: {
                        id: `vditor${id}`,
                    },
                };
            } else if (!options.cache) {
                options.cache = {id: `vditor${id}`};
            } else if (!options.cache.id) {
                options.cache.id = `vditor${id}`;
            }
            id = document.getElementById(id);
        }

        const getOptions = new Options(options);
        const mergedOptions = getOptions.merge();

        // 支持自定义国际化
        if (!mergedOptions.i18n) {
            if (!["en_US", "ja_JP", "ko_KR", "ru_RU", "zh_CN", "zh_TW"].includes(mergedOptions.lang)) {
                throw new Error(
                    "options.lang error, see https://ld246.com/article/1549638745630#options",
                );
            } else {
                const i18nScriptPrefix = "vditorI18nScript";
                const i18nScriptID = i18nScriptPrefix + mergedOptions.lang;
                document.querySelectorAll(`head script[id^="${i18nScriptPrefix}"]`).forEach((el) => {
                    if (el.id !== i18nScriptID) {
                        document.head.removeChild(el);
                    }
                });
                addScript(`/dist/lib/i18n/${mergedOptions.lang}.js`, i18nScriptID).then(() => {
                    this.init(id as HTMLElement, mergedOptions);
                });
            }
        } else {
            window.VditorI18n = mergedOptions.i18n;
            this.init(id, mergedOptions);
        }
    }

    /** 设置主题 */
    public setTheme(
        theme: "dark" | "classic",
        contentTheme?: string,
        codeTheme?: string,
        contentThemePath?: string,
    ) {
        this.neditor.options.theme = theme;
        setTheme(this.neditor);
        if (contentTheme) {
            this.neditor.options.preview.theme.current = contentTheme;
            setContentTheme(contentTheme, contentThemePath || this.neditor.options.preview.theme.path);
        }
        if (codeTheme) {
            this.neditor.options.preview.hljs.style = codeTheme;
            setCodeTheme(codeTheme);
        }
    }

    /** 获取 Markdown 内容 */
    public getValue() {
        return getMarkdown(this.neditor);
    }

    /** 获取编辑器当前编辑模式 */
    public getCurrentMode() {
        return this.neditor.currentMode;
    }

    /** 聚焦到编辑器 */
    public focus() {
        if (this.neditor.currentMode === "sv") {
            this.neditor.sv.element.focus();
        } else if (this.neditor.currentMode === "ir") {
            this.neditor.ir.element.focus();
        }
    }

    /** 让编辑器失焦 */
    public blur() {
        if (this.neditor.currentMode === "sv") {
            this.neditor.sv.element.blur();
        } else if (this.neditor.currentMode === "ir") {
            this.neditor.ir.element.blur();
        }
    }

    /** 禁用编辑器 */
    public disabled() {
        hidePanel(this.neditor, ["subToolbar", "hint", "popover"]);
        disableToolbar(
            this.neditor.toolbar.elements,
            Constants.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"]),
        );
        this.neditor[this.neditor.currentMode].element.setAttribute(
            "contenteditable",
            "false",
        );
    }

    /** 解除编辑器禁用 */
    public enable() {
        enableToolbar(
            this.neditor.toolbar.elements,
            Constants.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"]),
        );
        this.neditor.undo.resetIcon(this.neditor);
        this.neditor[this.neditor.currentMode].element.setAttribute("contenteditable", "true");
    }

    /** 返回选中的字符串 */
    public getSelection() {
        if (this.neditor.currentMode === "sv") {
            return getSelectText(this.neditor.sv.element);
        } else if (this.neditor.currentMode === "ir") {
            return getSelectText(this.neditor.ir.element);
        }
    }

    /** 设置预览区域内容 */
    public renderPreview(value?: string) {
        this.neditor.preview.render(this.neditor, value);
    }

    /** 获取焦点位置 */
    public getCursorPosition() {
        return getCursorPosition(this.neditor[this.neditor.currentMode].element);
    }

    /** 上传是否还在进行中 */
    public isUploading() {
        return this.neditor.upload.isUploading;
    }

    /** 清除缓存 */
    public clearCache() {
        localStorage.removeItem(this.neditor.options.cache.id);
    }

    /** 禁用缓存 */
    public disabledCache() {
        this.neditor.options.cache.enable = false;
    }

    /** 启用缓存 */
    public enableCache() {
        if (!this.neditor.options.cache.id) {
            throw new Error(
                "need options.cache.id, see https://ld246.com/article/1549638745630#options",
            );
        }
        this.neditor.options.cache.enable = true;
    }

    /** HTML 转 md */
    public html2md(value: string) {
        return this.neditor.lute.HTML2Md(value);
    }

    /** markdown 转 JSON 输出 */
    public exportJSON(value: string) {
        return this.neditor.lute.RenderJSON(value);
    }

    /** 获取 HTML */
    public getHTML() {
        return getHTML(this.neditor);
    }

    /** 消息提示。time 为 0 将一直显示 */
    public tip(text: string, time?: number) {
        this.neditor.tip.show(text, time);
    }

    /** 设置预览模式 */
    public setPreviewMode(mode: "both" | "editor") {
        setPreviewMode(mode, this.neditor);
    }

    /** 删除选中内容 */
    public deleteValue() {
        if (window.getSelection().isCollapsed) {
            return;
        }
        document.execCommand("delete", false);
    }

    /** 更新选中内容 */
    public updateValue(value: string) {
        document.execCommand("insertHTML", false, value);
    }

    /** 在焦点处插入内容，并默认进行 Markdown 渲染 */
    public insertValue(value: string, render = true) {
        const range = getEditorRange(this.neditor);
        range.collapse(true);
        const tmpElement = document.createElement("template");
        tmpElement.innerHTML = value;
        range.insertNode(tmpElement.content.cloneNode(true));
        if (this.neditor.currentMode === "sv") {
            this.neditor.sv.preventInput = true;
            if (render) {
                inputEvent(this.neditor);
            }
        } else if (this.neditor.currentMode === "ir") {
            this.neditor.ir.preventInput = true;
            if (render) {
                irInput(this.neditor, getSelection().getRangeAt(0), true);
            }
        }
    }

    /** 设置编辑器内容 */
    public setValue(markdown: string, clearStack = false) {
        if (this.neditor.currentMode === "sv") {
            this.neditor.sv.element.innerHTML = `<div data-block='0'>${this.neditor.lute.SpinVditorSVDOM(markdown)}</div>`;
            processSVAfterRender(this.neditor, {
                enableAddUndoStack: true,
                enableHint: false,
                enableInput: false,
            });
        } else {
            this.neditor.ir.element.innerHTML = this.neditor.lute.Md2VditorIRDOM(markdown);
            this.neditor.ir.element
                .querySelectorAll(".vditor-ir__preview[data-render='2']")
                .forEach((item: HTMLElement) => {
                    processCodeRender(item, this.neditor);
                });
            processAfterRender(this.neditor, {
                enableAddUndoStack: true,
                enableHint: false,
                enableInput: false,
            });
        }

        this.neditor.outline.render(this.neditor);

        if (!markdown) {
            hidePanel(this.neditor, ["emoji", "headings", "submenu", "hint"]);
            this.clearCache();
        }
        if (clearStack) {
            this.clearStack();
        }
    }

    /** 清空 undo & redo 栈 */
    public clearStack() {
        this.neditor.undo.clearStack(this.neditor);
        this.neditor.undo.addToUndoStack(this.neditor);
    }

    /** 销毁编辑器 */
    public destroy() {
        this.neditor.element.innerHTML = this.neditor.originalInnerHTML;
        this.neditor.element.classList.remove("vditor");
        this.neditor.element.removeAttribute("style");
        const iconScript = document.getElementById("vditorIconScript")
        if (iconScript) {
            iconScript.remove();
        }
        this.clearCache();

        UIUnbindListener();
    }

    private init(id: HTMLElement, mergedOptions: LGOptions) {
        this.neditor = {
            currentMode: mergedOptions.mode,
            element: id,
            hint: new Hint(mergedOptions.hint.extend),
            lute: undefined,
            options: mergedOptions,
            originalInnerHTML: id.innerHTML,
            outline: new Outline(window.VditorI18n.outline),
            tip: new Tip(),
        };

        this.neditor.sv = new Editor(this.neditor);
        this.neditor.undo = new Undo();
        this.neditor.ir = new IR(this.neditor);
        this.neditor.toolbar = new Toolbar(this.neditor);

        if (mergedOptions.resize.enable) {
            this.neditor.resize = new Resize(this.neditor);
        }

        addScript(
            mergedOptions._lutePath ||
            `/dist/lib/lute/lute.min.js`,
            "vditorLuteScript",
        ).then(() => {
            this.neditor.lute = setLute({
                autoSpace: this.neditor.options.preview.markdown.autoSpace,
                codeBlockPreview: this.neditor.options.preview.markdown
                    .codeBlockPreview,
                emojiSite: this.neditor.options.hint.emojiPath,
                emojis: this.neditor.options.hint.emoji,
                fixTermTypo: this.neditor.options.preview.markdown.fixTermTypo,
                footnotes: this.neditor.options.preview.markdown.footnotes,
                headingAnchor: false,
                inlineMathDigit: this.neditor.options.preview.math.inlineDigit,
                linkBase: this.neditor.options.preview.markdown.linkBase,
                linkPrefix: this.neditor.options.preview.markdown.linkPrefix,
                listStyle: this.neditor.options.preview.markdown.listStyle,
                mark: this.neditor.options.preview.markdown.mark,
                mathBlockPreview: this.neditor.options.preview.markdown
                    .mathBlockPreview,
                paragraphBeginningSpace: this.neditor.options.preview.markdown
                    .paragraphBeginningSpace,
                sanitize: this.neditor.options.preview.markdown.sanitize,
                toc: this.neditor.options.preview.markdown.toc,
            });

            this.neditor.preview = new Preview(this.neditor);

            initUI(this.neditor);

            if (mergedOptions.after) {
                mergedOptions.after();
            }
            if (mergedOptions.icon) {
                // 防止初始化 2 个编辑器时加载 2 次
                addScriptSync(`/dist/lib/icons/${mergedOptions.icon}.js`, "vditorIconScript");
            }
        });
    }
}

export default Neditor;
