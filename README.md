# License-Plate Problem

## Requirements

- **Node.js v20** (LTS)  (via nvm)
- **Yarn 4** (via Corepack)

If you just cloned the repo:

```bash
# enable corepack (comes with Node.js >=16.10)
corepack enable

# Install Project
yarn
```

Use following commands to run:

```bash
yarn start <index>        # index (0-based) -> plate
yarn start -r <PLATE>     # plate -> index
```

Examples

```bash
yarn start 0          # -> 000000
yarn start 1          # -> 000001
yarn start 999999     # -> 999999
yarn start 1000000    # -> 00000A
yarn start -r 00000A  # -> 1000000
```
## Question Statement
<img width="782" height="873" alt="Screenshot 2025-08-22 at 17 29 34" src="https://github.com/user-attachments/assets/63d9ef24-bae9-41f8-80dd-33e53874dd7e" />

