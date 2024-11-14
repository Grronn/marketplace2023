const db = require('../db');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const path = require('path');




class TypeServiceControler {




    async getAll(req, res) {
        try {
            const result = await db.query('SELECT * FROM type_service')
            // res.send(result.rows);
            // console.log(result);
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }


}

module.exports = new TypeServiceControler()