const db = require('../db');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const path = require('path');


const generateToken = (id, email, role, fio) => {
    return jwt.sign(
        { id, email, role, fio},
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {


    async registration(req, res, next) {
        const { email, password, role, phone_number } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректны email или password'))
        }
        const userExist = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        const userExistdata = userExist.rows[0];
        if (userExist.rows.length !== 0) {
            return res.status(400).json({
                message: 'Пользователь с таким Логином уже существует', userExistdata: {
                    id: userExistdata.id,
                    login: userExistdata.email,
                    password: userExistdata.password,
                    role: userExistdata.role
                }
            });
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const result = await db.query("INSERT INTO users ( email, password, role, phone_number) VALUES ($1, $2, $3, $4) RETURNING *",
            [email, hashPassword, role, phone_number]);
        const userExist2 = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = userExist2.rows[0];
        const token = generateToken(user.id,user.email, user.role, user.fio);
        return res.json({
            token
            ,
            user: {
                id: user.id,
                login: user.email,
                password: user.password,
                role: user.role,
                fio: user.fio
            }
        });
    }


    async login(req, res) {
        try {
            const { email, password, role } = req.body
            const userExist = await db.query("SELECT * FROM users WHERE email = $1", [email]);
            if (userExist.rows.length === 0) {
                return res.status(400).json({ message: `Пользователь с логином ${email} не найден` });
            }
            const user = userExist.rows[0];
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: `Введен неверный пароль` });
            }
            const token = generateToken(user.id,user.email, user.role, user.fio);
            return res.json({
                token
                ,
                user: {
                    id: user.id,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                    fio: user.fio
                }
            });

        } catch (e) {
            // console.log(e);
            res.status(400).json('Login error');
            // next(e);
        }
    }

    async check(req, res, next) {
        const { id } = req.user;
        const userExist = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = userExist.rows[0];
        const token = generateToken(user.id,user.email, user.role, user.fio);
        return res.json({ token })
    }

    async getAll(req, res) {
        try {
            let {id} = req.query
            let {type_service_id}=req.query
            let result
            // const resultcountreview = await db.query("SELECT * FROM review WHERE usermaster_id = $1", [id]);
            // const countr = resultcountreview.length
            // const resrow=result.rows[0]
            
            if(!type_service_id){
                result = await db.query('SELECT * FROM users WHERE role =$1 AND id NOT IN ($2)', ["MASTER", id])
            }
            if(type_service_id){
                result = await db.query('SELECT * FROM users JOIN types_user_services ON users.id = types_user_services.user_id WHERE role =$1 AND type_service_id=$2', ["MASTER",type_service_id])
            }
            const userid=result.rows.id
            const resultrev = await db.query("SELECT * FROM review WHERE review_usermaster_id = $1", [userid]);
            const count =resultrev.length
            res.json(result.rows);
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const result = await db.query('SELECT * FROM users WHERE id = $1', [id])
            
            
            if (result.rowCount === 0)
                return res.status(404).json({ message: "users not found" });
            res.json(result.rows[0]);

        } catch (error) {
            next(error);
        }
    }

    async becomeMaster(req, res, next) {
        // const token = generateToken(req.user.id,req.user.email,req.user.role)
        // return res.json({token})
        try {
            const {id, FIO, info, education, address} = req.body;
            const { image_master } = req.files
            let fileName = uuid.v4() + ".jpg"
            image_master.mv(path.resolve(__dirname, '..', 'static', fileName))
            const result = await db.query('UPDATE users SET fio=$2, info= $3, education=$4, role=$5, image_master=$6, address=$7 WHERE id = $1 RETURNING *',
                [id, FIO, info, education, "MASTER", fileName, address]);
            if (result.rows.length === 0)
                return res.status(404).json({ message: "user not found" });
            res.json(result.rows[0]);
        } catch (error) {
            next(error);
        }


    }

    async createTimesheet(req, res, next) {
        // const token = generateToken(req.user.id,req.user.email,req.user.role)
        // return res.json({token})
        try {
            const {user_id, time, time_date} = req.body;
            
            
            const result = await db.query("INSERT INTO user_time ( user_id, time, time_date, busy) VALUES ($1, $2, $3, $4) RETURNING *",
            [user_id, time, time_date, false]);
            if (result.rows.length === 0)
                return res.status(404).json({ message: "user not found" });
            res.json(result.rows[0]);
        } catch (error) {
            next(error);
        }


    }
    async getTimesheet(req, res, next) {
        // const token = generateToken(req.user.id,req.user.email,req.user.role)
        // return res.json({token})
        try {
            const {user_id, time_date} = req.query;
            
            
            const result = await db.query('SELECT * FROM user_time WHERE user_id = $1 AND time_date = $2 AND busy = $3 ORDER BY time', [user_id,time_date,false])
            if (result.rows.length === 0)
                return res.status(404).json({ message: "user not found"+user_id+" "+time_date });
            res.json(result.rows);
        } catch (error) {
            next(error);
        }


    }

}

module.exports = new UserController()