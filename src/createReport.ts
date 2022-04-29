import fileSize from "filesize";
import { TargetFile } from "./getTargetFileList";

export const createReport = (fileList: TargetFile[]): string => {
  let report = `
  ## Bundle Analysis
  
  | Filename | Size |
  | -------- | ---- |
  `;

  for (const file of fileList) {
    report += `| ${file.filename} | ${fileSize(file.size)} |\n`;
  }

  return report;
};
