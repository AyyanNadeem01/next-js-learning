# ESLint in Next.js - Complete Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Built-in ESLint Support](#built-in-eslint-support)
3. [Setup and Installation](#setup-and-installation)
4. [Next.js ESLint Configuration](#nextjs-eslint-configuration)
5. [Customizing Rules](#customizing-rules)
6. [Popular Configurations](#popular-configurations)
7. [Running ESLint](#running-eslint)
8. [Common Issues and Solutions](#common-issues-and-solutions)
9. [Best Practices](#best-practices)

---

## Introduction

Next.js provides an integrated ESLint experience out of the box starting from version 11.0.0. This makes it easier to catch errors and enforce code quality standards in your Next.js applications without complex configuration.

### What's Included

Next.js comes with:
- **eslint-config-next** - Next.js's official ESLint configuration
- Automatic ESLint setup during project creation
- Integration with the Next.js build process
- Support for TypeScript, React, and Next.js-specific rules

---

## Built-in ESLint Support

### Automatic Detection

When you run `next lint` for the first time, Next.js will automatically:
1. Detect if ESLint is not configured
2. Prompt you to install required packages
3. Create a basic `.eslintrc.json` configuration file
4. Set up the recommended rules

### What Gets Checked

Next.js ESLint checks for:
- React and React Hooks rules
- Next.js-specific best practices
- Accessibility issues
- Common JavaScript/TypeScript errors
- Code style and formatting issues

---

## Setup and Installation

### New Next.js Project

When creating a new Next.js project, ESLint is automatically configured:

```bash
# Using create-next-app
npx create-next-app@latest my-app

# During setup, you'll be asked:
# ✔ Would you like to use ESLint? › Yes
```

This will automatically install and configure ESLint with `eslint-config-next`.

### Existing Next.js Project

#### Step 1: Install Dependencies

```bash
# Using npm
npm install --save-dev eslint eslint-config-next

# Using yarn
yarn add --dev eslint eslint-config-next

# Using pnpm
pnpm add --save-dev eslint eslint-config-next
```

#### Step 2: Create Configuration File

Create `.eslintrc.json` in your project root:

```json
{
  "extends": "next/core-web-vitals"
}
```

#### Step 3: Add Scripts to package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix"
  }
}
```

---

## Next.js ESLint Configuration

### Configuration Levels

Next.js provides different ESLint configurations based on strictness:

#### 1. **next** (Base)
Basic configuration with essential rules:

```json
{
  "extends": "next"
}
```

#### 2. **next/core-web-vitals** (Recommended)
Includes base rules plus Core Web Vitals rules:

```json
{
  "extends": "next/core-web-vitals"
}
```

This is the recommended configuration as it includes:
- All base Next.js rules
- Rules that affect Core Web Vitals scores
- Performance-related warnings

#### 3. **next/typescript** (For TypeScript)
TypeScript-specific rules (automatically applied when TypeScript is detected):

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}
```

### What's Included in eslint-config-next

The Next.js ESLint config includes:
- `eslint-plugin-react` - React-specific rules
- `eslint-plugin-react-hooks` - React Hooks rules
- `eslint-plugin-next` - Next.js-specific rules
- `eslint-plugin-jsx-a11y` - Accessibility rules (in core-web-vitals)

---

## Customizing Rules

### Basic Customization

Create or modify `.eslintrc.json`:

```json
{
  "extends": "next/core-web-vitals",
  "rules": {
    // Customize rules here
    "react/no-unescaped-entities": "off",
    "no-console": "warn",
    "@next/next/no-img-element": "warn"
  }
}
```

### Advanced Configuration with Multiple Extends

```json
{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended"
  ],
  "rules": {
    // Your custom rules
    "prefer-const": "error",
    "no-unused-vars": "warn",
    "no-var": "error"
  },
  "env": {
    "browser": true,
    "node": true,
    "es2021": true
  }
}
```

### TypeScript Configuration

For TypeScript projects:

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
}
```

### Directory-Specific Rules

Create separate `.eslintrc.json` files in subdirectories:

```
project-root/
├── .eslintrc.json (root config)
├── pages/
│   └── .eslintrc.json (pages-specific rules)
└── components/
    └── .eslintrc.json (components-specific rules)
```

Example for `pages/.eslintrc.json`:
```json
{
  "extends": ["../.eslintrc.json"],
  "rules": {
    "@next/next/no-html-link-for-pages": "error"
  }
}
```

---

## Popular Configurations

### 1. Next.js + Prettier

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

`.eslintrc.json`:
```json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

`.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80
}
```

### 2. Next.js + Airbnb

```bash
npm install --save-dev eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
```

`.eslintrc.json`:
```json
{
  "extends": [
    "next/core-web-vitals",
    "airbnb",
    "airbnb/hooks"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "jsx-a11y/anchor-is-valid": "off"
  }
}
```

### 3. Next.js + TypeScript + Strict

```bash
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

`.eslintrc.json`:
```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
}
```

### 4. Complete Production-Ready Configuration

```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "prettier"
  ],
  "plugins": ["prettier"],
  "rules": {
    // Prettier
    "prettier/prettier": "error",
    
    // TypeScript
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_"
    }],
    "@typescript-eslint/no-explicit-any": "warn",
    
    // React
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    
    // Next.js
    "@next/next/no-img-element": "error",
    "@next/next/no-html-link-for-pages": "error",
    
    // General
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error",
    "no-var": "error"
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-module-boundary-types": "off"
      }
    }
  ]
}
```

---

## Running ESLint

### Command Line

```bash
# Lint all files
npm run lint

# Lint and auto-fix issues
npm run lint -- --fix

# Lint specific directory
npm run lint -- --dir pages

# Lint specific files
npm run lint -- --file pages/index.tsx

# Show detailed output
npm run lint -- --debug
```

### During Development

Next.js automatically runs ESLint during:
- **Development** - Shows errors in the terminal and browser
- **Production build** - Fails the build if there are ESLint errors

### Continuous Integration (CI)

Add to your CI configuration (e.g., `.github/workflows/ci.yml`):

```yaml
name: CI

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
```

### Build-Time Linting

By default, ESLint runs during `next build`. To disable:

```javascript
// next.config.js
module.exports = {
  eslint: {
    // Warning: This allows production builds to complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
```

---

## Common Issues and Solutions

### Issue 1: ESLint Errors During Build

**Problem:** Build fails due to ESLint errors

**Solution:**
```bash
# Fix auto-fixable issues
npm run lint -- --fix

# Or temporarily disable during builds (not recommended)
# next.config.js
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}
```

### Issue 2: Conflicting Rules

**Problem:** Rules from different configs conflict

**Solution:** Override in `.eslintrc.json`:
```json
{
  "extends": ["next/core-web-vitals", "airbnb"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/anchor-is-valid": "off"
  }
}
```

### Issue 3: TypeScript Errors Not Caught

**Problem:** TypeScript-specific issues not detected

**Solution:** Ensure TypeScript parser is configured:
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

### Issue 4: Slow Linting

**Problem:** ESLint is slow on large projects

**Solution:** Create `.eslintignore`:
```
node_modules
.next
out
public
build
dist
coverage
*.config.js
```

### Issue 5: Next.js Image Component Warning

**Problem:** Warning about using `<img>` instead of `<Image>`

**Solution:** Use Next.js Image component:
```jsx
// Instead of:
<img src="/logo.png" alt="Logo" />

// Use:
import Image from 'next/image'
<Image src="/logo.png" alt="Logo" width={100} height={100} />
```

Or disable the rule if intentional:
```json
{
  "rules": {
    "@next/next/no-img-element": "off"
  }
}
```

---

## Best Practices

### 1. Start with Recommended Config

Always start with `next/core-web-vitals`:
```json
{
  "extends": "next/core-web-vitals"
}
```

### 2. Use TypeScript

TypeScript + ESLint provides better type checking:
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}
```

### 3. Integrate with Pre-commit Hooks (Husky)

Husky enables Git hooks to run scripts before commits, ensuring code quality before it reaches your repository.

#### Installation

```bash
# Install Husky and lint-staged
npm install --save-dev husky lint-staged

# Initialize Husky
npx husky install

# Add prepare script (runs after npm install)
npm pkg set scripts.prepare="husky install"

# Create pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

#### Configure lint-staged

Add to `package.json`:
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml}": [
      "prettier --write"
    ]
  }
}
```

#### Complete package.json Example

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "prepare": "husky install"
  },
  "devDependencies": {
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.0.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.2.0",
    "prettier": "^3.2.0"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

#### Additional Git Hooks

**Pre-push hook** (run tests before push):
```bash
npx husky add .husky/pre-push "npm test"
```

**Commit-msg hook** (enforce commit message format):
```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
```

#### Benefits of Using Husky

- **Automatic code quality checks** - No manual linting needed
- **Prevents bad commits** - Catches errors before they're committed
- **Team consistency** - Everyone follows the same rules
- **Faster CI/CD** - Fewer failed builds
- **Better code reviews** - Pre-formatted, clean code

### 4. Configure Editor Integration

**VS Code** (`.vscode/settings.json`):
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

### 5. Document Your Rules

Add comments to explain custom rules:
```json
{
  "rules": {
    // Allow console.warn and console.error for debugging
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    
    // Disabled because Next.js handles React import automatically
    "react/react-in-jsx-scope": "off"
  }
}
```

### 6. Regular Updates

Keep ESLint and related packages updated:
```bash
npm update eslint eslint-config-next
```

### 7. Team Consistency

Commit your ESLint configuration to version control:
- `.eslintrc.json`
- `.eslintignore`
- `.vscode/settings.json` (optional)

---

## Next.js-Specific Rules

### Core Rules (included in next)

| Rule | Description |
|------|-------------|
| `@next/next/no-html-link-for-pages` | Prevent usage of `<a>` for internal links |
| `@next/next/no-img-element` | Prevent usage of `<img>` element |
| `@next/next/no-sync-scripts` | Prevent synchronous scripts |
| `@next/next/no-page-custom-font` | Prevent page-only custom fonts |

### Core Web Vitals Rules (in core-web-vitals)

| Rule | Description |
|------|-------------|
| `@next/next/no-css-tags` | Prevent manual stylesheet tags |
| `@next/next/no-document-import-in-page` | Prevent Document imports outside _document |
| `@next/next/no-head-import-in-document` | Prevent Head import in _document |
| `@next/next/google-font-display` | Enforce font-display with Google Fonts |

---

## Example: Complete Next.js Project Setup

### File Structure
```
my-nextjs-app/
├── .eslintrc.json
├── .eslintignore
├── .prettierrc
├── .vscode/
│   └── settings.json
├── next.config.js
├── package.json
└── src/
    ├── pages/
    ├── components/
    └── styles/
```

### .eslintrc.json
```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "prettier"
  ],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "^_"
    }],
    "@next/next/no-img-element": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

### package.json
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write ."
  },
  "devDependencies": {
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.0.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.0",
    "prettier": "^3.2.0",
    "typescript": "^5.3.0"
  }
}
```

---

## Resources

- [Next.js ESLint Documentation](https://nextjs.org/docs/pages/building-your-application/configuring/eslint)
- [eslint-config-next GitHub](https://github.com/vercel/next.js/tree/canary/packages/eslint-config-next)
- [ESLint Official Docs](https://eslint.org/docs/latest/)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)

---

## Conclusion

ESLint in Next.js provides a powerful, integrated development experience that catches errors early and enforces best practices. Start with the recommended `next/core-web-vitals` configuration and customize as needed for your team's requirements. The built-in support makes it easy to maintain code quality without complex setup.