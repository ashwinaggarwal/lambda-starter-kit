import { config, KMS } from 'aws-sdk';

config.update({
  region: 'eu-west-1'
});

const kms = new KMS();

export const encrypt = async (value) => {
  return new Promise((resolve, reject) => kms.encrypt({
    KeyId: process.env.CMK || 'arn:aws:kms:eu-west-1:487943794540:key/f7ee00b7-9aaf-415f-a4e3-8f7da957030f',
    Plaintext: Buffer.from(value)
  }, (err, data) => {
    if (err) reject(err);
    const { CiphertextBlob } = data;
    resolve(CiphertextBlob.toString('base64'));
  }));
};

export const decrypt = name => new Promise((resolve, reject) => {
  kms.decrypt({
    CiphertextBlob: Buffer.from(name, 'base64')
  }, (err, data) => {
    if (err) {
      return reject(err.message);
    }
    return resolve(data.Plaintext.toString('utf-8'));
  });
});
