const db = require('../db');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const path = require('path');


class serviceOrderedController {




    async createServiceOrdered(req, res, next) {
        try {
            // const {name} = req.body;


            // const result = await db.query("INSERT INTO type_service (name) VALUES ($1) RETURNING *",
            // [name]);
            const {usermaster_id, usercustomer_id, service_id, service_date} = req.body;


            const result = await db.query("INSERT INTO service_ordered (usermaster_id, usercustomer_id, service_id, service_date, completed,review) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [usermaster_id, usercustomer_id, service_id, service_date,false,false]);
            // const result = await db.query("INSERT INTO service_ordered (usermaster_id, usercustomer_id, service_id) VALUES ($1, $2, $3) RETURNING *",
            //     [usermaster_id, usercustomer_id, service_id]);
            if (result.rows.length === 0)
                return res.status(404).json({ message: "service not found" });
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }

    async getServiceOrderedMaster(req, res, next) {
        try {
            // const {name} = req.body;


            // const result = await db.query("INSERT INTO type_service (name) VALUES ($1) RETURNING *",
            // [name]);
            const {id} = req.params;
            const result = await db.query("SELECT * FROM service_ordered JOIN users ON service_ordered.usercustomer_id = users.id JOIN service ON service_ordered.service_id = service.id WHERE usermaster_id = $1 AND completed=false", [id]);


            // const result = await db.query("INSERT INTO service_ordered (usermaster_id, usercustomer_id, service_id) VALUES ($1, $2, $3) RETURNING *",
            //     [usermaster_id, usercustomer_id, service_id]);
            
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }

    async getServiceOrderedCustomer(req, res, next) {
        try {
            // const {name} = req.body;


            // const result = await db.query("INSERT INTO type_service (name) VALUES ($1) RETURNING *",
            // [name]);
            const {id} = req.params;
            const result = await db.query("SELECT * FROM service_ordered JOIN users ON service_ordered.usermaster_id = users.id JOIN service ON service_ordered.service_id = service.id WHERE usercustomer_id = $1 AND completed=false", [id]);


            // const result = await db.query("INSERT INTO service_ordered (usermaster_id, usercustomer_id, service_id) VALUES ($1, $2, $3) RETURNING *",
            //     [usermaster_id, usercustomer_id, service_id]);
            
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }
    async deleteServiceOrdered(req, res, next) {
        try {
            // const {name} = req.body;


            // const result = await db.query("INSERT INTO type_service (name) VALUES ($1) RETURNING *",
            // [name]);
            const {id} = req.params;
            const result = await db.query("DELETE FROM service_ordered WHERE service_ordered_id = $1 ", [id]);


            // const result = await db.query("INSERT INTO service_ordered (usermaster_id, usercustomer_id, service_id) VALUES ($1, $2, $3) RETURNING *",
            //     [usermaster_id, usercustomer_id, service_id]);
            if (result.rows.length === 0)
                return res.status(404).json({ message: "service not found" });
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }
    async historyServiceOrdered(req, res, next) {
        try {
            // const {name} = req.body;


            // const result = await db.query("INSERT INTO type_service (name) VALUES ($1) RETURNING *",
            // [name]);
            const {id} = req.params;
            const result = await db.query("SELECT * FROM service_ordered JOIN users ON service_ordered.usermaster_id = users.id JOIN service ON service_ordered.service_id = service.id WHERE usercustomer_id = $1 AND completed=true", [id]);


            // const result = await db.query("INSERT INTO service_ordered (usermaster_id, usercustomer_id, service_id) VALUES ($1, $2, $3) RETURNING *",
            //     [usermaster_id, usercustomer_id, service_id]);
            
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }
    async historyServiceOrderedMaster(req, res, next) {
        try {
            // const {name} = req.body;


            // const result = await db.query("INSERT INTO type_service (name) VALUES ($1) RETURNING *",
            // [name]);
            const {id} = req.params;
            const result = await db.query("SELECT * FROM service_ordered JOIN users ON service_ordered.usercustomer_id = users.id JOIN service ON service_ordered.service_id = service.id WHERE usermaster_id = $1 AND completed=true", [id]);


            // const result = await db.query("INSERT INTO service_ordered (usermaster_id, usercustomer_id, service_id) VALUES ($1, $2, $3) RETURNING *",
            //     [usermaster_id, usercustomer_id, service_id]);
            
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }
    async doServiceOrdered(req, res, next) {
        try {
            // const {name} = req.body;


            // const result = await db.query("INSERT INTO type_service (name) VALUES ($1) RETURNING *",
            // [name]);
            const {service_ordered_id} = req.body;
            
            const result = await db.query("UPDATE service_ordered SET completed=$2 WHERE service_ordered_id = $1 RETURNING *", [service_ordered_id,true]);


            // const result = await db.query("INSERT INTO service_ordered (usermaster_id, usercustomer_id, service_id) VALUES ($1, $2, $3) RETURNING *",
            //     [usermaster_id, usercustomer_id, service_id]);
            if (result.rows.length === 0)
                return res.status(404).json({ message: "service not found[p[p[p" });
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }
   
    // async getServicesMaster(req, res, next) {
    //     try {
    //         const { id } = req.params;

    //         const result = await db.query("SELECT * FROM service JOIN type_service ON service.type_service_id = type_service.id  WHERE user_id = $1", [id]);

    //         const r=result.rows
    //         // res.send(result.rows);
    //         // console.log(result);
    //         res.json(r);
    //     } catch (error) {
    //         next(error);
    //     }

    // }


}

module.exports = new serviceOrderedController()