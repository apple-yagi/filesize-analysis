import { debug, getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { createReport } from "./createReport";
import { getTargetFileList } from "./getTargetFileList";

const run = async () => {
  try {
    const outDir = getInput("out_dir", { required: true });
    const ext = getInput("ext", { required: true });
    const githubToken = getInput("github_token", { required: true });

    if (!githubToken) throw new Error("No github token provided.");

    const octokit = getOctokit(githubToken);

    debug(`Read bundle files from ${outDir}`);
    const fileList = await getTargetFileList(outDir, ext);
    debug(`Found files: ${fileList}`);

    if (!fileList.length) {
      await octokit.rest.issues.createComment({
        ...context.repo,
        issue_number: context.issue.number,
        body: "Not found bundle files.",
      });
      return;
    }

    await octokit.rest.issues.createComment({
      ...context.repo,
      issue_number: context.issue.number,
      body: createReport(fileList),
    });
  } catch (err) {
    if (err instanceof Error) setFailed(err.message);
  }
};

run();
