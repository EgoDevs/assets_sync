# assets_sync

Syncing script used for assets_canister

## before run

1. `credentials/whitelist.pem` added secp256k1 pem
2. authorize `whitelist.pem` principal to target canister

## bootstrap

```bash
pnpm script:bootstrap
```

## principal

```bash
node dist/index.js --principal # local
```

## download

```bash
node dist/index.js --download --from=q3fc5-haaaa-aaaaa-aaahq-cai # local

NODE_ENV=production node dist/index.js --download --from=q3fc5-haaaa-aaaaa-aaahq-cai # production
```

## sync

```bash
node dist/index.js --sync --to=q3fc5-haaaa-aaaaa-aaahq-cai
```

## live

added `NODE_ENV=production` before script
like:

```bash
NODE_ENV=production node dist/index.js --download --from=q3fc5-haaaa-aaaaa-aaahq-cai
```
