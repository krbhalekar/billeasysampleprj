let pool = require('../database/connection');

let storeFileInfo = async (user_id, original_filename, storage_path, title, description) => {
    try {
        let query = 'INSERT INTO files(user_id, original_filename, storage_path, title, description) VALUES($1, $2, $3, $4, $5) RETURNING *';
        let values = [user_id, original_filename, storage_path, title, description];
        let result = await pool.query(query, values);
        console.log('file stored : ' + JSON.stringify(result.rows[0]));
        return result.rows;
    } catch (error) {
        console.error('error while storing file:', error);
        return 0;
    }
}

let getFileInfo = async (userid, fileid) => {
    try {
        let query = 'SELECT user_id, original_filename, storage_path, title, description status, extracted_data, uploaded_at FROM files WHERE id = $1 and user_id = $2';
        let values = [fileid, userid];
        let result = await pool.query(query, values);
        console.log('file info : ' + JSON.stringify(result.rows[0]));
        return result.rows;
    } catch (error) {
        console.error('error while read file info:', error);
        return 0;
    }
}

let getUploadedFiles = async () => {
    try {
        let query = 'SELECT id, storage_path FROM files WHERE status = $1';
        let values = ['uploaded'];
        let result = await pool.query(query, values);
        console.log('file info : ' + JSON.stringify(result.rows[0]));
        return result.rows;
    } catch (error) {
        console.error('error while read file info:', error);
        return 0;
    }
}

let updateFileStatus = async (fileid, status) => {
    try {
        let query = 'UPDATE files SET status = $1 WHERE id = $2';
        let values = [status, fileid];
        let result = await pool.query(query, values);
        console.log('file info : ' + JSON.stringify(result.rowCount));
        return result.rows;
    } catch (error) {
        console.error('error while read file info:', error);
        return 0;
    }
}

let updateFileContent = async (fileid, filecontent) => {
    try {
        let query = 'UPDATE files SET extracted_data = $1 WHERE id = $2';
        let values = [filecontent, fileid];
        let result = await pool.query(query, values);
        console.log('file content info : ' + JSON.stringify(result.rowCount));
        return result.rows;
    } catch (error) {
        console.error('error while updating file content:', error);
        return 0;
    }
}

module.exports = {
    storeFileInfo,
    getFileInfo,
    getUploadedFiles,
    updateFileStatus,
    updateFileContent
}