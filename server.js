'use strict';

const Hapi = require('@hapi/hapi');
const routes = require('./route/route')


const users = [
    {
        username: "kelvin",
        password: "ball",
        id: 0,
        name: "adinata"
    }
];
module.exports.getUsers = users;
//basic authentication
// const validate = async (request, username, password, h) => {
//     if(!users[username]){
//         return { isValid: false }
//     }
//     const user = users[username];
//     if(user.password === password){
//         return { isValid : true, credentials: {id: user.id, name: user.name }}
//     }else{
//         return { isValid : false }
//     }
// }

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    await server.register([
        {
            plugin: require('@hapi/cookie')
        }
    ]);
    server.auth.strategy('login', 'cookie', {
        cookie: {
            name: 'session',
            password: 'unjae202110100101sjsjsjjsjsjsjjsjsjjsjsjsj',
            isSecure: false,
            
        },
        redirectTo: '/login',
        validate: async (request, session, response) => {
           
            if(session.username === null , session.password === null ){
                return { isValid : false };
              
                
               
            }else{
                return { isValid : true };
            }
         
        }

    });
    server.auth.default('login');

    server.route(routes);
   


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();