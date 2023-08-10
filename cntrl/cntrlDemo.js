var demoModel = require('../model/modelDemo')

async function insert_value(req,res,next) {
    var result = await demoModel.insert_db(req.body.data.username,req.body.data.password)
    res.locals.result = result
    next()
}

async function login_(req,res,next) {
    var result = await demoModel.login(req.body.data.username,req.body.data.password)
    res.locals.result = result
    next()
}

module.exports={insert_value,login_}