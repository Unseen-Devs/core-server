import { Sonyflake, Epoch } from 'sonyflake';

export const snowflake = new Sonyflake({
  machineId: 1,
  epoch: Epoch.TWITTER, // timestamp
});

const genID = new Sonyflake({
  machineId: 2, // in range 2^16
  epoch: Date.now(), // timestamp
});

export const encode = (str: string): string => {
  return Buffer.from(str, 'utf8').toString('base64');
};

export const decode = (str: string): string => {
  return Buffer.from(str, 'base64').toString('utf8');
};

export function onlyUniqueString(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index;
}

export const genNonce = () => {
  const rs = genID.nextId();
  return parseInt(rs, 10);
};
