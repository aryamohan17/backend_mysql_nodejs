const mysql_con = require('../mysql_db').mysql_conn

const bcrypts = require('bcrypt')

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
        const user = rows[0].password
        console.log(user);
        const match = await bcrypts.compare(password,rows[0].password)
        console.log(match);

        if (match) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }

    
}

module.exports={insert_db,login}