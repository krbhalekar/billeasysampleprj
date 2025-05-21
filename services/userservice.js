let pool = require('../database/connection');

let createUser = async (email, password) => {
    try {
        let query = 'INSERT INTO users(email, password) VALUES($1, md5($2)) RETURNING *';
        let values = [email, password];
        let result = await pool.query(query, values);
        console.log('user created : ' + JSON.stringify(result.rows[0]));
        return 1;
    } catch (error) {
        console.error('error while creating user:', error.details);
        return 0;
    }
}

let loginUser = async (email, password) => {
    try {
        let query = 'SELECT * FROM users WHERE email = $1 AND password = md5($2)';
        let values = [email, password];
        let result = await pool.query(query, values);
        console.log('user found : ' + JSON.stringify(result.rows));
        return result.rows;
    } catch (error) {
        console.error('error while creating user:', error.details);
        return 0;
    }
}

module.exports = {
    createUser,
    loginUser
}