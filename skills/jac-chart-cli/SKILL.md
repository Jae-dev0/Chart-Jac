---
name: jac-chart-cli
description: Work with Jac-Chart tasks, projects, comments and time tracking through the `jac-chart` CLI. Use when the user asks to list, create, update, assign or close Jac-Chart tasks, see what is assigned to them, comment, log time, or script against a Jac-Chart workspace on Jac-Chart Cloud or a self-hosted instance.
---

# Jac-Chart CLI

`jac-chart` is the official command line for [Jac-Chart](https://jac-chart.app). Run from an agent, stdout is not a terminal, so every command answers in JSON and never prompts.

## Check the setup first

Run `jac-chart context`. It prints the server, user, workspace and project in use, and where each value came from.

- `jac-chart: command not found`: ask the user to install it in their own terminal, where they can read the script first: `curl -fsSL https://jac-chart.app/cli/install.sh | sh` (Windows: `irm https://jac-chart.app/cli/install.ps1 | iex`), `brew install Jae-dev0/tap/jac-chart` with Homebrew, or `npm install -g @jac-chart/cli` with Node.js 20 or newer. The script's binary lands in `~/.local/bin/jac-chart` (Windows: `%LOCALAPPDATA%\Programs\jac-chart\jac-chart.exe`). Your shell may not have that folder on its `PATH` yet, so call it by that full path until it does.
- No user: `jac-chart login` is a browser approval only a person can finish. Ask the user to run it in their own terminal. Headless and CI runs use an API key in `JAC_CHART_API_KEY` instead (created in Jac-Chart under Settings, Account, API Keys).
- No workspace: list them with `jac-chart workspace list --jq '.[] | "\(.id) \(.name)"'` and pass `-w <id>`, or ask the user to pick a default with `jac-chart workspace use`.
- Server or compatibility errors: `jac-chart doctor` explains what is wrong.

You are ready when `jac-chart context` shows a user and the workspace you mean to act in.

## Output contract

- Success prints exactly one JSON value on stdout and exits 0.
- Failure prints `{"error": "message"}` on stdout and exits 1. The message names what went wrong, such as a missing project, so fix that and retry. A message saying something needs confirmation means rerunning with `--yes` once the user has agreed.
- `--jq '<expr>'` filters the JSON with a built-in jq. Strings print raw, one result per line. Reach for it to keep large results small.
- Writes print JSON describing the change: `task create` returns the new task (`--jq .ticketId` gives its ticket id), and `task status` returns the `from` and `to` columns. Run `jac-chart task view` to see the full task afterwards.
- `task list` stops at 50 tasks. Pass `--all` when you need every match, for example to count.
- `task mine` returns at most 100 tasks per workspace, soonest due first, and cannot page further. For a complete list, run `jac-chart task list -p <KEY> --mine --all` for each project.

## Addressing things

- Tasks by ticket id such as `KAN-12`, projects by key such as `KAN`, workspaces by id. When the user names a project, find its key with `jac-chart project list`.
- Statuses are the slugs of a project's columns, such as `to-do`, `in-progress` or `done`. Projects can have custom columns, so list them with `jac-chart column list -p KAN` before moving a task somewhere unfamiliar.
- The workspace comes from `-w`, then `JAC_CHART_WORKSPACE`, then a `.jac-chart.json` in the current folder or any parent, then the default from `jac-chart workspace use`. The project comes from `-p`, then `JAC_CHART_PROJECT`, then `.jac-chart.json`. A `.jac-chart.json` further up the tree can select a different workspace than expected; `jac-chart context` shows which source won.
- Dates take `YYYY-MM-DD`, `today`, `tomorrow` or `+3d`.
- Descriptions and comments are Markdown. Pass long text with `-F <file>`, or `-F -` to read stdin.

## Common commands

```sh
jac-chart project list --jq '.[] | "\(.key)  \(.name)"'
jac-chart column list -p KAN --jq '.[] | "\(.slug)  \(.name)"'
jac-chart task mine --jq '.[] | "\(.ticketId)  \(.statusName)  \(.title)"'
jac-chart task list -p KAN --open --jq '.[] | select(.priority == "urgent") | .ticketId'
jac-chart task view KAN-12
jac-chart task create "Fix flaky login test" -p KAN --priority high --due tomorrow --label Bug --assignee me
jac-chart task status KAN-12 in-progress
jac-chart task edit KAN-12 --priority urgent --add-label Bug
jac-chart task assign KAN-12 me
jac-chart comment add KAN-12 "Fixed in #123"
jac-chart time log KAN-12 1h30m -m "Pairing on the fix"
jac-chart search "login redirect" --type tasks
jac-chart task delete KAN-12 --yes
jac-chart api GET /workspace --jq '.[].name'
```

Every command documents its arguments and flags in `jac-chart <command> --help`. The full reference is at https://jac-chart.app/docs/core/integrations/cli-commands.

## Changes other people see

A workspace is shared and updates reach teammates live. Confirm with the user before deleting anything, applying `jac-chart task bulk`, or moving tasks between projects, then pass `--yes` where the command asks for confirmation. Keep credentials private: leave `JAC_CHART_API_KEY`, `--token` values and the config file (`~/.config/jac-chart/config.json`) out of output and messages.
