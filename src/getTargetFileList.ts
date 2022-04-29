import { readdirSync, statSync } from "fs";
import { join } from "path";

export type TargetFile = {
  filename: string;
  size: number;
};

export const getTargetFileList = (dir: string, ext: string): TargetFile[] => {
  const filenameList = readdirSync(dir);
  const regexp = new RegExp("\\.*\\.(" + ext + ")$");

  const fileList: TargetFile[] = [];
  for (const filename of filenameList) {
    if (!regexp.test(filename)) continue;

    const filepath = join(dir, filename);
    const stats = statSync(filepath);

    if (!stats.isFile()) continue;

    fileList.push({
      filename,
      size: stats.size,
    });
  }

  return fileList;
};
