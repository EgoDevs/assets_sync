import fs from 'fs';
import shell from 'shelljs';
import {
  argv,
  assetsFrom,
  assetsTo,
  fromActor,
  saveTo,
  ThisArgv,
} from './settings';
import { identity } from './settings/identity';

function genFile(path: string, key: string, data: Buffer) {
  const keyList = key.split('/').filter(e => e !== '');
  const file = keyList[keyList.length - 1];
  let dir = path;
  if (keyList.length > 1) {
    const dirList = keyList.slice(0, keyList.length - 1);

    for (let d = 0; d < dirList.length; d += 1) {
      let cur = `${dir}/${dirList[d]}`;
      fs.mkdirSync(cur, { recursive: true });
      dir = cur;
    }
  }

  fs.writeFileSync(`${dir}/${file}`, data);
}

async function download() {
  const actor = await fromActor;
  const assetList = await actor.list({});

  const rList = assetList.map(e => {
    const accept_encodings = e.encodings.map(f => {
      return f.content_encoding;
    });
    return { key: e.key, accept_encodings };
  });

  for (const r of rList) {
    const detail = await actor.get(r);

    if (String(detail.content.length) !== detail.total_length.toString()) {
      const contentLength = BigInt(detail.content.length);
      const totalLength = detail.total_length;
      const chunkCount = Math.floor(Number(totalLength / contentLength)) + 1;
      console.log('found big file: ');
      console.log(r.key);
      console.log(detail.content_encoding);
      console.log(chunkCount);
      console.log('\n');
      let contentArr: number[] = [];
      for (let chunk = 0; chunk < chunkCount; chunk += 1) {
        const content = await actor.get_chunk({
          key: r.key,
          sha256: detail.sha256,
          content_encoding: detail.content_encoding,
          index: BigInt(chunk),
        });
        contentArr = contentArr.concat(content.content);
      }
      // fs.writeFile()
      genFile(saveTo, r.key, Buffer.from(contentArr));
    } else {
      genFile(saveTo, r.key, Buffer.from(detail.content));
    }
  }
}

async function sync() {
  shell.exec(
    `${process.cwd()}/bin/icx-asset --pem ${process.cwd()}/credentials/whitelist.pem --replica ${
      process.env.NODE_ENV === 'production'
        ? 'https://ic0.app'
        : 'http://localhost:8000'
    } sync ${assetsTo} ${saveTo}`,
  );
}

if ((argv as ThisArgv).download) {
  // console.log('reinstall');
  download();
}

if ((argv as ThisArgv).sync) {
  sync();
}

if ((argv as ThisArgv).principal) {
  console.log(identity.getPrincipal().toText());
}
