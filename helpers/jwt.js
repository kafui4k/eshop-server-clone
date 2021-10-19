const expressJWT = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;

    return  expressJWT({
        secret,
        algorithms: ['PS512']
    }).unless({
        path: [
            { url: /\/api\/v1\/products(*)/, methods: ['GET', 'POST']},
            { url: /\/api\/v1\/categories(*)/, methods: ['GET', 'POST']},
            `${api}/v1/users/login`,
            `${api}/v1/users/register`
        ]
    })
}

module.exports = authJwt;