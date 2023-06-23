require('dotenv').config();

const { JAWSDB_URL, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const Sequelize = require('sequelize'); 

function makeConnection() {
    return JAWSDB_URL ? new Sequelize(JAWSDB_URL) 
        : new Sequelize(
            DB_NAME, 
            DB_USER, 
            DB_PASSWORD, 
            {
                host: 'localhost',
                dialect: 'mysql',
                port: 3306
            }
        ); 

}


module.exports = makeConnection();