
import amqp from 'amqplib';
import fs from 'fs';
import path from 'path';
import { uploadToS3 } from './upload.js';


const QUEUE = 'make_upload_file';

async function consume() {
  const conn = await amqp.connect('amqp://user:password@rabbitmq');
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE);
  channel.prefetch(1);

  channel.consume(QUEUE, async (msg: any) => {
    const task = JSON.parse(msg.content.toString());
   console.log(`Worker received task : ${task.fileId}`);

    const filePath = path.join('tmp', `\${task.fileId}.bin`);
    fs.writeFileSync(filePath, Buffer.alloc(task.size));

    await uploadToS3(filePath, task.s3Path);
    console.log(`Uploaded :  ${task.fileId}`);

    channel.ack(msg);
  });
}

consume();
