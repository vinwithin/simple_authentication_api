const Connection = require('../dbconfig');
const {DataTypes} = require('sequelize');

const dbConnect = Connection.connect;
const User = dbConnect.define('users', {
    user_id : {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true,
    },
    username : {
        type : DataTypes.STRING,
    },
    password : {
        type : DataTypes.STRING,
    }
},
{
    freezeTableName: true
});
module.exports.userGet = User;
module.exports.createUsers = function(username, password){
    User.create({username, password}).then((data) => {
        console.log(data.toJSON());
    });
}

// dbConnect.drop().then(()=>{
//     dbConnect.sync();
// });