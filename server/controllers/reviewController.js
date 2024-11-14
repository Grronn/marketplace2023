const db = require('../db');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const path = require('path');


class reviewController {




    async createReview(req, res, next) {
        try {
            const { service_ordered_id, usercustomer_id, service_id, rate, text_review, usermaster_id } = req.body;

            const result = await db.query("INSERT INTO review ( review_usercustomer_id, review_service_id, rate, text_review, review_usermaster_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [usercustomer_id, service_id, rate, text_review, usermaster_id]);
            // const result1 = await db.query("UPDATE service_ordered SET review=$2 WHERE service_ordered_id = $1 RETURNING *", [service_ordered_id, true]);
            // const result2 = await db.query('UPDATE service_ordered SET review=$2 WHERE id = $1 RETURNING *',
            //     [service_ordered_id, true]);
            if (result.rows.length === 0)
                return res.status(404).json({ message: "service not found" });
            res.json(result.rows[0]/*,result2,result1.rows[0]*/);

        } catch (error) {
            res.json(error.message);
        }

    }
    async createReviewUpdate(req, res, next) {
        try {
            const { service_ordered_id } = req.body;

            const result = await db.query("UPDATE service_ordered SET review=$2 WHERE service_ordered_id = $1 RETURNING *", [service_ordered_id, true]);

            // const result1 = await db.query("UPDATE service_ordered SET review=$2 WHERE service_ordered_id = $1 RETURNING *", [service_ordered_id, true]);
            // const result2 = await db.query('UPDATE service_ordered SET review=$2 WHERE id = $1 RETURNING *',
            //     [service_ordered_id, true]);
            if (result.rows.length === 0)
                return res.status(404).json({ message: "service not found" });
            res.json(result.rows[0]/*,result2,result1.rows[0]*/);

        } catch (error) {
            res.json(error.message);
        }

    }
    async getReview(req, res, next) {
        try {
            const { id } = req.params;

            const result = await db.query("SELECT * FROM review LEFT JOIN users ON review.review_usercustomer_id = users.id LEFT JOIN service ON review.review_service_id = service.id WHERE review_usermaster_id = $1", [id]);
            // LEFT JOIN service_ordered ON review.service_id = service_ordered.service_ordered_id


            // res.send(result.rows);
            // console.log(result);
            res.json(result.rows);
        } catch (error) {
            next(error);
        }
    }
    async getReviewCount(req, res, next) {
        try {
            const { id } = req.params;

            const result = await db.query("SELECT * FROM review WHERE review_usermaster_id = $1", [id]);


            const r = result.rows
            // res.send(result.rows);
            // console.log(result);
            res.json(r.length);
        } catch (error) {
            next(error);
        }
    }
    async getReviewAverage(req, res, next) {
        try {
            const { id } = req.params;

            const result = await db.query("SELECT AVG(rate) FROM review WHERE review_usermaster_id = $1", [id]);

            var avg = result.rows[0].avg
            var a = Number(avg)
            if (a % 1 != 0) {
                a = a.toFixed(2)
            }

            // res.send(result.rows);
            // console.log(result);
            res.json(a);
        } catch (error) {
            next(error);
        }
    }



}

module.exports = new reviewController()