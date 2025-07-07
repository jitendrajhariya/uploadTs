
import amqp from 'amqplib';
import { performance } from 'perf_hooks';
 

const QUEUE = 'make_upload_file';
const TASK_ID = 'MakeAndUploadFiles';

async function sendTasks(fileCount: number, fileSize: number, s3Path: string) {
  const start = performance.now();
  const conn = await amqp.connect('amqp://user:password@rabbitmq');
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE);

  for (let i = 0; i < fileCount; i++) {
    const task = {
      taskId: TASK_ID,
      fileId: `file_${i}`,
      size: fileSize,
      s3Path,
    };
    channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(task)));
  }

 console.log(`Dispatched : ${fileCount} tasks`);

  setTimeout(() => {
    const end = performance.now();
    const timeToCopy = ((end - start) / 1000).toFixed(2);
    const totalSize = (fileCount * fileSize / (1024 ** 3)).toFixed(2);
    const speed = (Number(totalSize) / Number(timeToCopy)).toFixed(2);
    console.log(`timeToCopy: ${timeToCopy}s, fileSizeCreated: ${totalSize} GB, copySpeed: ${speed} GBs`);

      conn.close();
      process.exit(0);
  }, 1000 * fileCount);
}

sendTasks(10, 1024 * 1024 * 1024, 's3://mast-dev-intw-test01/files');
