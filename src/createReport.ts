import fileSize from "filesize";
import { TargetFile } from "./getTargetFileList";

export const createReport = (fileList: TargetFile[]): string => {
  let report = `
  ## Filesize Analysis
  
  | Filename | Size |
  | -------- | ---- |
  `;

  for (const file of fileList) {
    report += `| ${file.filename} | ${fileSize(file.size)} |\n`;
  }

  return report;
};
