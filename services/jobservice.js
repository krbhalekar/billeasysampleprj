let pool = require('../database/connection');

let storeJobInfo = async (file_id, job_type, status) => {
    try {
        let query = 'INSERT INTO jobs(file_id, job_type, status, started_at) VALUES($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *';
        let values = [file_id, job_type, status];
        let result = await pool.query(query, values);
        console.log('job info stored : ' + JSON.stringify(result.rows[0]));
        return result.rows;
    } catch (error) {
        console.error('error while storing job info:', error);
        return 0;
    }
}

let updateJobInfoProcessing = async(status, jobid)=>{
    try {
        let query = 'UPDATE jobs SET status = $1 WHERE job_type = $2';
        let values = [status, jobid];
        let result = await pool.query(query, values);
        console.log('job info processing : ' + JSON.stringify(result.rows[0]));
        return result.rows;
    } catch (error) {
        console.error('error while processing job info:', error);
        return 0;
    }
}

let updateJobInfoCompleted = async(status, jobid)=>{
    try {
        let query = 'UPDATE jobs SET status = $1, completed_at = CURRENT_TIMESTAMP WHERE job_type = $2';
        let values = [status, jobid];
        let result = await pool.query(query, values);
        console.log('job info completed : ' + JSON.stringify(result.rows[0]));
        return result.rows;
    } catch (error) {
        console.error('error while completing job info:', error);
        return 0;
    }
}

let updateJobInfoFailed = async(status, jobid, error)=>{
    try {
        let query = 'UPDATE jobs SET status = $1, completed_at = CURRENT_TIMESTAMP, error_message = $2 WHERE job_type = $3';
        let values = [status, error, jobid];
        let result = await pool.query(query, values);
        console.log('job info failed : ' + JSON.stringify(result.rows[0]));
        return result.rows;
    } catch (error) {
        console.error('error while failing job info:', error);
        return 0;
    }
}

module.exports = {
    storeJobInfo,
    updateJobInfoProcessing,
    updateJobInfoCompleted,
    updateJobInfoFailed
}