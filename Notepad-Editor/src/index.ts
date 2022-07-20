import "./assets/less/index.less";
import NeditorMethod from "./method";
import {Constants} from "./editor/constants";
import {DevTools} from "./editor/devtools/index";
import {Hint} from "./editor/hint/index";
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
import {Upload} from "./editor/upload/index";
import {addScript, addScriptSync} from "./editor/util/addScript";
import {getSelectText} from "./editor/util/getSelectText";
import {Options} from "./editor/util/Options";
import {processCodeRender} from "./editor/util/processCode";
import {getCursorPosition, getEditorRange} from "./editor/util/selection";
import {afterRenderEvent} from "./editor/wysiwyg/afterRenderEvent";
import {WYSIWYG} from "./editor/wysiwyg/index";
import {input} from "./editor/wysiwyg/input";
import {renderDomByMd} from "./editor/wysiwyg/renderDomByMd";
import {Hook} from "./editor/hook/index";

class Neditor extends NeditorMethod {
    public vditor: LGEditor;
    public hook: Hook;

    /**
     * @param id 要挂载 Vditor 的元素或者元素 ID。
     * @param options Vditor 参数
     */
    constructor(id: string | HTMLElement, options?: LGOptions) {
        super();

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
                addScript(`../dist/lib/i18n/${mergedOptions.lang}.js`, i18nScriptID).then(() => {
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
        this.vditor.options.theme = theme;
        setTheme(this.vditor);
        if (contentTheme) {
            this.vditor.options.preview.theme.current = contentTheme;
            setContentTheme(contentTheme, contentThemePath || this.vditor.options.preview.theme.path);
        }
        if (codeTheme) {
            this.vditor.options.preview.hljs.style = codeTheme;
            setCodeTheme(codeTheme);
        }
    }

    /** 获取 Markdown 内容 */
    public getValue() {
        return getMarkdown(this.vditor);
    }

    /** 获取编辑器当前编辑模式 */
    public getCurrentMode() {
        return this.vditor.currentMode;
    }

    /** 聚焦到编辑器 */
    public focus() {
        if (this.vditor.currentMode === "sv") {
            this.vditor.sv.element.focus();
        } else if (this.vditor.currentMode === "wysiwyg") {
            this.vditor.wysiwyg.element.focus();
        }
    }

    /** 让编辑器失焦 */
    public blur() {
        if (this.vditor.currentMode === "sv") {
            this.vditor.sv.element.blur();
        } else if (this.vditor.currentMode === "wysiwyg") {
            this.vditor.wysiwyg.element.blur();
        }
    }

    /** 禁用编辑器 */
    public disabled() {
        hidePanel(this.vditor, ["subToolbar", "hint", "popover"]);
        disableToolbar(
            this.vditor.toolbar.elements,
            Constants.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"]),
        );
        this.vditor[this.vditor.currentMode].element.setAttribute(
            "contenteditable",
            "false",
        );
    }

    /** 解除编辑器禁用 */
    public enable() {
        enableToolbar(
            this.vditor.toolbar.elements,
            Constants.EDIT_TOOLBARS.concat(["undo", "redo", "fullscreen", "edit-mode"]),
        );
        this.vditor.undo.resetIcon(this.vditor);
        this.vditor[this.vditor.currentMode].element.setAttribute("contenteditable", "true");
    }

    /** 返回选中的字符串 */
    public getSelection() {
        if (this.vditor.currentMode === "wysiwyg") {
            return getSelectText(this.vditor.wysiwyg.element);
        } else if (this.vditor.currentMode === "sv") {
            return getSelectText(this.vditor.sv.element);
        }
    }

    /** 设置预览区域内容 */
    public renderPreview(value?: string) {
        this.vditor.preview.render(this.vditor, value);
    }

    /** 获取焦点位置 */
    public getCursorPosition() {
        return getCursorPosition(this.vditor[this.vditor.currentMode].element);
    }

    /** 上传是否还在进行中 */
    public isUploading() {
        return this.vditor.upload.isUploading;
    }

    /** 清除缓存 */
    public clearCache() {
        localStorage.removeItem(this.vditor.options.cache.id);
    }

    /** 禁用缓存 */
    public disabledCache() {
        this.vditor.options.cache.enable = false;
    }

    /** 启用缓存 */
    public enableCache() {
        if (!this.vditor.options.cache.id) {
            throw new Error(
                "need options.cache.id, see https://ld246.com/article/1549638745630#options",
            );
        }
        this.vditor.options.cache.enable = true;
    }

    /** HTML 转 md */
    public html2md(value: string) {
        return this.vditor.lute.HTML2Md(value);
    }

    /** markdown 转 JSON 输出 */
    public exportJSON(value: string) {
        return this.vditor.lute.RenderJSON(value);
    }

    /** 获取 HTML */
    public getHTML() {
        return getHTML(this.vditor);
    }

    /** 消息提示。time 为 0 将一直显示 */
    public tip(text: string, time?: number) {
        this.vditor.tip.show(text, time);
    }

    /** 设置预览模式 */
    public setPreviewMode(mode: "both" | "editor") {
        setPreviewMode(mode, this.vditor);
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
        const range = getEditorRange(this.vditor);
        range.collapse(true);
        const tmpElement = document.createElement("template");
        tmpElement.innerHTML = value;
        range.insertNode(tmpElement.content.cloneNode(true));
        if (this.vditor.currentMode === "sv") {
            this.vditor.sv.preventInput = true;
            if (render) {
                inputEvent(this.vditor);
            }
        } else if (this.vditor.currentMode === "wysiwyg") {
            this.vditor.wysiwyg.preventInput = true;
            if (render) {
                input(this.vditor, getSelection().getRangeAt(0));
            }
        }
    }

    /** 设置编辑器内容 */
    public setValue(markdown: string, clearStack = false) {
        if (this.vditor.currentMode === "sv") {
            this.vditor.sv.element.innerHTML = `<div data-block='0'>${this.vditor.lute.SpinVditorSVDOM(markdown)}</div>`;
            processSVAfterRender(this.vditor, {
                enableAddUndoStack: true,
                enableHint: false,
                enableInput: false,
            });
        } else if (this.vditor.currentMode === "wysiwyg") {
            renderDomByMd(this.vditor, markdown, {
                enableAddUndoStack: true,
                enableHint: false,
                enableInput: false,
            });
        }

        this.vditor.outline.render(this.vditor);

        if (!markdown) {
            hidePanel(this.vditor, ["emoji", "headings", "submenu", "hint"]);
            if (this.vditor.wysiwyg.popover) {
                this.vditor.wysiwyg.popover.style.display = "none";
            }
            this.clearCache();
        }
        if (clearStack) {
            this.clearStack();
        }

        // this.hook.syncHeight();
    }

    /** 清空 undo & redo 栈 */
    public clearStack() {
        this.vditor.undo.clearStack(this.vditor);
        this.vditor.undo.addToUndoStack(this.vditor);
    }

    /** 销毁编辑器 */
    public destroy() {
        this.vditor.element.innerHTML = this.vditor.originalInnerHTML;
        this.vditor.element.classList.remove("vditor");
        this.vditor.element.removeAttribute("style");
        const iconScript = document.getElementById("vditorIconScript")
        if (iconScript) {
            iconScript.remove();
        }
        this.clearCache();

        UIUnbindListener();
        this.vditor.wysiwyg.unbindListener();
    }

    private init(id: HTMLElement, mergedOptions: LGOptions) {
        this.vditor = {
            currentMode: mergedOptions.mode,
            element: id,
            hint: new Hint(mergedOptions.hint.extend),
            lute: undefined,
            options: mergedOptions,
            originalInnerHTML: id.innerHTML,
            outline: new Outline(window.VditorI18n.outline),
            tip: new Tip(),
        };

        this.hook = new Hook(this.vditor);

        this.vditor.sv = new Editor(this.vditor);
        this.vditor.undo = new Undo();
        this.vditor.wysiwyg = new WYSIWYG(this.vditor);
        this.vditor.toolbar = new Toolbar(this.vditor);

        if (mergedOptions.resize.enable) {
            this.vditor.resize = new Resize(this.vditor);
        }

        if (this.vditor.toolbar.elements.devtools) {
            this.vditor.devtools = new DevTools();
        }

        if (mergedOptions.upload.url || mergedOptions.upload.handler) {
            this.vditor.upload = new Upload();
        }

        addScript(
            mergedOptions._lutePath ||
            `../dist/lib/lute/lute.min.js`,
            "vditorLuteScript",
        ).then(() => {
            this.vditor.lute = setLute({
                autoSpace: this.vditor.options.preview.markdown.autoSpace,
                codeBlockPreview: this.vditor.options.preview.markdown
                    .codeBlockPreview,
                emojiSite: this.vditor.options.hint.emojiPath,
                emojis: this.vditor.options.hint.emoji,
                fixTermTypo: this.vditor.options.preview.markdown.fixTermTypo,
                footnotes: this.vditor.options.preview.markdown.footnotes,
                headingAnchor: false,
                inlineMathDigit: this.vditor.options.preview.math.inlineDigit,
                linkBase: this.vditor.options.preview.markdown.linkBase,
                linkPrefix: this.vditor.options.preview.markdown.linkPrefix,
                listStyle: this.vditor.options.preview.markdown.listStyle,
                mark: this.vditor.options.preview.markdown.mark,
                mathBlockPreview: this.vditor.options.preview.markdown
                    .mathBlockPreview,
                paragraphBeginningSpace: this.vditor.options.preview.markdown
                    .paragraphBeginningSpace,
                sanitize: this.vditor.options.preview.markdown.sanitize,
                toc: this.vditor.options.preview.markdown.toc,
            });

            this.vditor.preview = new Preview(this.vditor);

            initUI(this.vditor);

            if (mergedOptions.after) {
                mergedOptions.after();
            }
            if (mergedOptions.icon) {
                // 防止初始化 2 个编辑器时加载 2 次
                addScriptSync(`https://unpkg.com/vditor@3.8.15/dist/js/icons/${mergedOptions.icon}.js`, "vditorIconScript");
            }
        });
    }
}

export default Neditor;
