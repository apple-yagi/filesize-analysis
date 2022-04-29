# Filesize Analysis Github Action

Analyzes each PR's impact on your app's filesize and displays it using a comment.
![demo](https://user-images.githubusercontent.com/57742720/165971202-4a37f2fc-0ce7-43ac-af9a-54c33ae02054.png)

## Example usage

```yaml
on:
  pull_request:

permissions:
  pull-requests: write # Required permission for commenting in PR

jobs:
  analysis:
    name: Analysis filesize
    runs-on: ubuntu-latest

    steps:
      - name: Analysis
        uses: apple-yagi/filesize-analysis@v1
        with:
          out_dir: "./dist" # Output directory for build
          ext: "js" # If specifying multiple extension, "js|css"
          github_token: ${{secrets.GITHUB_TOKEN}}
```

## LICENSE

[MIT](/LICENSE)
