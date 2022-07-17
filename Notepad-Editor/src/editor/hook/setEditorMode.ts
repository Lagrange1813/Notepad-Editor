import {getMarkdown} from "../markdown/getMarkdown";
import {mathRender} from "../markdown/mathRender";
import {processAfterRender as processSVAfterRender, processSpinVditorSVDOM} from "../sv/process";
import {setPadding, setTypewriterPosition} from "../ui/initUI";
import {highlightToolbar} from "../util/highlightToolbar";
import {processCodeRender} from "../util/processCode";
import {renderToc} from "../util/toc";
import {renderDomByMd} from "../wysiwyg/renderDomByMd";

export const setEditorMode = (vditor: LGEditor, type: string) => {
  const markdownText = getMarkdown(vditor);
  if (vditor.options.preview.mode === "both" && type === "sv") {
    vditor.preview.element.style.display = "block";
  } else {
    vditor.preview.element.style.display = "none";
  }

  if (type === "wysiwyg") {
    vditor.sv.element.style.display = "none";
    vditor.wysiwyg.element.parentElement.style.display = "block";

    vditor.lute.SetVditorWYSIWYG(true);
    vditor.lute.SetVditorSV(false);

    vditor.currentMode = "wysiwyg";

    setPadding(vditor);
    renderDomByMd(vditor, markdownText, {
      enableAddUndoStack: true,
      enableHint: false,
      enableInput: false,
    });
    vditor.wysiwyg.element.querySelectorAll(".vditor-toc").forEach((item: HTMLElement) => {
      mathRender(item, {
        cdn: vditor.options.cdn,
        math: vditor.options.preview.math,
      });
    });
    vditor.wysiwyg.popover.style.display = "none";
  } else if (type === "sv") {
    vditor.wysiwyg.element.parentElement.style.display = "none";
    if (vditor.options.preview.mode === "both") {
      vditor.sv.element.style.display = "block";
    } else if (vditor.options.preview.mode === "editor") {
      vditor.sv.element.style.display = "block";
    }

    vditor.lute.SetVditorWYSIWYG(false);
    vditor.lute.SetVditorSV(true);

    vditor.currentMode = "sv";
    let svHTML = processSpinVditorSVDOM(markdownText, vditor);
    if (svHTML === "<div data-block='0'></div>") {
      // https://github.com/Vanessa219/vditor/issues/654 SV 模式 Placeholder 显示问题
      svHTML = "";
    }
    vditor.sv.element.innerHTML = svHTML;
    processSVAfterRender(vditor, {
      enableAddUndoStack: true,
      enableHint: false,
      enableInput: false,
    });
    setPadding(vditor);
  }
  vditor.undo.resetIcon(vditor);
  if (typeof event !== "string") {
    // 初始化不 focus
    vditor[vditor.currentMode].element.focus();
    highlightToolbar(vditor);
  }
  renderToc(vditor);
  setTypewriterPosition(vditor);

  if (vditor.toolbar.elements["edit-mode"]) {
    vditor.toolbar.elements["edit-mode"].querySelectorAll("button").forEach((item) => {
      item.classList.remove("vditor-menu--current");
    });
    vditor.toolbar.elements["edit-mode"].querySelector(`button[data-mode="${vditor.currentMode}"]`).classList.add("vditor-menu--current");
  }

  vditor.outline.toggle(vditor, vditor.currentMode !== "sv" && vditor.options.outline.enable);
};
