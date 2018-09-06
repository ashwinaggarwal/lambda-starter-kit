import { config } from 'dotenv';
import zlib from 'zlib';
import { promisify } from 'util';
import { lambda } from '../../common/utils/lambda';
import { log as logger } from '../../common/utils/logger';

const log = logger.bind('[kinesisTest]');

const gunzipP = promisify(zlib.gunzip);

/* Will read env variables as set in config file, should be first thing in the app to be executed */
config();

const parseRecords = async (records) => {
  const parsedRecords = await Promise.all(records.map(async (record) => {
    const dataBuffer = Buffer.from(record.kinesis.data, 'base64');
    const unzippedData = await gunzipP(dataBuffer);

    return {
      ...record,
      kinesis: {
        ...record.kinesis,
        data: unzippedData.toString()
      }
    };
  }));

  return parsedRecords;
};

export const get = lambda(async (event, context, callback) => {
  const { Records: records = [] } = event;

  const parsedRecords = await parseRecords(records);

  log('parsedRecords', JSON.stringify(parsedRecords));

  callback(null, {
    statusCode: 200,
    body: parsedRecords.length ? parsedRecords : 'No records to parse'
  });
});
