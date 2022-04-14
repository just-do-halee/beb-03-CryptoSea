import * as MimeType from 'mimetype';

export function amazonS3URL(bucketName: string, name: string) {
  return `https://${bucketName}.s3.amazonaws.com/${name}`;
}

export function attachExt<N extends string, E extends string>(
  name: N,
  ext: E,
): `${typeof name}.${typeof ext}` {
  return `${name}.${ext}`;
}

export function extToMimeType(ext: string): string {
  return MimeType.lookup('_.' + ext);
}
