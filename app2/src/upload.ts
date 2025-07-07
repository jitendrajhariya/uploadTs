
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';


const s3 = new S3Client({ region: 'us-west-2' });

export async function uploadToS3(filePath: string, s3Path: string) {
  const Bucket = s3Path.replace('s3://', '').split('/')[0];
  const Key = s3Path.replace(`s3://\${Bucket}/`, '') + '/' + path.basename(filePath);
  const stream = fs.createReadStream(filePath);

  const command = new PutObjectCommand({
    Bucket,
    Key,
    Body: stream
  });

  await s3.send(command);
}
