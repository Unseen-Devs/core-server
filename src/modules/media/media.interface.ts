export type MediaOptions =
  | {
      driver: 'local';
      uploadDir: string;
      quality?: number;
      /** `width` and `height` by pixel for thumb */
      thumbSize?: number;
    }
  | {
      driver: 's3';
      accessKeyId: string;
      secretAccessKey: string;
      bucketName: string;
    };

export type MulterFile = {
  fieldname: string;
  /** Name of the file on the user's computer */
  originalname: string;
  /** Encoding type of the file */
  encoding: string;
  /** Mime type of the file */
  mimetype: string;
  /** Size of the file in bytes */
  size: number;
  /** The folder to which the file has been saved (DiskStorage) */
  destination: string;
  /** The name of the file within the destination (DiskStorage) */
  filename: string;
  /** Location of the uploaded file (DiskStorage) */
  path: string;
  /** A Buffer of the entire file (MemoryStorage) */
  buffer: Buffer;
};
