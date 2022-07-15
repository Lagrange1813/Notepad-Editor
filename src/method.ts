import {abcRender} from "./editor/markdown/abcRender";
import * as adapterRender from "./editor/markdown/adapterRender";
import {chartRender} from "./editor/markdown/chartRender";
import {codeRender} from "./editor/markdown/codeRender";
import {flowchartRender} from "./editor/markdown/flowchartRender";
import {graphvizRender} from "./editor/markdown/graphvizRender";
import {highlightRender} from "./editor/markdown/highlightRender";
import {lazyLoadImageRender} from "./editor/markdown/lazyLoadImageRender";
import {mathRender} from "./editor/markdown/mathRender";
import {mediaRender} from "./editor/markdown/mediaRender";
import {mermaidRender} from "./editor/markdown/mermaidRender";
import {mindmapRender} from "./editor/markdown/mindmapRender";
import {outlineRender} from "./editor/markdown/outlineRender";
import {plantumlRender} from "./editor/markdown/plantumlRender";
import {md2html, previewRender} from "./editor/markdown/previewRender";
import {speechRender} from "./editor/markdown/speechRender";
import {previewImage} from "./editor/preview/image";
import {setCodeTheme} from "./editor/ui/setCodeTheme";
import {setContentTheme} from "./editor/ui/setContentTheme";

class Neditor {

    /** 点击图片放大 */
    public static adapterRender = adapterRender;
    /** 点击图片放大 */
    public static previewImage = previewImage;
    /** 为 element 中的代码块添加复制按钮 */
    public static codeRender = codeRender;
    /** 对 graphviz 进行渲染 */
    public static graphvizRender = graphvizRender;
    /** 为 element 中的代码块进行高亮渲染 */
    public static highlightRender = highlightRender;
    /** 对数学公式进行渲染 */
    public static mathRender = mathRender;
    /** 流程图/时序图/甘特图渲染 */
    public static mermaidRender = mermaidRender;
    /** flowchart.lib 渲染 */
    public static flowchartRender = flowchartRender;
    /** 图表渲染 */
    public static chartRender = chartRender;
    /** 五线谱渲染 */
    public static abcRender = abcRender;
    /** 脑图渲染 */
    public static mindmapRender = mindmapRender;
    /** plantuml渲染 */
    public static plantumlRender = plantumlRender;
    /** 大纲渲染 */
    public static outlineRender = outlineRender;
    /** 为[特定链接](https://github.com/Vanessa219/vditor/issues/7)分别渲染为视频、音频、嵌入的 iframe */
    public static mediaRender = mediaRender;
    /** 对选中的文字进行阅读 */
    public static speechRender = speechRender;
    /** 对图片进行懒加载 */
    public static lazyLoadImageRender = lazyLoadImageRender;
    /** Markdown 文本转换为 HTML，该方法需使用[异步编程](https://ld246.com/article/1546828434083?r=Vaness) */
    public static md2html = md2html;
    /** 页面 Markdown 文章渲染 */
    public static preview = previewRender;
    /** 设置代码主题 */
    public static setCodeTheme = setCodeTheme;
    /** 设置内容主题 */
    public static setContentTheme = setContentTheme;
}

export default Neditor;
