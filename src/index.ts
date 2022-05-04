import { getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import { GitHub } from "@actions/github/lib/utils";
import { exec } from "@actions/exec";
import { createReport } from "./createReport";
import { getTargetFileList } from "./getTargetFileList";

const run = async (octokit: InstanceType<typeof GitHub>) => {
  const outDir = getInput("out_dir");
  const ext = getInput("ext");
  const buildCmd = getInput("build_cmd");

  const prNumber = context.issue.number;
  const pr = context.payload.pull_request;
  const baseRef = pr?.base.ref;
  console.log(`PR #${prNumber} is targeted at ${baseRef}`);

  // Build application [current]
  await exec(buildCmd);

  // Get file list [current]
  const currentFileList = await getTargetFileList(outDir, ext);

  // In case the build step alters a JSON-file, ....
  await exec(`git reset --hard`);

  // Checkout base branch
  await exec(`git fetch -n origin ${baseRef}`);
  await exec(`git checkout ${baseRef}`);

  // Build application [base]
  await exec(buildCmd);

  // Get file list [base]
  const baseFileList = await getTargetFileList(outDir, ext);

  await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: context.issue.number,
    body: createReport(currentFileList, baseFileList),
  });
};

(async () => {
  try {
    const githubToken = getInput("github_token", { required: true });
    const octokit = getOctokit(githubToken);
    run(octokit);
  } catch (err) {
    if (err instanceof Error) setFailed(err.message);
  }
})();
