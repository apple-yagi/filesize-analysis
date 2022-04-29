import { it, expect } from "vitest";
import { join } from "path";
import { getTargetFileList } from "../src/getTargetFileList";

it("should 3", () => {
  const fileList = getTargetFileList(join(__dirname, "data"), "txt");
  expect(fileList.length).toBe(3);
});

it("should 1", () => {
  const fileList = getTargetFileList(join(__dirname, "data"), "bundle.js");
  expect(fileList.length).toBe(1);
});

it("should 4", () => {
  const fileList = getTargetFileList(join(__dirname, "data"), "bundle.js|txt");
  expect(fileList.length).toBe(4);
});

it.skip("should 1", () => {
  const fileList = getTargetFileList(join(__dirname, "data"), "hoge");
  expect(fileList.length).toBe(1);
});
