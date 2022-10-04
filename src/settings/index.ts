import file from 'fs';
import shell from 'shelljs';
import yargs from 'yargs';

import fs from 'fs';
import path from 'path';

import { idlFactory as assetsIDL } from '../idls/assets_v1.idl';
import { _SERVICE as assetsService } from '../idls/assets_v1';
import { getActor } from './agent';
import { identity } from './identity';
import { fetch } from 'cross-fetch';
import { ActorSubclass } from '@dfinity/agent';

if (!globalThis.fetch) {
  (globalThis as any).fetch = fetch;
  // globalThis.Headers = Headers;
  // globalThis.Request = Request;
  // globalThis.Response = Response;
}

export interface ThisArgv {
  [x: string]: unknown;
  download: boolean | undefined;
  sync: boolean | undefined;
  saveTo: string;
  to: string;
  from: string;
  principal: boolean | undefined;
  _: (string | number)[];
  $0: string;
}

export const argv = yargs
  .option('from', {
    description: 'sync from canister id',
    type: 'string',
  })
  .option('to', {
    description: 'sync to canister id',
    type: 'string',
  })
  .option('saveTo', {
    description: 'save saveTo to',
    type: 'string',
  })
  .option('principal', {
    description: 'get principal from pem',
    type: 'boolean',
  })
  .option('download', {
    description: 'download',
    type: 'boolean',
  })
  .option('sync', {
    description: 'sync',
    type: 'boolean',
  })
  .help()
  .alias('help', 'h').argv;

export function getAssetsCanisterId(production = false): string | undefined {
  const isProd = production || process.env.NODE_ENV === 'production';
  let canisterId;
  if (isProd) {
    const icFile = fs.readFileSync(path.resolve('./canister_ids.json'), {
      encoding: 'utf8',
    });
    canisterId = JSON.parse(icFile).assets_v1.ic ?? undefined;
  } else {
    const localFile = fs.readFileSync(
      path.resolve('.dfx/local/canister_ids.json'),
      { encoding: 'utf8' },
    );
    canisterId = JSON.parse(localFile).assets_v1.local;
  }
  return canisterId;
}

export const assetsFrom = (argv as ThisArgv).from;
export const assetsTo = (argv as ThisArgv).to;
export const saveTo = (argv as ThisArgv).saveTo ?? './sync_folder';
export const fromActor = getActor<assetsService>(
  identity,
  assetsIDL,
  assetsFrom,
);

export const toActor = getActor<assetsService>(identity, assetsIDL, assetsTo);
