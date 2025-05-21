require('dotenv').config();
let { Queue } = require('bullmq');
let IORedis = require('ioredis');
let jobservice = require('../services/jobservice');

let connection = new IORedis({ maxRetriesPerRequest: null });
let queue = new Queue(process.env.REDIS_QUEUE, { connection });

let addJobToQueue = async (name, job) => {
    console.log({job});
    let jobInfo = await queue.add(name, job);
    await jobservice.storeJobInfo(job.fileid, jobInfo.id, 'queued');
    return jobInfo.id;
}

module.exports = {
    addJobToQueue
}