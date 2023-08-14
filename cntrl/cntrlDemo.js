var demoModel = require('../model/modelDemo')
const jwt = require('jsonwebtoken')

async function jwtTocken(req, res, next) {
    try {
        const token = req.headers['access_token']
        // console.log(token);
        if (!token) {
            res.status(401).json({ error: 'Unauthorized tocken' });
            return;
        }
        const result1 = jwt.verify(token, 'secretKey', (err) => {
            if (err) {
                res.status(403).json({ error: 'not a correct tocken' });
                return;
            }
            next()
        })
    } catch (err) {
        return err;
    }
}
async function insert_value(req, res, next) {
    var result = await demoModel.insert_db(req.body.data.username, req.body.data.password)
    res.locals.result = result
    next()
}

async function login_(req, res, next) {
    var result = await demoModel.login(req.body.data.username, req.body.data.password)
    res.locals.result = result
    next()
}

async function asc_order(req, res, next) {
    var result = await demoModel.asc_order()
    res.locals.result = result
    next()
}
async function limit(req, res, next) {
    var result = await demoModel.limit_()
    res.locals.result = result
    next()
}
async function getName(req, res, next) {

    var result = await demoModel.getName(req.body.data.username)
    res.locals.result = result
    next()
}
// 
module.exports = { insert_value, login_, asc_order, limit, getName, jwtTocken }