async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://mateusvilasboas:player2@localhost:3306/desafio");
    console.log("MySQL connected!");
    global.connection = connection;
    return connection;
}

const createUserTable = async () => {
    const connection = await connect()
    const query = `CREATE TABLE IF NOT EXISTS users 
    (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        name VARCHAR(127) NOT NULL, 
        email VARCHAR(127) NOT NULL, 
        password VARCHAR(127) NOT NULL,
        UNIQUE (email)
    );`
    return await connection.query(query)
}

module.exports = {
    connect,
    createUserTable
}
