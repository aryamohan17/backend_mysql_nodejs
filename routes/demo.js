var express = require('express');
var router = express.Router();
var cntrl = require('../cntrl/cntrlDemo')
/* GET home page. */
router.post('/register', cntrl.insert_value,function(req, res, next) {
    if(res.locals.result == 'err'){
        var status = {'status':false , 'message':"some error exist" , result:[]}
        res.status(402).json(status)
    }else if(res.locals.result == 0){
        var status = {'status':false , 'message':"not found",result:[]}
        res.status(202).json(status)
    }else{
        var status = {'status':true, 'message':"sucessfully insert",result:res.locals.result}
        res.status(200).json(status)
    }
});
router.get('/login',cntrl.login_,function (req,res,next) {
    // console.log(res.locals.result);
    // if(res.locals.result == 'err'){
    //     var status = {'status':false,'message':"some eroor exist",result:[]}
    //     res.status(402).json(status)
    // }
     if(res.locals.result== true){
        var status = {'status':true,'message':"sucessfully logined",result:res.locals.result}
        res.status(200).json(status)

    }else{
        var status = {'status':false,'message':"not found!...Please check password or your name",result:[]}
        res.status(400).json(status)
    }
})
module.exports = router;
