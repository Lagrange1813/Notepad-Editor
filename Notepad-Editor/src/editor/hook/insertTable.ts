import {Constants} from "../constants";
import {getEditorRange, setRangeByWbr, setSelectionFocus} from "../util/selection";
import {hasClosestBlock} from "../util/hasClosest";

export const insertTable = (vditor: LGEditor) => {
  const range = getEditorRange(vditor);
  let tableHTML = `<table data-block="0"><thead><tr><th>Col1<wbr></th><th>Col2</th><th>Col3</th></tr></thead><tbody><tr><td> </td><td> </td><td> </td></tr><tr><td> </td><td> </td><td> </td></tr></tbody></table>`;

  if (vditor.wysiwyg.element.childNodes.length === 0) {
    vditor.wysiwyg.element.innerHTML = '<p data-block="0"><wbr></p>';
    setRangeByWbr(vditor.wysiwyg.element, range);
  }

  const blockElement = hasClosestBlock(range.startContainer);

  if (range.toString().trim() === "") {
    if (blockElement && blockElement.innerHTML.trim().replace(Constants.ZWSP, "") === "") {
      blockElement.outerHTML = tableHTML;
    } else {
      document.execCommand("insertHTML", false, tableHTML);
    }
    range.selectNode(vditor.wysiwyg.element.querySelector("wbr").previousSibling);
    vditor.wysiwyg.element.querySelector("wbr").remove();
    setSelectionFocus(range);
  } else {
    tableHTML = `<table data-block="0"><thead><tr>`;
    const tableText = range.toString().split("\n");
    const delimiter = tableText[0].split(",").length > tableText[0].split("\t").length ? "," : "\t";

    tableText.forEach((rows, index) => {
      if (index === 0) {
        rows.split(delimiter).forEach((header, subIndex) => {
          if (subIndex === 0) {
            tableHTML += `<th>${header}<wbr></th>`;
          } else {
            tableHTML += `<th>${header}</th>`;
          }
        });
        tableHTML += "</tr></thead>";
      } else {
        if (index === 1) {
          tableHTML += "<tbody><tr>";
        } else {
          tableHTML += "<tr>";
        }
        rows.split(delimiter).forEach((cell) => {
          tableHTML += `<td>${cell}</td>`;
        });
        tableHTML += `</tr>`;
      }
    });
    tableHTML += "</tbody></table>";
    document.execCommand("insertHTML", false, tableHTML);
    setRangeByWbr(vditor.wysiwyg.element, range);
  }
}
