import { it, expect } from "vitest";
import { join } from "path";
import { getTargetFileList } from "../src/getTargetFileList";

it("should 3", async () => {
  const fileList = await getTargetFileList(join(__dirname, "data"), "txt");
  expect(fileList.length).toBe(3);
});

it("should 1", async () => {
  const fileList = await getTargetFileList(
    join(__dirname, "data"),
    "bundle.js"
  );
  expect(fileList.length).toBe(1);
});

it("should 4", async () => {
  const fileList = await getTargetFileList(
    join(__dirname, "data"),
    "bundle.js|txt"
  );
  expect(fileList.length).toBe(4);
});

it("should 2", async () => {
  const fileList = await getTargetFileList(join(__dirname, "data"), "hoge");
  expect(fileList.length).toBe(2);
});
