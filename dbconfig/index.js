const Sequelize = require('sequelize');
const sequelize = new Sequelize('simple-api', 'root', 'Unjae2021', {
    host : 'localhost',
    port :  3306,
    dialect : 'mysql'
});

module.exports.connect = sequelize;


// sequelize.authenticate().then(() => {
//     console.log("connected to database");
    
// }).catch(() =>{
//     console.log("failed to connect");
// })