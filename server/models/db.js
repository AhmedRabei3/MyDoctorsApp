const {Sequelize} = require("sequelize");

const db = new Sequelize(
    process.env.DB_NAME , 
    process.env.DB_USER , 
    process.env.DB_PASS ,{
    host : 'localhost',
    dialect : "postgres"
});

 db.authenticate().then(()=>{
    console.log("db has been connected");
}).catch(() => {
    console.error("Unable to connect db")
});

module.exports = db;