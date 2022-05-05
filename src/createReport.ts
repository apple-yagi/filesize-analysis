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

  const totalDiffIcon = getDiffIcon(totalSizeDiff, currentTotalSize);

  let report = `
  ## 📦 Filesize Analysis

  Total Size: ${fileSize(currentTotalSize)}

  Total Size Change: ${fileSize(totalSizeDiff)} ${totalDiffIcon}
  
  <details><summary>Display detail</summary>

  | Filename | Size | Change | Size(Brotli compressed) | Change(Brotli compressed) | Status |
  | -------- | ---- | ------ | ----------------------- | ------------------------- | ------ |
  `;

  for (const currentFile of currentFileList) {
    const baseFile = baseFileList.filter(
      (baseFile) => baseFile.filename === currentFile.filename
    )[0];
    const diffIcon = getDiffIcon(
      baseFile.size - currentFile.size,
      currentFile.size
    );

    report += `| \`${currentFile.filename}\` | \`${fileSize(
      currentFile.size
    )}\` | \`${fileSize(currentFile.size - baseFile.size)}\` | \`${fileSize(
      currentFile.brotliSize
    )}\` | \`${fileSize(
      currentFile.brotliSize - baseFile.brotliSize
    )}\` | ${diffIcon} \n`;
  }

  report += "</details>";

  return report;
};

const getDiffIcon = (delta: number, filesize: number): string => {
  if (filesize === 0) return "🆕";

  const percentage = Math.round((delta / filesize) * 100);
  if (percentage >= 50) return "🆘";
  if (percentage >= 20) return "🚨";
  if (percentage >= 10) return "⚠️";
  if (percentage >= 5) return "🔍";
  if (percentage <= -50) return "🏆";
  if (percentage <= -20) return "🎉";
  if (percentage <= -10) return "👏";
  if (percentage <= -5) return "✅";
  return "";
};
