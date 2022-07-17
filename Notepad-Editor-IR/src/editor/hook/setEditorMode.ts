import {processAfterRender} from "../ir/process";
import {mathRender} from "../markdown/mathRender";
import {processAfterRender as processSVAfterRender, processSpinVditorSVDOM} from "../sv/process";
import {setPadding, setTypewriterPosition} from "../ui/initUI";
import {processCodeRender} from "../util/processCode";
import {renderToc} from "../util/toc";
import { getMarkdown } from "../markdown/getMarkdown";

export const setEditorMode = (vditor: LGEditor, type: string) => {
  const markdownText = getMarkdown(vditor);

  console.log(markdownText);

  if (vditor.options.preview.mode === "both" && type === "sv") {
    vditor.preview.element.style.display = "block";
  } else {
    vditor.preview.element.style.display = "none";
  }

  if (type === "ir") {
    vditor.sv.element.style.display = "none";
    vditor.ir.element.parentElement.style.display = "block";

    vditor.lute.SetVditorIR(true);
    vditor.lute.SetVditorSV(false);

    vditor.currentMode = "ir";
    vditor.ir.element.innerHTML = vditor.lute.Md2VditorIRDOM(markdownText);
    processAfterRender(vditor, {
      enableAddUndoStack: true,
      enableHint: false,
      enableInput: false,
    });

    setPadding(vditor);

    vditor.ir.element.querySelectorAll(".vditor-ir__preview[data-render='2']").forEach((item: HTMLElement) => {
      processCodeRender(item, vditor);
    });
    vditor.ir.element.querySelectorAll(".vditor-toc").forEach((item: HTMLElement) => {
      mathRender(item, {
        math: vditor.options.preview.math,
      });
    });
  } else if (type === "sv") {
    vditor.ir.element.parentElement.style.display = "none";
    if (vditor.options.preview.mode === "both") {
      vditor.sv.element.style.display = "block";
    } else if (vditor.options.preview.mode === "editor") {
      vditor.sv.element.style.display = "block";
    }

    vditor.lute.SetVditorIR(false);
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
  renderToc(vditor);
  setTypewriterPosition(vditor);

  vditor.outline.toggle(vditor, vditor.currentMode !== "sv" && vditor.options.outline.enable);
};
