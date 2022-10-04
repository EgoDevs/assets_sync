# assets_sync

Syncing script used for assets_canister

## before run

1. `credentials/whitelist.pem` added secp256k1 pem
2. authorize `whitelist.pem` principal to target canister

## bootstrap

```bash
pnpm script:bootstrap
```

## Usage

```bash
# after bootstrap
node dist/index.js -h # show help

Options
      --version    show version                                         [boolean]
      --from       sync from canister id                                [string]
      --to         sync to canister id                                  [string]
      --saveTo     save saveTo to                                       [string, default to `./sync_folder`]
      --principal  get principal from pem                               [boolean]
      --download   download                                             [boolean]
      --sync       sync                                                 [boolean]
  -h, --help       show help                                            [boolean]

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
node dist/index.js --sync --to=q3fc5-haaaa-aaaaa-aaahq-cai # local

NODE_ENV=production node dist/index.js --sync --to=q3fc5-haaaa-aaaaa-aaahq-cai # production
```
