const db = require('../db');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const path = require('path');


class taskController {

    async createTask(req, res, next) {
        // const token = generateToken(req.user.id,req.user.email,req.user.role)
        // return res.json({token})
        try {
            const { usercustomer_id, name, info, cost, task_date, place, address, type_service_id } = req.body;
            const { image_task } = req.files

            let fileName = uuid.v4() + ".jpg"
            image_task.mv(path.resolve(__dirname, '..', 'static', fileName))
            const result = await db.query("INSERT INTO task (usercustomer_id, name, info_task, image_task, cost, task_date, place, address, type_service_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
                [usercustomer_id, name, info, fileName, cost, task_date, place, address, type_service_id]);
            if (result.rows.length === 0)
                return res.status(404).json({ message: "user not found" });
            res.json(result.rows[0]);
        } catch (error) {
            next(error);
        }

    }
    async getTask(req, res, next) {
        // const token = generateToken(req.user.id,req.user.email,req.user.role)
        // return res.json({token})
        try {
            const { id } = req.params;

            
            const result = await db.query("SELECT * FROM task LEFT JOIN type_service ON task.type_service_id = type_service.type_id WHERE NOT EXISTS (SELECT * FROM task_ordered WHERE task.task_id=task_ordered.task_ordered_id) AND usercustomer_id = $1 ORDER BY task_date", [id]);
            // const result = await db.query("SELECT task_ordered_id FROM task_ordered");LEFT JOIN service ON review.review_service_id = service.id
            // if (result.rows.length === 0)
            //     return res.status(404).json({ message: "task not found" });
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }

    async getAllTask(req, res, next) {
        // const token = generateToken(req.user.id,req.user.email,req.user.role)
        // return res.json({token})
        try {
            // const { id } = req.body;
            const a = [ 3, 4, 5];
            const s =a.toString()

            const result = await db.query("SELECT * FROM task LEFT JOIN type_service ON task.type_service_id = type_service.type_id WHERE NOT EXISTS (SELECT * FROM task_ordered WHERE task.task_id=task_ordered.task_ordered_id) AND type_service_id IN (3, 5, 6, 7, 8) ORDER BY task_date");
            if (result.rows.length === 0)
                return res.status(404).json({ message: "task not found" });
            res.json(result.rows);
        } catch (error) {
            res.json(error.message);
        }

    }

    async respondTask(req, res, next) {
        // const token = generateToken(req.user.id,req.user.email,req.user.role)
        // return res.json({token})
        try {
            const { task_id, usermaster_id, usercustomer_id } = req.body;



            const result = await db.query("INSERT INTO master_responsed (task_responded_id, usermaster_id,usercustomer_id) VALUES ($1, $2,$3) RETURNING *",
                [task_id, usermaster_id, usercustomer_id]);
            if (result.rows.length === 0)
                return res.status(404).json({ message: "task not found" });
            res.json(result.rows);
        } catch (error) {
            res.json(error.message);
        }

    }
    async getMasterResponsed(req, res, next) {
        // const token = generateToken(req.user.id,req.user.email,req.user.role)
        // return res.json({token})
        try {
            const { id } = req.params;


            const result = await db.query("SELECT * FROM master_responsed JOIN users ON master_responsed.usermaster_id=users.id JOIN task ON master_responsed.task_responded_id=task.task_id WHERE task_id = $1", [id]);
            // if (result.rows.length === 0)
            //     return res.status(404).json({ message: "master not found" });
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }

    async getTaskOrderedCustomer(req, res, next) {
        // const token = generateToken(req.user.id,req.user.email,req.user.role)
        // return res.json({token})
        try {
            const { id } = req.params;


            const result = await db.query("SELECT * FROM task_ordered JOIN users ON task_ordered.task_ordered_usermaster_id=users.id JOIN task ON task_ordered.task_ordered_id=task.task_id WHERE task_ordered_usercustomer_id = $1 AND completed=false ORDER BY task_ordered_pk_id DESC", [id]);
            // if (result.rows.length === 0)
            //     return res.status(404).json({ message: "tasks not found" });
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }

    async getHistoryTaskCustomer(req, res, next) {
        // const token = generateToken(req.user.id,req.user.email,req.user.role)
        // return res.json({token})
        try {
            const { id } = req.params;


            const result = await db.query("SELECT * FROM task_ordered JOIN users ON task_ordered.task_ordered_usermaster_id=users.id JOIN task ON task_ordered.task_ordered_id=task.task_id WHERE task_ordered_usercustomer_id = $1 AND completed=true ORDER BY task_ordered_pk_id", [id]);
            // if (result.rows.length === 0)
            //     return res.status(404).json({ message: "tasks not found" });
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }

    async createOrderedTask(req, res, next) {
        // const token = generateToken(req.user.id,req.user.email,req.user.role)
        // return res.json({token})
        try {
            const { id } = req.params;//id в params заказчика-customer
            const { usermaster_id, task_id } = req.body;


            const result = await db.query("INSERT INTO task_ordered (task_ordered_usermaster_id,task_ordered_usercustomer_id,task_ordered_id, completed) VALUES ($1, $2, $3, $4) RETURNING *",
                [usermaster_id, id, task_id, false]);

            if (result.rows.length === 0)
                return res.status(404).json({ message: "user not found" });
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }

    async getTaskOrderedMaster(req, res, next) {
        // const token = generateToken(req.user.id,req.user.email,req.user.role)
        // return res.json({token})
        try {
            const { id } = req.params;


            const result = await db.query("SELECT * FROM task_ordered JOIN users ON task_ordered.task_ordered_usermaster_id=users.id JOIN task ON task_ordered.task_ordered_id=task.task_id WHERE task_ordered_usermaster_id = $1 AND completed=false", [id]);
            // if (result.rows.length === 0)
            //     return res.status(404).json({ message: "tasks not found" });
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }

    async getHistoryTaskMaster(req, res, next) {
        // const token = generateToken(req.user.id,req.user.email,req.user.role)
        // return res.json({token})
        try {
            const { id } = req.params;


            const result = await db.query("SELECT * FROM task_ordered JOIN users ON task_ordered.task_ordered_usermaster_id=users.id JOIN task ON task_ordered.task_ordered_id=task.task_id WHERE task_ordered_usermaster_id = $1 AND completed=true", [id]);
            // if (result.rows.length === 0)
            //     return res.status(404).json({ message: "tasks not found" });
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }

    async deleteTaskWhenOrdered(req, res, next) {
        try {
            // const {name} = req.body;


            // const result = await db.query("INSERT INTO type_service (name) VALUES ($1) RETURNING *",
            // [name]);
            const { id } = req.params;
            const result = await db.query("DELETE FROM task WHERE task_id = $1 RETURNING *", [id]);


            // const result = await db.query("INSERT INTO service_ordered (usermaster_id, usercustomer_id, service_id) VALUES ($1, $2, $3) RETURNING *",
            //     [usermaster_id, usercustomer_id, service_id]);
            if (result.rows.length === 0)
                return res.status(404).json({ message: "task not found" });
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }

    async doTaskOrdered(req, res, next) {
        try {
            // const {name} = req.body;


            // const result = await db.query("INSERT INTO type_service (name) VALUES ($1) RETURNING *",
            // [name]);
            const {task_ordered_id} = req.body;
            
            const result = await db.query("UPDATE task_ordered SET completed=$2 WHERE task_ordered_id = $1 RETURNING *", [task_ordered_id,true]);


            // const result = await db.query("INSERT INTO service_ordered (usermaster_id, usercustomer_id, service_id) VALUES ($1, $2, $3) RETURNING *",
            //     [usermaster_id, usercustomer_id, service_id]);
            if (result.rows.length === 0)
                return res.status(404).json({ message: "task not found[p[p[p" });
            res.json(result.rows);
        } catch (error) {
            next(error);
        }

    }
}



module.exports = new taskController()