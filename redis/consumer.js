require('dotenv').config();
let { Worker } = require('bullmq');
let IORedis = require('ioredis');
let fileservice = require('../services/fileservice');
let filereader = require('../utils/filereader');
let jobservice = require('../services/jobservice');

let connection = new IORedis({ maxRetriesPerRequest: null });
let worker = new Worker(process.env.REDIS_QUEUE, async (job) => {
    console.log(`Processing job ${job.id}:`, job.name);
    console.log('Data:', job.data);
    let filecontent = await filereader.readfile(job.data.filepath);
    await fileservice.updateFileContent(job.data.fileid, filecontent.toString());
    await jobservice.updateJobInfoProcessing('processing', job.id);

}, { connection });

worker.on('completed', async (job) => {
    console.log(`Job ${job.id} completed`);
    await fileservice.updateFileStatus(job.data.fileid, 'processed');
    await jobservice.updateJobInfoCompleted('completed', job.id);
});

worker.on('failed', async (job, err) => {
    console.error(`Job ${job.id} failed:`, err);
    await fileservice.updateFileStatus(job.data.fileid, 'failed');
    await jobservice.updateJobInfoFailed('failed', job.id, err);
});