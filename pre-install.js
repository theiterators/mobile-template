import select from "@inquirer/select";
import fs from "fs";

const answer = await select({
  message: "Select your git repository manager",
  choices: [
    {
      name: "GitHub",
      value: "github",
      description: "github is a git repository manager",
    },
    {
      name: "GitLab",
      value: "gitlab",
      description: "gitlab is a git repository manager",
    },
  ],
});

if (answer === "github") {
  fs.unlinkSync(".gitlab-ci.yml");
  fs.unlinkSync("GITLAB_CI.md");
} else if (answer === "gitlab") {
  fs.unlinkSync(".github");
  fs.unlinkSync("GITHUB_CI.md");
}
