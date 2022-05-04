import fileSize from "filesize";
import { TargetFile } from "./getTargetFileList";

export const createReport = (
  currentFileList: TargetFile[],
  baseFileList: TargetFile[]
): string => {
  const currentTotalSize = currentFileList.reduce(
    (size, file) => size + file.size,
    0
  );
  const baseTotalSize = baseFileList.reduce(
    (size, file) => size + file.size,
    0
  );
  const totalSizeDiff = currentTotalSize - baseTotalSize;

  const icon = (baseTotalSize / currentTotalSize) * 100 > 10 ? "⚠️" : "✅";

  let report = `
  ## 📦 Filesize Analysis

  Size Change: ${
    totalSizeDiff === 0 ? "" : totalSizeDiff > 0 ? "+" : "-"
  } ${fileSize(totalSizeDiff)} ${icon}

  Total Size: ${fileSize(currentTotalSize)}
  
  <details><summary>Display detail</summary>

  | Filename | Size | Change | Size(Brotli compressed) | Change(Brotli compressed) |
  | -------- | ---- | ------ | ----------------------- | ------------------------- |
  `;

  for (const currentFile of currentFileList) {
    const baseFile = baseFileList.filter(
      (baseFile) => baseFile.filename === currentFile.filename
    )[0];

    report += `| \`${currentFile.filename}\` | \`${fileSize(
      currentFile.size
    )}\` | \`${fileSize(currentFile.size - baseFile.size)}\` | \`${fileSize(
      currentFile.brotliSize
    )}\` | \`${fileSize(currentFile.brotliSize - baseFile.brotliSize)}\` \n`;
  }

  report += "</details>";

  return report;
};
