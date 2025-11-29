# How Husky Works - Deep Dive

## Table of Contents
1. [What is Husky?](#what-is-husky)
2. [Understanding Git Hooks](#understanding-git-hooks)
3. [How Husky Works Behind the Scenes](#how-husky-works-behind-the-scenes)
4. [Installation Process Explained](#installation-process-explained)
5. [Execution Flow](#execution-flow)
6. [File Structure](#file-structure)
7. [Common Use Cases](#common-use-cases)
8. [Troubleshooting](#troubleshooting)

---

## What is Husky?

Husky is a tool that makes **Git hooks** easy to use in modern JavaScript projects. It simplifies the process of running scripts at specific points in the Git workflow (like before commits or pushes).

### ⚠️ Important: Git Hooks vs GitHub Actions

**Git Hooks (what Husky uses):**
- Run **locally on your computer**
- Triggered by Git commands (commit, push, etc.)
- Execute **before** code reaches GitHub
- Part of Git itself (not GitHub-specific)
- Work offline
- Examples: pre-commit, pre-push

**GitHub Actions (different thing):**
- Run **on GitHub's servers (cloud)**
- Triggered by GitHub events (push, pull request, etc.)
- Execute **after** code reaches GitHub
- Specific to GitHub platform
- Require internet connection
- Defined in `.github/workflows/` folder

**Simple Analogy:**
- **Git Hooks (Husky)** = Security guard at your office door (checks before you leave)
- **GitHub Actions** = Security at the airport (checks after you arrive)

### The Problem Husky Solves

**Without Husky:**
- Git hooks are stored in `.git/hooks/` (not tracked by version control)
- Hooks must be manually copied to each developer's machine
- Hooks are written in shell scripts (not JavaScript-friendly)
- Team members might have different or missing hooks

**With Husky:**
- Hooks are stored in your repository (`.husky/` directory)
- Automatically installed when team members run `npm install`
- Easy to write and maintain
- Consistent across the entire team

---

## Understanding Git Hooks

### What Are Git Hooks?

Git hooks are scripts that **Git itself** executes before or after events such as commit, push, and receive. They're a **built-in feature of Git** (not GitHub, GitLab, or any platform).

**Key Points:**
- ✅ Part of **Git** (the version control system)
- ✅ Run **locally on your machine**
- ✅ Work with any Git repository (GitHub, GitLab, Bitbucket, or even no remote)
- ✅ Execute **automatically** when you run Git commands
- ❌ **NOT** GitHub Actions
- ❌ **NOT** cloud-based
- ❌ **NOT** related to CI/CD platforms

### Git Hooks vs GitHub Actions - Visual Comparison

```
LOCAL MACHINE (Git Hooks with Husky)
┌─────────────────────────────────────┐
│  Developer writes code              │
│           ↓                          │
│  git add .                           │
│           ↓                          │
│  git commit -m "message"            │
│           ↓                          │
│  🔹 PRE-COMMIT HOOK RUNS HERE       │
│     (Husky + ESLint + Prettier)     │
│           ↓                          │
│  ✓ If checks pass → commit created  │
│  ✗ If checks fail → commit blocked  │
│           ↓                          │
│  git push                            │
│           ↓                          │
│  🔹 PRE-PUSH HOOK RUNS HERE         │
│     (Tests, Build checks)           │
│           ↓                          │
│  ✓ If checks pass → push proceeds   │
│  ✗ If checks fail → push blocked    │
└─────────────────────────────────────┘
            ↓
    Code goes to GitHub
            ↓
┌─────────────────────────────────────┐
│  GITHUB SERVERS (GitHub Actions)    │
│                                      │
│  🔹 GITHUB ACTION RUNS HERE         │
│     (CI/CD, Deploy, Tests, etc.)    │
│                                      │
│  - Runs on GitHub's infrastructure  │
│  - Defined in .github/workflows/    │
│  - Visible in GitHub UI             │
│  - Can deploy to production         │
└─────────────────────────────────────┘
```

### Common Git Hooks

| Hook Name | When It Runs | Common Use |
|-----------|--------------|------------|
| `pre-commit` | Before a commit is created | Run linters, formatters |
| `commit-msg` | After commit message is entered | Validate commit message format |
| `pre-push` | Before pushing to remote | Run tests, build checks |
| `post-commit` | After a commit is created | Notifications, logging |
| `post-merge` | After a successful merge | Install dependencies |
| `pre-rebase` | Before rebasing | Prevent rebasing protected branches |

### Git Hooks Location

Git hooks normally live in:
```
.git/hooks/
├── pre-commit.sample
├── commit-msg.sample
├── pre-push.sample
└── ...
```

**Problem:** `.git/` folder is not tracked by version control, so hooks aren't shared with the team.

---

## How Husky Works Behind the Scenes

### Step-by-Step Process

#### 1. **Installation Phase**

When you run `npx husky install`:

```bash
npx husky install
```

Husky does the following:

**a) Creates `.husky/` directory in your project root:**
```
your-project/
├── .husky/          # ← Created by Husky
├── .git/
├── node_modules/
└── package.json
```

**b) Modifies Git configuration:**

Husky runs this Git command internally:
```bash
git config core.hooksPath .husky
```

This tells Git: "Look for hooks in `.husky/` instead of `.git/hooks/`"

You can verify this by checking:
```bash
git config core.hooksPath
# Output: .husky
```

**c) Creates a `_` directory inside `.husky/`:**
```
.husky/
└── _/
    ├── .gitignore
    └── husky.sh
```

This contains Husky's internal helper scripts.

#### 2. **Creating Hooks**

When you run:
```bash
npx husky add .husky/pre-commit "npm test"
```

Husky creates a file `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm test
```

Let's break this down:

**Line 1:** `#!/usr/bin/env sh`
- Shebang - tells the system to run this file with the shell

**Line 2:** `. "$(dirname -- "$0")/_/husky.sh"`
- Sources Husky's helper script
- Sets up the environment properly
- Ensures the hook runs in the right context

**Line 3:** `npm test`
- Your actual command that runs when the hook triggers

#### 3. **Runtime Execution**

When you run `git commit`:

```
1. Git detects a commit is starting
        ↓
2. Git checks core.hooksPath → points to .husky/
        ↓
3. Git looks for .husky/pre-commit file
        ↓
4. Git executes .husky/pre-commit
        ↓
5. Husky's helper script runs (husky.sh)
        ↓
6. Your command executes (e.g., npm test)
        ↓
7. If command succeeds (exit code 0) → commit continues
   If command fails (exit code 1) → commit aborted
```

---

## Installation Process Explained

### Complete Setup Breakdown

#### Step 1: Install Husky Package

```bash
npm install --save-dev husky
```

This adds Husky to your `node_modules/` and `package.json`:

```json
{
  "devDependencies": {
    "husky": "^9.0.0"
  }
}
```

#### Step 2: Initialize Husky

```bash
npx husky install
```

**What happens:**
1. Creates `.husky/` directory
2. Creates `.husky/_/` with helper scripts
3. Runs `git config core.hooksPath .husky`

#### Step 3: Add Prepare Script

```bash
npm pkg set scripts.prepare="husky install"
```

This adds to `package.json`:

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

**Why is this important?**

The `prepare` script runs automatically:
- After `npm install`
- After `npm ci`
- Before `npm publish`

This ensures that when team members clone your repo and run `npm install`, Husky is automatically set up on their machine.

**The Flow:**
```
New developer clones repo
        ↓
Runs: npm install
        ↓
npm automatically runs "prepare" script
        ↓
"prepare" runs: husky install
        ↓
Husky sets up hooks for that developer
        ↓
Developer is ready with all hooks configured!
```

#### Step 4: Create Hooks

```bash
npx husky add .husky/pre-commit "npm run lint"
```

Creates the hook file that will run before commits.

---

## Execution Flow

### Example: Pre-commit Hook

Let's trace what happens when you run `git commit -m "fix: update button"`:

```
┌─────────────────────────────────────────────┐
│  Developer runs: git commit -m "fix: ..."  │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  Git starts commit process                  │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  Git checks: What's my hooksPath?          │
│  Answer: .husky/                            │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  Git looks for: .husky/pre-commit           │
│  Found? ✓ Yes                               │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  Git executes: .husky/pre-commit            │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  Pre-commit script runs:                    │
│  1. Source husky.sh                         │
│  2. Run: npx lint-staged                    │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  lint-staged runs ESLint on changed files  │
└────────────────┬────────────────────────────┘
                 │
         ┌───────┴────────┐
         │                │
         ▼                ▼
    ┌─────────┐      ┌─────────┐
    │ Success │      │ Failure │
    │ (exit 0)│      │ (exit 1)│
    └────┬────┘      └────┬────┘
         │                │
         ▼                ▼
┌──────────────┐   ┌──────────────┐
│ Commit       │   │ Commit       │
│ proceeds ✓   │   │ aborted ✗    │
└──────────────┘   └──────────────┘
```

### Real Example with Output

**Scenario:** You try to commit code with ESLint errors

```bash
$ git commit -m "add new feature"

# Husky triggers pre-commit hook
> Running pre-commit hook...
> npx lint-staged

# lint-staged runs ESLint
✔ Preparing lint-staged...
⚠ Running tasks for staged files...
  ❯ *.{js,jsx,ts,tsx} — 2 files
    ✖ eslint --fix [FAILED]
↓ Skipped because of errors from tasks.
✔ Reverting to original state because of errors...
✔ Cleaning up temporary files...

# ESLint found errors
  /path/to/file.js
    5:10  error  'x' is not defined  no-undef

# Commit is blocked!
✖ 1 problem (1 error, 0 warnings)

husky - pre-commit hook exited with code 1 (error)
```

You must fix the errors before the commit can succeed.

---

## File Structure

### Typical Husky Setup

```
your-project/
├── .husky/
│   ├── _/                    # Husky internals
│   │   ├── .gitignore       # Ignores husky.sh from tracking
│   │   └── husky.sh         # Helper script (auto-generated)
│   ├── pre-commit           # Your pre-commit hook
│   ├── commit-msg           # Your commit-msg hook (optional)
│   └── pre-push             # Your pre-push hook (optional)
├── .git/
│   ├── config               # Contains: core.hooksPath=.husky
│   └── hooks/               # Git's default hooks location (not used)
├── node_modules/
│   └── husky/               # Husky package
├── package.json
└── package-lock.json
```

### Example Hook Files

**`.husky/pre-commit`:**
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

**`.husky/commit-msg`:**
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit ${1}
```

**`.husky/pre-push`:**
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm test
npm run build
```

---

## Common Use Cases

### 1. Lint and Format Before Commit

**Setup:**
```bash
npm install --save-dev husky lint-staged prettier esl