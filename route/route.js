const connection = require('../dbconfig');
const Users = require('../model/users');
const Boom = require('@hapi/boom');
const userLog = require('../server');


const routes = [
{
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return `hallo ${request.auth.credentials.username}`;
    },
    options:{
        auth: {
            mode: 'try'
        }
    }
},
{
    method: 'POST',
    path: '/login',
    handler:  (request, h) => {
        const { username, password } = request.payload;
        const userLog = Users.userGet;
        
        const login =   userLog.findOne({where: {username: username, password: password}});
        if(login ===  null){
            return 'username dan password anda salah';
            
        }else{
            request.cookieAuth.set({ username: username, password: password })
            return "selamat anda telah login";
            
        }
        // if(username === "kelvin" && password === "ball"){
        //     request.cookieAuth.set({ username: username, password: password })
        //     return "selamat anda telah login";
        // }else{
        //     return 'username dan password anda salah';
        // }
    },
    options:{
        auth: {
            mode: 'try'
        }
    }
},
{
    method : 'GET',
    path: '/logout',
    handler: (request, h) => {
        request.cookieAuth.clear();
        return 'anda berhasil logout';
    }
},
{
    method: 'GET',
    path: '/loginbasic',
    handler: (request,h) =>{
        return "welcome home";
    },
    options: {
        auth: 'login'
    }
},
{
    method : 'GET',
    path: '/logoutbasic',
    handler: (request, h) => {
        return Boom.unauthorized("You have been Logout");
    }
},
{
    method: 'POST',
    path: '/register',
    handler: (request, h) => {
        const { username, password } = request.payload;
        Users.createUsers(username, password);
        const akun = {
            username, password
        };
        const response = h.response({
            status: "success",
            message: "akun berhasil ditambahkan",
            data : akun,
            
        });
        response.code(200);
        return response; 
    }
},
{
    method: 'GET',
    path: '/getUsers',
    handler: (request, h) => {
        const user = connection.getUsers();
        console.log(JSON.stringify(user));
    }
},
{
    method: '*',
    path: '/{any*}',
    handler: function (request, h) {
        return h.response('404 Error! Page Not Found!').code(404);
    }
}

]
module.exports = routes;