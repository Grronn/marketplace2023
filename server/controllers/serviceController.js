const db = require('../db');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const path = require('path');


class serviceController {




    async createService(req, res, next) {
        try {
            const {type_service_id, user_id, name, info, cost} = req.body;
            const { service_image } = req.files
            let fileName = uuid.v4() + ".jpg"
            service_image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const result = await db.query("INSERT INTO service ( type_service_id, user_id, service_name, service_image, info, cost) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [type_service_id, user_id, name, fileName, info, cost]);
            if (result.rows.length === 0)
                return res.status(404).json({ message: "service not found" });
            res.json(result.rows[0]);
        } catch (error) {
            next(error);
        }

    }

    async getServicesMaster(req, res, next) {
        try {
            const { id } = req.params;

            const result = await db.query("SELECT * FROM service JOIN type_service ON service.type_service_id = type_service.type_id  WHERE user_id = $1", [id]);

            const r=result.rows
            // res.send(result.rows);
            // console.log(result);
            res.json(r);
        } catch (error) {
            next(error);
        }

    }
    async getServicesAll(req, res, next) {
        try {
            const { id } = req.params;

            const result = await db.query("SELECT * FROM service");

            const r=result.rows
            // res.send(result.rows);
            // console.log(result);
            res.json(r);
        } catch (error) {
            next(error);
        }

    }


}

module.exports = new serviceController()