import { readdirSync, statSync } from "fs";
import { join } from "path";

export type TargetFile = {
  filename: string;
  size: number;
};

export const getTargetFileList = (
  dir: string,
  ext: string
): Promise<TargetFile[]> =>
  new Promise((done) => {
    const fileList: TargetFile[] = [];
    walk(dir, ext, (file) => fileList.push(file));

    done(fileList);
  });

// eslint-disable-next-line no-unused-vars
const walk = (dir: string, ext: string, fb: (file: TargetFile) => void) => {
  const filenameList = readdirSync(dir);
  const regexp = new RegExp("\\.*\\.(" + ext + ")$");

  for (const filename of filenameList) {
    const filepath = join(dir, filename);
    const stats = statSync(filepath);

    if (stats.isDirectory()) walk(filepath, ext, fb);

    if (!regexp.test(filename)) continue;
    fb({ filename, size: stats.size });
  }
};
