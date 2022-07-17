/// <reference types="./types" />
import * as adapterRender from "./editor/markdown/adapterRender";
declare class Neditor {
    /** 点击图片放大 */
    static adapterRender: typeof adapterRender;
    /** 点击图片放大 */
    static previewImage: (oldImgElement: HTMLImageElement, lang?: "en_US" | "ja_JP" | "ko_KR" | "ru_RU" | "zh_CN" | "zh_TW", theme?: string) => void;
    /** 为 element 中的代码块添加复制按钮 */
    static codeRender: (element: HTMLElement) => void;
    /** 对 graphviz 进行渲染 */
    static graphvizRender: (element: HTMLElement) => void;
    /** 为 element 中的代码块进行高亮渲染 */
    static highlightRender: (hljsOption?: LGHljs, element?: HTMLElement | Document) => void;
    /** 对数学公式进行渲染 */
    static mathRender: (element: HTMLElement, options?: {
        math?: LGMath;
    }) => void;
    /** 流程图/时序图/甘特图渲染 */
    static mermaidRender: (element: HTMLElement, theme: string) => void;
    /** flowchart.lib 渲染 */
    static flowchartRender: (element: HTMLElement) => void;
    /** 图表渲染 */
    static chartRender: (element: HTMLElement | Document, theme: string) => void;
    /** 五线谱渲染 */
    static abcRender: (element?: HTMLElement | Document) => void;
    /** 脑图渲染 */
    static mindmapRender: (element: HTMLElement | Document, theme: string) => void;
    /** plantuml渲染 */
    static plantumlRender: (element?: HTMLElement | Document) => void;
    /** 大纲渲染 */
    static outlineRender: (contentElement: HTMLElement, targetElement: Element, vditor?: LGEditor) => string;
    /** 为[特定链接](https://github.com/Vanessa219/vditor/issues/7)分别渲染为视频、音频、嵌入的 iframe */
    static mediaRender: (element: HTMLElement) => void;
    /** 对选中的文字进行阅读 */
    static speechRender: (element: HTMLElement, lang?: "en_US" | "ja_JP" | "ko_KR" | "ru_RU" | "zh_CN" | "zh_TW") => void;
    /** 对图片进行懒加载 */
    static lazyLoadImageRender: (element?: HTMLElement | Document) => boolean;
    /** Markdown 文本转换为 HTML，该方法需使用[异步编程](https://ld246.com/article/1546828434083?r=Vaness) */
    static md2html: (mdText: string, options?: LGPreviewOptions) => Promise<string>;
    /** 页面 Markdown 文章渲染 */
    static preview: (previewElement: HTMLDivElement, markdown: string, options?: LGPreviewOptions) => Promise<void>;
    /** 设置代码主题 */
    static setCodeTheme: (codeTheme: string) => void;
    /** 设置内容主题 */
    static setContentTheme: (contentTheme: string, path: string) => void;
}
export default Neditor;
