declare module "*.svg";

declare module "*.png";

interface Window {
    VditorI18n: ITips;
}

interface LGObject {
    [key: string]: string;
}

interface LGLuteNode {
    TokensStr: () => string;
    __internal_object__: {
        Parent: {
            Type: number,
        },
        HeadingLevel: string,
    };
}

type LGLuteRenderCallback = (node: LGLuteNode, entering: boolean) => [string, number];

/** @link https://ld246.com/article/1588412297062 */
interface LGLuteRender {
    renderDocument?: LGLuteRenderCallback;
    renderParagraph?: LGLuteRenderCallback;
    renderText?: LGLuteRenderCallback;
    renderCodeBlock?: LGLuteRenderCallback;
    renderCodeBlockOpenMarker?: LGLuteRenderCallback;
    renderCodeBlockInfoMarker?: LGLuteRenderCallback;
    renderCodeBlockCode?: LGLuteRenderCallback;
    renderCodeBlockCloseMarker?: LGLuteRenderCallback;
    renderMathBlock?: LGLuteRenderCallback;
    renderMathBlockOpenMarker?: LGLuteRenderCallback;
    renderMathBlockContent?: LGLuteRenderCallback;
    renderMathBlockCloseMarker?: LGLuteRenderCallback;
    renderBlockquote?: LGLuteRenderCallback;
    renderBlockquoteMarker?: LGLuteRenderCallback;
    renderHeading?: LGLuteRenderCallback;
    renderHeadingC8hMarker?: LGLuteRenderCallback;
    renderList?: LGLuteRenderCallback;
    renderListItem?: LGLuteRenderCallback;
    renderTaskListItemMarker?: LGLuteRenderCallback;
    renderThematicBreak?: LGLuteRenderCallback;
    renderHTML?: LGLuteRenderCallback;
    renderTable?: LGLuteRenderCallback;
    renderTableHead?: LGLuteRenderCallback;
    renderTableRow?: LGLuteRenderCallback;
    renderTableCell?: LGLuteRenderCallback;
    renderFootnotesDef?: LGLuteRenderCallback;
    renderCodeSpan?: LGLuteRenderCallback;
    renderCodeSpanOpenMarker?: LGLuteRenderCallback;
    renderCodeSpanContent?: LGLuteRenderCallback;
    renderCodeSpanCloseMarker?: LGLuteRenderCallback;
    renderInlineMath?: LGLuteRenderCallback;
    renderInlineMathOpenMarker?: LGLuteRenderCallback;
    renderInlineMathContent?: LGLuteRenderCallback;
    renderInlineMathCloseMarker?: LGLuteRenderCallback;
    renderEmphasis?: LGLuteRenderCallback;
    renderEmAsteriskOpenMarker?: LGLuteRenderCallback;
    renderEmAsteriskCloseMarker?: LGLuteRenderCallback;
    renderEmUnderscoreOpenMarker?: LGLuteRenderCallback;
    renderEmUnderscoreCloseMarker?: LGLuteRenderCallback;
    renderStrong?: LGLuteRenderCallback;
    renderStrongA6kOpenMarker?: LGLuteRenderCallback;
    renderStrongA6kCloseMarker?: LGLuteRenderCallback;
    renderStrongU8eOpenMarker?: LGLuteRenderCallback;
    renderStrongU8eCloseMarker?: LGLuteRenderCallback;
    renderStrikethrough?: LGLuteRenderCallback;
    renderStrikethrough1OpenMarker?: LGLuteRenderCallback;
    renderStrikethrough1CloseMarker?: LGLuteRenderCallback;
    renderStrikethrough2OpenMarker?: LGLuteRenderCallback;
    renderStrikethrough2CloseMarker?: LGLuteRenderCallback;
    renderHardBreak?: LGLuteRenderCallback;
    renderSoftBreak?: LGLuteRenderCallback;
    renderInlineHTML?: LGLuteRenderCallback;
    renderLink?: LGLuteRenderCallback;
    renderOpenBracket?: LGLuteRenderCallback;
    renderCloseBracket?: LGLuteRenderCallback;
    renderOpenParen?: LGLuteRenderCallback;
    renderCloseParen?: LGLuteRenderCallback;
    renderLinkText?: LGLuteRenderCallback;
    renderLinkSpace?: LGLuteRenderCallback;
    renderLinkDest?: LGLuteRenderCallback;
    renderLinkTitle?: LGLuteRenderCallback;
    renderImage?: LGLuteRenderCallback;
    renderBang?: LGLuteRenderCallback;
    renderEmoji?: LGLuteRenderCallback;
    renderEmojiUnicode?: LGLuteRenderCallback;
    renderEmojiImg?: LGLuteRenderCallback;
    renderEmojiAlias?: LGLuteRenderCallback;
    renderToC?: LGLuteRenderCallback;
    renderFootnotesRef?: LGLuteRenderCallback;
    renderBackslash?: LGLuteRenderCallback;
    renderBackslashContent?: LGLuteRenderCallback;
}

interface LGLuteOptions extends LGMarkdownConfig {
    emojis: LGObject;
    emojiSite: string;
    headingAnchor: boolean;
    inlineMathDigit: boolean;
    lazyLoadImage?: string;
}

declare class Lute {
    public static WalkStop: number;
    public static WalkSkipChildren: number;
    public static WalkContinue: number;
    public static Version: string;
    public static Caret: string;

    public static New(): Lute;

    public static GetHeadingID(node: LGLuteNode): string;

    public static NewNodeID(): string;

    public static Sanitize(html: string): string;

    private constructor();

    public SetJSRenderers(options?: {
        renderers: {
            HTML2VditorDOM?: LGLuteRender,
            HTML2VditorIRDOM?: LGLuteRender,
            HTML2Md?: LGLuteRender,
            Md2HTML?: LGLuteRender,
            Md2VditorDOM?: LGLuteRender,
            Md2VditorIRDOM?: LGLuteRender,
            Md2VditorSVDOM?: LGLuteRender,
        },
    }): void;

    public SetChineseParagraphBeginningSpace(enable: boolean): void;

    public SetHeadingID(enable: boolean): void;

    public SetRenderListStyle(enable: boolean): void;

    public SetLinkBase(url: string): void;

    public SetVditorIR(enable: boolean): void;

    public SetVditorSV(enable: boolean): void;

    public SetVditorWYSIWYG(enable: boolean): void;

    public SetLinkPrefix(url: string): void;

    public SetMark(enable: boolean): void;

    public SetSanitize(enable: boolean): void;

    public SetHeadingAnchor(enable: boolean): void;

    public SetImageLazyLoading(imagePath: string): void;

    public SetInlineMathAllowDigitAfterOpenMarker(enable: boolean): void;

    public SetToC(enable: boolean): void;

    public SetFootnotes(enable: boolean): void;

    public SetAutoSpace(enable: boolean): void;

    public SetFixTermTypo(enable: boolean): void;

    public SetEmojiSite(emojiSite: string): void;

    public SetVditorCodeBlockPreview(enable: boolean): void;

    public SetVditorMathBlockPreview(enable: boolean): void;

    public PutEmojis(emojis: LGObject): void;

    public GetEmojis(): LGObject;

    // debugger md
    public RenderEChartsJSON(text: string): string;

    // md 转换为 html
    public Md2HTML(markdown: string): string;

    // 粘贴时将 html 转换为 md
    public HTML2Md(html: string): string;

    // wysiwyg 转换为 html
    public VditorDOM2HTML(vhtml: string): string;

    // wysiwyg 输入渲染
    public SpinVditorDOM(html: string): string;

    // 粘贴时将 html 转换为 wysiwyg
    public HTML2VditorDOM(html: string): string;

    // 将 wysiwyg 转换为 md
    public VditorDOM2Md(html: string): string;

    // 将 md 转换为 wysiwyg
    public Md2VditorDOM(markdown: string): string;

    // ir 输入渲染
    public SpinVditorIRDOM(markdown: string): string;

    // ir 获取 md
    public VditorIRDOM2Md(html: string): string;

    // md 转换为 ir
    public Md2VditorIRDOM(text: string): string;

    // 获取 HTML
    public VditorIRDOM2HTML(html: string): string;

    // 粘贴时将 html 转换为 sv
    public HTML2VditorIRDOM(html: string): string;

    // sv 输入渲染
    public SpinVditorSVDOM(text: string): string;

    // 粘贴是 md 转换为 sv
    public Md2VditorSVDOM(text: string): string;

    // 将markdown转化为JSON结构输出 https://github.com/88250/lute/issues/120
    public RenderJSON(markdown: string): string;
}

declare const webkitAudioContext: {
    prototype: AudioContext
    new(contextOptions?: AudioContextOptions): AudioContext,
};

interface ITips {
    [index: string]: string;

    alignCenter: string;
    alignLeft: string;
    alignRight: string;
    alternateText: string;
    bold: string;
    both: string;
    check: string;
    close: string;
    code: string;
    "code-theme": string;
    column: string;
    comment: string;
    confirm: string;
    "content-theme": string;
    copied: string;
    copy: string;
    "delete-column": string;
    "delete-row": string;
    devtools: string;
    down: string;
    downloadTip: string;
    edit: string;
    "edit-mode": string;
    emoji: string;
    export: string;
    fileTypeError: string;
    footnoteRef: string;
    fullscreen: string;
    generate: string;
    headings: string;
    help: string;
    imageURL: string;
    indent: string;
    info: string;
    "inline-code": string;
    "insert-after": string;
    "insert-before": string;
    insertColumnLeft: string;
    insertColumnRight: string;
    insertRowAbove: string;
    insertRowBelow: string;
    instantRendering: string;
    italic: string;
    language: string;
    line: string;
    link: string;
    linkRef: string;
    list: string;
    more: string;
    nameEmpty: string;
    "ordered-list": string;
    outdent: string;
    outline: string;
    over: string;
    performanceTip: string;
    preview: string;
    quote: string;
    record: string;
    "record-tip": string;
    recording: string;
    redo: string;
    remove: string;
    row: string;
    spin: string;
    splitView: string;
    strike: string;
    table: string;
    textIsNotEmpty: string;
    title: string;
    tooltipText: string;
    undo: string;
    up: string;
    update: string;
    upload: string;
    uploadError: string;
    uploading: string;
    wysiwyg: string;
}

interface II18n {
    en_US: ITips;
    ja_JP: ITips;
    ko_KR: ITips;
    ru_RU: ITips;
    zh_CN: ITips;
    zh_TW: ITips;
}

interface IClasses {
    preview?: string;
}

interface IPreviewTheme {
    current: string;
    list?: LGObject;
    path?: string;
}

/** @link https://ld246.com/article/1549638745630#options-upload */
interface IUpload {
    /** 上传 url */
    url?: string;
    /** 上传文件最大 Byte */
    max?: number;
    /** 剪切板中包含图片地址时，使用此 url 重新上传 */
    linkToImgUrl?: string;
    /** CORS 上传验证，头为 X-Upload-Token */
    token?: string;
    /** 文件上传类型，同 [input accept](https://www.w3schools.com/tags/att_input_accept.asp) */
    accept?: string;
    /** 跨站点访问控制。默认值: false */
    withCredentials?: boolean;
    /** 请求头设置 */
    headers?: LGObject;
    /** 额外请求参数 */
    extraData?: { [key: string]: string | Blob };
    /** 是否允许多文件上传。默认值：true */
    multiple?: boolean;
    /** 上传字段名。默认值：file[] */
    fieldName?: string;

    /** 每次上传前都会重新设置请求头 */
    setHeaders?(): LGObject;

    /** 上传成功回调 */
    success?(editor: HTMLPreElement, msg: string): void;

    /** 上传失败回调 */
    error?(msg: string): void;

    /** 文件名安全处理。 默认值: name => name.replace(/\W/g, '') */
    filename?(name: string): string;

    /** 校验，成功时返回 true 否则返回错误信息 */
    validate?(files: File[]): string | boolean;

    /** 自定义上传，当发生错误时返回错误信息 */
    handler?(files: File[]): string | null | Promise<string> | Promise<null>;

    /** 对服务端返回的数据进行转换，以满足内置的数据结构 */
    format?(files: File[], responseText: string): string;

    /** 对服务端返回的数据进行转换(对应linkToImgUrl)，以满足内置的数据结构 */
    linkToImgFormat?(responseText: string): string;

    /** 将上传的文件处理后再返回  */
    file?(files: File[]): File[] | Promise<File[]>;

    /** 图片地址上传后的回调  */
    linkToImgCallback?(responseText: string): void;
}

/** @link https://ld246.com/article/1549638745630#options-toolbar */
interface IMenuItem {
    /** 唯一标示 */
    name: string;
    /** svg 图标 HTML */
    icon?: string;
    /** 元素的样式名称 */
    className?: string;
    /** 提示 */
    tip?: string;
    /** 快捷键，支持⌘/ctrl-key 或 ⌘/ctrl-⇧/shift-key 格式的配置，不支持 wysiwyg 模式 */
    hotkey?: string;
    /** 插入编辑器中的后缀 */
    suffix?: string;
    /** 插入编辑器中的前缀 */
    prefix?: string;
    /** 提示位置：ne, nw */
    tipPosition?: string;
    /** 子菜单 */
    toolbar?: Array<string | IMenuItem>;
    /** 菜单层级，最大为 3，内部使用 */
    level?: number;

    /** 自定义按钮点击时触发的事件 */
    click?(event: Event, vditor: LGEditor): void;
}

/** @link https://ld246.com/article/1549638745630#options-preview-hljs */
interface LGHljs {
    /** 是否启用行号。默认值: false */
    lineNumber?: boolean;
    /** 代码风格，可选值参见 [Chroma](https://xyproto.github.io/splash/docs/longer/all.html)。 默认值: 'github' */
    style?: string;
    /** 是否启用代码高亮。默认值: true */
    enable?: boolean;
}

/** @link https://ld246.com/article/1549638745630#options-preview-math */
interface LGMath {
    /** 内联数学公式起始 $ 后是否允许数字。默认值: false */
    inlineDigit?: boolean;
    /** 使用 MathJax 渲染时传入的宏定义。默认值: {} */
    macros?: object;
    /** 数学公式渲染引擎。默认值: 'KaTeX' */
    engine?: "KaTeX" | "MathJax";
}

/** @link https://ld246.com/article/1549638745630#options-preview-markdown */
interface LGMarkdownConfig {
    /** 自动空格。默认值: false */
    autoSpace?: boolean;
    /** 段落开头是否空两格。默认值: false */
    paragraphBeginningSpace?: boolean;
    /** 自动矫正术语。默认值: false */
    fixTermTypo?: boolean;
    /** 插入目录。默认值: false */
    toc?: boolean;
    /** 脚注。默认值: true */
    footnotes?: boolean;
    /** wysiwyg & ir 模式代码块是否渲染。默认值: true */
    codeBlockPreview?: boolean;
    /** wysiwyg & ir 模式数学公式块是否渲染。默认值: true */
    mathBlockPreview?: boolean;
    /** 是否启用过滤 XSS。默认值: true */
    sanitize?: boolean;
    /** 链接相对路径前缀。默认值：'' */
    linkBase?: string;
    /** 链接强制前缀。默认值：'' */
    linkPrefix?: string;
    /** 为列表添加标记，以便[自定义列表样式](https://github.com/Vanessa219/vditor/issues/390) 默认值：false */
    listStyle?: boolean;
    /** 支持 mark 标记 */
    mark?: boolean;
}

/** @link https://ld246.com/article/1549638745630#options-preview */
interface LGPreview {
    /** 预览 debounce 毫秒间隔。默认值: 1000 */
    delay?: number;
    /** 预览区域最大宽度。默认值: 768 */
    maxWidth?: number;
    /** 显示模式。默认值: 'both' */
    mode?: "both" | "editor";
    /** md 解析请求 */
    url?: string;
    /** @link https://ld246.com/article/1549638745630#options-preview-hljs */
    hljs?: LGHljs;
    /** @link https://ld246.com/article/1549638745630#options-preview-math */
    math?: LGMath;
    /** @link https://ld246.com/article/1549638745630#options-preview-markdown */
    markdown?: LGMarkdownConfig;
    /** @link https://ld246.com/article/1549638745630#options-preview-theme */
    theme?: IPreviewTheme;
    /** @link https://ld246.com/article/1549638745630#options-preview-actions  */
    actions?: Array<LGPreviewAction | LGPreviewActionCustom>;

    /** 预览回调 */
    parse?(element: HTMLElement): void;

    /** 渲染之前回调 */
    transform?(html: string): string;
}

type LGPreviewAction = "desktop" | "tablet" | "mobile" | "mp-wechat" | "zhihu";

interface LGPreviewActionCustom {
    /** 键名 */
    key: string;
    /** 按钮文本 */
    text: string;
    /** 按钮 className 值 */
    className?: string;
    /** 按钮提示信息 */
    tooltip?: string;
    /** 点击回调 */
    click: (key: string) => void;
}

interface LGPreviewOptions {
    mode: "dark" | "light";
    customEmoji?: LGObject;
    lang?: (keyof II18n);
    i18n?: ITips;
    lazyLoadImage?: string;
    emojiPath?: string;
    hljs?: LGHljs;
    speech?: {
        enable?: boolean,
    };
    anchor?: number; // 0: no render, 1: render left, 2: render right
    math?: LGMath;
    cdn?: string;
    markdown?: LGMarkdownConfig;
    renderers?: LGLuteRender;
    theme?: IPreviewTheme;
    icon?: "ant" | "material" | undefined;

    transform?(html: string): string;

    after?(): void;
}

interface IHintData {
    html: string;
    value: string;
}

interface IHintExtend {
    key: string;

    hint?(value: string): IHintData[] | Promise<IHintData[]>;
}

/** @link https://ld246.com/article/1549638745630#options-hint */
interface IHint {
    /** 提示内容是否进行 md 解析 */
    parse?: boolean;
    /** 常用表情提示 HTML */
    emojiTail?: string;
    /** 提示 debounce 毫秒间隔。默认值: 200 */
    delay?: number;
    /** 默认表情，可从 [lute/emoji_map](https://github.com/88250/lute/blob/master/parse/emoji_map.go#L32) 中选取，也可自定义 */
    emoji?: LGObject;
    /** 表情图片地址。默认值: 'https://cdn.jsdelivr.net/npm/vditor@${VDITOR_VERSION}/dist/images/emoji' */
    emojiPath?: string;
    extend?: IHintExtend[];
}

interface IResize {
    position?: string;
    enable?: boolean;

    after?(height: number): void;
}

/** @link https://ld246.com/article/1549638745630#options */
interface LGOptions {
    /** RTL */
    rtl?: boolean;
    /** 历史记录间隔 */
    undoDelay?: number;
    /** 内部调试时使用 */
    _lutePath?: string;
    /** 编辑器初始化值。默认值: '' */
    value?: string;
    /** 是否显示日志。默认值: false */
    debugger?: boolean;
    /** 是否启用打字机模式。默认值: false */
    typewriterMode?: boolean;
    /** 编辑器总高度。默认值: 'auto' */
    height?: number | string;
    /** 编辑器最小高度 */
    minHeight?: number;
    /** 编辑器总宽度，支持 %。默认值: 'auto' */
    width?: number | string;
    /** 输入区域为空时的提示。默认值: '' */
    placeholder?: string;
    /** 多语言。默认值: 'zh_CN' */
    lang?: (keyof II18n);
    /** 国际化, 自定义语言。优先级低于lang */
    i18n?: ITips;
    /** @link https://ld246.com/article/1549638745630#options-fullscreen */
    fullscreen?: {
        index: number;
    };
    /** @link https://ld246.com/article/1549638745630#options-toolbar */
    toolbar?: Array<string | IMenuItem>;
    /** @link https://ld246.com/article/1549638745630#options-resize */
    resize?: IResize;
    /** @link https://ld246.com/article/1549638745630#options-counter */
    counter?: {
        enable: boolean;
        max?: number;
        type?: "markdown" | "text";
        after?(length: number, counter: {
            enable: boolean;
            max?: number;
            type?: "markdown" | "text"
        }): void
    };
    /** @link https://ld246.com/article/1549638745630#options-cache */
    cache?: {
        id?: string;
        enable?: boolean;
        after?(markdown: string): void;
    };
    /** 编辑模式。默认值: 'wysiwyg' */
    mode?: "sv" | "ir";
    /** @link https://ld246.com/article/1549638745630#options-preview */
    preview?: LGPreview;
    /** @link https://ld246.com/article/1549638745630#options-hint */
    hint?: IHint;
    /** @link https://ld246.com/article/1549638745630#options-toolbarConfig */
    toolbarConfig?: {
        hide?: boolean,
        pin?: boolean,
    };
    /** 主题。默认值: 'classic' */
    theme?: "classic" | "dark";
    /** 图标。默认值: 'ant' */
    icon?: "ant" | "material";
    /** @link https://ld246.com/article/1549638745630#options-upload */
    upload?: IUpload;
    /** @link https://ld246.com/article/1549638745630#options-classes */
    classes?: IClasses;
    /** 配置自建 CDN 地址。默认值: 'https://cdn.jsdelivr.net/npm/vditor@${VDITOR_VERSION}' */
    cdn?: string;
    /** tab 键操作字符串，支持 \t 及任意字符串 */
    tab?: string;
    /** @link https://ld246.com/article/1549638745630#options-outline */
    outline?: {
        enable: boolean,
        position: "left" | "right",
    };

    /** 编辑器异步渲染完成后的回调方法 */
    after?(): void;

    /** 输入后触发 */
    input?(value: string): void;

    /** 聚焦后触发  */
    focus?(value: string): void;

    /** 失焦后触发 */
    blur?(value: string): void;

    /** `esc` 按下后触发 */
    esc?(value: string): void;

    /** `⌘/ctrl+enter` 按下后触发 */
    ctrlEnter?(value: string): void;

    /** 编辑器中选中文字后触发 */
    select?(value: string): void;
}

interface IEChart {
    setOption(option: any): void;

    resize(): void;
}

interface LGEditor {
    element: HTMLElement;
    options: LGOptions;
    originalInnerHTML: string;
    lute: Lute;
    currentMode: "sv" | "ir";
    outline: {
        element: HTMLElement,
        render(vditor: LGEditor): string,
        toggle(vditor: LGEditor, show?: boolean): void,
    };
    toolbar?: {
        elements?: { [key: string]: HTMLElement },
        element?: HTMLElement,
    };
    preview?: {
        element: HTMLElement
        render(vditor: LGEditor, value?: string): void,
    };
    counter?: {
        element: HTMLElement
        render(vditor: LGEditor, mdText?: string): void,
    };
    resize?: {
        element: HTMLElement,
    };
    hint: {
        timeId: number
        element: HTMLDivElement
        recentLanguage: string
        fillEmoji(element: HTMLElement, vditor: LGEditor): void
        render(vditor: LGEditor): void,
        genHTML(data: IHintData[], key: string, vditor: LGEditor): void
        select(event: KeyboardEvent, vditor: LGEditor): boolean,
    };
    tip: {
        element: HTMLElement
        show(text: string, time?: number): void
        hide(): void,
    };
    upload?: {
        element: HTMLElement
        isUploading: boolean
        range: Range,
    };
    undo?: {
        clearStack(vditor: LGEditor): void,
        redo(vditor: LGEditor): void
        undo(vditor: LGEditor): void
        addToUndoStack(vditor: LGEditor): void
        recordFirstPosition(vditor: LGEditor, event: KeyboardEvent): void,
        resetIcon(vditor: LGEditor): void,
    };
    ir?: {
        range: Range,
        element: HTMLPreElement,
        composingLock: boolean,
        preventInput: boolean,
        processTimeoutId: number,
        hlToolbarTimeoutId: number,
    };
    sv?: {
        range: Range,
        element: HTMLPreElement,
        processTimeoutId: number,
        hlToolbarTimeoutId: number,
        composingLock: boolean,
        preventInput: boolean,
    };
}
