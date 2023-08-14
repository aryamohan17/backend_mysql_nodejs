const mysql_con = require('../mysql_db').mysql_conn
const bcrypts = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRound = 20



async function insert_db(username,password) {
    const encrypt_pass = await bcrypts.hash(password,saltRound);
    const insert_query = 'INSERT INTO `register_user`( `username`, `password`) VALUES (?,?)';
    var result = await mysql_con.query(insert_query,[username,encrypt_pass])
    if(result[0].length != 0){
        return result[0]
    }else{
        return []
    }
}

async function login(username,password) {
    const login_data= 'SELECT  `username`,`password` FROM `register_user` WHERE username=?';
    const [rows] = await mysql_con.execute(login_data,[username])
    if (rows.length != 0) {
        const user_name = rows[0].username
        const user = rows[0].password
        // console.log(user);
        const jwt_tocken = jwt.sign(user_name,"secretKey")
        const match = await bcrypts.compare(password,rows[0].password)
        console.log(match);
        // return match
        if (match) {
            return{
                match,
                jwt_tocken
            }
        } else {
            match
        }
        
    } else {
        return false
    }  
}
// get name 
async function getName(username) {
    // const user_name = req.body.username
    const query = 'SELECT  `username` FROM `register_user` WHERE username=?'
    const result = await mysql_con.execute(query,[username])
    if(result[0].length!=0){
        return result[0]
    }else{
        return []
    }
}
async function asc_order() {
    const asc_order = 'SELECT * FROM `register_user` ORDER BY username';
    const result =await mysql_con.execute(asc_order)
    if(result[0].length!=0)
    {
        return result[0]
    }
    else{
        return []
    }
}

async function limit_() {
    const limit_ = 'select * from register_user limit 1'
    const result = await mysql_con.execute(limit_)
    if(result[0].length!=0){
        return result[0]
    }else{
        return []
    }
}

module.exports={insert_db,login,asc_order,limit_,getName}