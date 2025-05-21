let schedule = require('node-schedule');
let fileservice = require('../services/fileservice');
let { addJobToQueue } = require('../redis/producer');
schedule.scheduleJob('job', '*/5 * * * * *', async () => {
    let result = await fileservice.getUploadedFiles();
    console.log({ result });
    if (result.length > 0) {
        result.map(async (file) => {
            console.log({ fileid: file.id, filepath: file.storage_path });
            let jobid = await addJobToQueue(file.id, { fileid: file.id, filepath: file.storage_path });
            if (jobid > 0) {
                await fileservice.updateFileStatus(file.id, 'processing');
            } else {
                await fileservice.updateFileStatus(file.id, 'failed');
            }
        });
    } else {
        console.log('No File To Process');
    }
});