# Complete Guide to Prettier in Next.js

## Table of Contents
1. Introduction to Prettier
2. Installation and Setup
3. Configuration Files
4. Integration with Next.js
5. ESLint Integration
6. Editor Integration
7. Git Hooks with Husky
8. Scripts and Commands
9. Common Configuration Options
10. Ignoring Files
11. Formatting Specific File Types
12. Team Collaboration
13. Troubleshooting
14. Best Practices

---

## 1. Introduction to Prettier

Prettier is an opinionated code formatter that supports multiple languages including JavaScript, TypeScript, CSS, JSON, and more. It enforces a consistent code style across your entire Next.js project by parsing your code and reprinting it with its own rules.

### Benefits
- Saves time by eliminating style debates
- Ensures consistent code formatting across the team
- Reduces code review friction
- Integrates seamlessly with modern development tools
- Supports multiple file formats

---

## 2. Installation and Setup

### Basic Installation

```bash
# Using npm
npm install --save-dev prettier

# Using yarn
yarn add --dev prettier

# Using pnpm
pnpm add -D prettier
```

### Installation with ESLint Integration

```bash
# Install Prettier and ESLint integration packages
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

### Verify Installation

```bash
npx prettier --version
```

---

## 3. Configuration Files

Prettier can be configured using several file formats. Choose one that fits your project.

### .prettierrc (JSON)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### .prettierrc.js (JavaScript)

```javascript
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
  endOfLine: 'lf',
};
```

### .prettierrc.json (JSON with comments support)

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

### package.json Configuration

```json
{
  "prettier": {
    "semi": true,
    "singleQuote": true,
    "printWidth": 80
  }
}
```

### prettier.config.js (Alternative)

```javascript
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  plugins: ['prettier-plugin-tailwindcss'],
};
```

---

## 4. Integration with Next.js

### Project Structure

```
my-nextjs-app/
├── .prettierrc
├── .prettierignore
├── .eslintrc.json
├── next.config.js
├── package.json
├── pages/
├── components/
├── styles/
└── public/
```

### Next.js Specific Configuration

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "jsxSingleQuote": false,
  "jsxBracketSameLine": false
}
```

### Formatting Next.js Files

Prettier automatically formats:
- `.js`, `.jsx`, `.ts`, `.tsx` files
- CSS/SCSS files in the `styles/` directory
- JSON configuration files
- Markdown files

---

## 5. ESLint Integration

### Install Required Packages

```bash
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

### .eslintrc.json Configuration

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

### Alternative: Without Plugin

```json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ]
}
```

### Resolving Conflicts

The `eslint-config-prettier` package disables all ESLint rules that might conflict with Prettier. Always place `"prettier"` last in the extends array.

---

## 6. Editor Integration

### VS Code

#### Install Extension
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Prettier - Code formatter"
4. Install the official Prettier extension

#### settings.json Configuration

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### WebStorm/IntelliJ IDEA

1. Go to Settings/Preferences
2. Navigate to Languages & Frameworks > JavaScript > Prettier
3. Set Prettier package path
4. Check "On save" and "On code reformat"

### Sublime Text

Install the JsPrettier package via Package Control.

---

## 7. Git Hooks with Husky

### Installation

```bash
# Install husky and lint-staged
npm install --save-dev husky lint-staged

# Initialize husky
npx husky install

# Add prepare script
npm pkg set scripts.prepare="husky install"
```

### Create Pre-commit Hook

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

### Configure lint-staged

Add to `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,scss,md}": [
      "prettier --write"
    ]
  }
}
```

### Alternative: Simple Husky Configuration

`.husky/pre-commit`:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run format
npm run lint
```

---

## 8. Scripts and Commands

### package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "format:staged": "prettier --write"
  }
}
```

### Command Line Usage

```bash
# Format all files
npx prettier --write .

# Check if files are formatted
npx prettier --check .

# Format specific files
npx prettier --write "pages/**/*.tsx"

# Format with custom config
npx prettier --write . --config ./.prettierrc.json

# Format and ignore files
npx prettier --write . --ignore-path ./.prettierignore
```

---

## 9. Common Configuration Options

### Complete Configuration Reference

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "rangeStart": 0,
  "rangeEnd": Infinity,
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "vueIndentScriptAndStyle": false,
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto",
  "singleAttributePerLine": false
}
```

### Option Descriptions

**printWidth**: Maximum line length before wrapping (default: 80)

**tabWidth**: Number of spaces per indentation level (default: 2)

**useTabs**: Use tabs instead of spaces (default: false)

**semi**: Add semicolons at end of statements (default: true)

**singleQuote**: Use single quotes instead of double (default: false)

**quoteProps**: When to add quotes around object properties
- `"as-needed"`: Only when required
- `"consistent"`: If one property needs quotes, quote all
- `"preserve"`: Respect input

**jsxSingleQuote**: Use single quotes in JSX (default: false)

**trailingComma**: Add trailing commas where valid
- `"es5"`: ES5-valid locations (objects, arrays)
- `"all"`: Wherever possible (functions, etc.)
- `"none"`: No trailing commas

**bracketSpacing**: Spaces between brackets in object literals (default: true)

**arrowParens**: Include parentheses around sole arrow function parameter
- `"always"`: Always include parens
- `"avoid"`: Omit when possible

**endOfLine**: Line ending style
- `"lf"`: Unix-style (\n)
- `"crlf"`: Windows-style (\r\n)
- `"cr"`: Old Mac-style (\r)
- `"auto"`: Maintain existing

---

## 10. Ignoring Files

### .prettierignore File

```
# dependencies
node_modules/
.pnp
.pnp.js

# testing
coverage/

# next.js
.next/
out/
build/
dist/

# production
build/

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

# typescript
*.tsbuildinfo

# generated files
public/sw.js
public/workbox-*.js

# lock files
package-lock.json
yarn.lock
pnpm-lock.yaml

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
Thumbs.db
```

### Inline Ignore Comments

```javascript
// prettier-ignore
const matrix = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
];

// prettier-ignore-start
const uglyCode = {
  a:    1,
  b:   2,
  c:  3
};
// prettier-ignore-end
```

### JSX Ignore

```jsx
{/* prettier-ignore */}
<div     className="messy"      style={{color:   "red"}}>
  Content
</div>
```

---

## 11. Formatting Specific File Types

### TypeScript/JavaScript

Prettier automatically formats `.ts`, `.tsx`, `.js`, `.jsx` files with appropriate syntax parsing.

### CSS/SCSS

```json
{
  "overrides": [
    {
      "files": "*.css",
      "options": {
        "printWidth": 120
      }
    },
    {
      "files": "*.scss",
      "options": {
        "singleQuote": false
      }
    }
  ]
}
```

### JSON

```json
{
  "overrides": [
    {
      "files": "*.json",
      "options": {
        "printWidth": 100,
        "tabWidth": 2
      }
    }
  ]
}
```

### Markdown

```json
{
  "overrides": [
    {
      "files": "*.md",
      "options": {
        "proseWrap": "always",
        "printWidth": 80
      }
    }
  ]
}
```

### YAML

```bash
npm install --save-dev prettier-plugin-yaml
```

```json
{
  "plugins": ["prettier-plugin-yaml"]
}
```

---

## 12. Team Collaboration

### Sharing Configuration

Commit the following files to version control:
- `.prettierrc` or `.prettierrc.json`
- `.prettierignore`
- `package.json` (with Prettier dependencies)

### EditorConfig Integration

Create `.editorconfig`:

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

### CI/CD Integration

#### GitHub Actions

`.github/workflows/prettier.yml`:

```yaml
name: Prettier Check

on:
  pull_request:
  push:
    branches: [main, develop]

jobs:
  prettier:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run format:check
```

#### GitLab CI

`.gitlab-ci.yml`:

```yaml
prettier:
  stage: test
  script:
    - npm ci
    - npm run format:check
```

---

## 13. Troubleshooting

### Common Issues and Solutions

**Issue: Prettier not formatting on save**
- Check VS Code settings for `editor.formatOnSave`
- Verify Prettier is set as default formatter
- Restart VS Code

**Issue: Conflicts with ESLint**
- Ensure `eslint-config-prettier` is installed
- Place `"prettier"` last in ESLint extends array
- Run `npx eslint-config-prettier` to check for conflicts

**Issue: Prettier ignoring files**
- Check `.prettierignore` file
- Verify file extensions are supported
- Check for inline ignore comments

**Issue: Different formatting on different machines**
- Ensure same Prettier version across team
- Commit configuration files to git
- Use exact versions in `package.json`

**Issue: Slow formatting**
- Exclude large directories in `.prettierignore`
- Use `--ignore-path` flag
- Consider formatting only staged files

### Debug Commands

```bash
# Check Prettier version
npx prettier --version

# Check what files will be formatted
npx prettier --list-different .

# Debug configuration
npx prettier --find-config-path ./src/index.tsx

# Show effective config for a file
npx prettier --config-precedence=file-override --show-config ./src/index.tsx
```

---

## 14. Best Practices

### Do's

1. **Commit configuration files** - Ensure `.prettierrc` and `.prettierignore` are in version control
2. **Use pre-commit hooks** - Automate formatting with Husky and lint-staged
3. **Enable format on save** - Configure your editor for automatic formatting
4. **Keep it simple** - Start with minimal configuration and add as needed
5. **Document exceptions** - Comment why certain files are ignored
6. **Use exact versions** - Pin Prettier version to avoid inconsistencies
7. **Format incrementally** - Use `lint-staged` to format only changed files
8. **Integrate with CI/CD** - Fail builds on formatting issues

### Don'ts

1. **Don't fight Prettier** - Accept its opinionated nature
2. **Don't over-configure** - Stick to defaults when possible
3. **Don't format node_modules** - Always ignore dependency directories
4. **Don't commit formatting changes separately** - Combine with logical changes
5. **Don't use multiple formatters** - Choose Prettier or another, not both
6. **Don't ignore errors silently** - Address formatting issues promptly

### Recommended Next.js Configuration

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "jsxSingleQuote": false
}
```

### Folder Organization

```
project-root/
├── .husky/
│   └── pre-commit
├── .prettierrc
├── .prettierignore
├── .eslintrc.json
├── .editorconfig
└── package.json
```

---

## Useful Resources

- [Prettier Official Documentation](https://prettier.io/docs/en/)
- [Next.js Documentation](https://nextjs.org/docs)
- [ESLint Integration Guide](https://prettier.io/docs/en/integrating-with-linters.html)
- [Editor Integration](https://prettier.io/docs/en/editors.html)
- [Playground](https://prettier.io/playground/)

---

## Conclusion

Prettier is an essential tool for maintaining code quality and consistency in Next.js projects. By automating code formatting, it eliminates style debates and allows developers to focus on building features. Combined with ESLint, Husky, and proper editor integration, Prettier creates a seamless development experience that scales from solo projects to large teams.