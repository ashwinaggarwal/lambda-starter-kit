import rp from 'request-promise';
import fs from 'fs';
import url from 'url';
import { promisify } from 'util';
import { performance } from 'perf_hooks'; /* eslint import/no-unresolved: 0, import/extensions: 0 */
import { log } from './logger';

export const toBool = val => (`${val}` === 'true');
export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
export const removeFile = promisify(fs.unlink);

export const flatmap = (arr) => {
  return arr.reduce((finalArr, [...elements]) => {
    return finalArr.concat(elements);
  }, []);
};

export const fetch = (requestObj) => {
  const {
    timeout = 10000,
    baseurl, url:
    fetchUrl, ...args
  } = requestObj;

  return rp({
    ...args,
    timeout,
    url: url.resolve(baseurl, fetchUrl)
  });
};

export const logPerformance = () => {
  const entries = performance.getEntries(); /* eslint no-undef: "off" */
  const groupedEntries = entries.reduce((groupEntry, entry) => {
    if (Object.keys(entry).length) {
      const [entryName] = entry.name.split(':');
      groupEntry[entryName] = groupEntry[entryName] || {};
      groupEntry[entryName][entry.name] = entry.startTime;
    }
    return groupEntry;
  }, {});
  log(
    '[Performance]',
    Object.keys(groupedEntries).reduce((perf, entryName) => {
      const entry = groupedEntries[entryName];
      perf[entryName] = entry[`${entryName}:end`] /* eslint no-param-reassign: "off" */
                  - entry[`${entryName}:start`];
      return perf;
    }, {})
  );
};
