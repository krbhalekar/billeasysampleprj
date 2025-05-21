let fs = require('fs');

let readfile = async (filepath) => {
    try {
        let data = await fs.readFileSync(filepath, 'utf8');
        console.log('file read:', data);
        return data;
    } catch (err) {
        console.error('error reading file:', err);
        return err;
    }
}

module.exports = {
    readfile
}