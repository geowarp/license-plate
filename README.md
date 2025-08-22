# license-plate

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
