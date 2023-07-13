const firebird = require('node-firebird')
require('dotenv').config();

const connectionFirebird = {
    host: process.env.FB_HOST,
    port: process.env.FB_PORT,
    database: process.env.FB_DATABASE,
    user: process.env.FB_USER,
    password: process.env.FB_PASSWORD,
    lowercase_keys: process.env.LOWERCASE_KEYS, 
    role: process.env.FB_ROLE,           
    pageSize: process.env.FB_PAGESIZE,       
    retryConnectionInterval: process.env.FB_RETRYCONNECTIONINTERVAL, 
    blobAsText: process.env.FB_BLOBASTEXT, 
};

// 5 = o número é a contagem de soquetes abertos
const pool = firebird.pool(5, connectionFirebird)

function executeQuery(sql, params, callback){
    pool.get(function(err, db) {

        if (err)
            return callback(err, [])

        db.query(sql, params, function(err, result) {
            db.detach();

            if(err){
                return callback(err,[])                    
            }else{
                return callback(undefined, result)
            }
        });
    });

    pool.destroy();
}

module.exports = executeQuery