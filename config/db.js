const dotenv = require('dotenv-safe')

dotenv.config()

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
    }
    
    try{
        const mysql = require("mysql2/promise");
        const connection = await mysql.createConnection(
            `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
        );
        console.log("MySQL connected!");
        global.connection = connection;
        return connection;
    } catch (e) {
        console.log(e.message)
    }
}

const createUserTable = async () => {
    try {
        const connection = await connect()
        const query = `CREATE TABLE IF NOT EXISTS users 
        (
            id INT AUTO_INCREMENT PRIMARY KEY, 
            name VARCHAR(127) NOT NULL, 
            email VARCHAR(127) NOT NULL, 
            password VARCHAR(127) NOT NULL,
            UNIQUE (email)
        );`
        await connection.query(query)
    } catch (e) {
        console.log(e.message)
    }
}

const createCompanyTable = async () => {
    try {
        const connection = await connect()
        const query = `CREATE TABLE IF NOT EXISTS company 
        (
            id INT AUTO_INCREMENT PRIMARY KEY, 
            cnpj VARCHAR(127) NOT NULL, 
            corporate_name VARCHAR(127) NOT NULL, 
            trading_name VARCHAR(127) NOT NULL,
            city VARCHAR(127) NOT NULL,
            state VARCHAR(127) NOT NULL,
            UNIQUE (cnpj)
        );`
        await connection.query(query)
    } catch (e) {
        console.log(e.message)
    }
}

module.exports = {
    connect,
    createUserTable,
    createCompanyTable,
}
