const db = require('../db');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const path = require('path');




class typeUserServiceController {




    async addTypesUserServices(req, res, next) {
        try {
            const { user_id, type_service_id} = req.body
            const result = await db.query("INSERT INTO types_user_services ( user_id, type_service_id) VALUES ($1, $2) RETURNING *",
            [user_id, type_service_id]);
            // res.send(result.rows);
            // console.log(result);
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }

    async getTypesUserServicesid(req, res, next) {
        try {
            const { id } = req.params;

            const result = await db.query("SELECT * FROM types_user_services JOIN type_service ON types_user_services.type_service_id = type_service.type_id  WHERE user_id = $1", [id]);

            const r=result.rows
            // res.send(result.rows);
            // console.log(result);
            res.json(r);
        } catch (error) {
            next(error);
        }

    }

    // async getTypesUserServicesname(req, res, next) {
    //     try {
    //         const { id} = req.params

    //         const result = await db.query("SELECT * FROM type_service WHERE id = $1", [id]);
    //         // res.send(result.rows);
    //         // console.log(result);
    //         res.json(result.rows);
    //     } catch (error) {
    //         next(error);
    //     }

    // }
}

module.exports = new typeUserServiceController()