module.exports = (function () {
    'use strict';
    const express = require('express');
    const router = express.Router();
    const passport = require('passport');
    const jwt = require('jsonwebtoken');

    /*load Model*/
    let categoryModel = require("../models/category.js");
    let bookmarkModel = require("../models/bookmark");
    /*-------------------------------START category--------------------------------------------------------*/

    // my categories
    router.get('/usercategory/', passport.authenticate('jwt', { session: false }), (req, res) => {
        var response = {};
        categoryModel.find({ user_id: req.user._id }, null, { sort: { position: 1 } }, function (err, category) {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": category };
            };
            res.json(response);
        });
    });

    // admin user categories
    router.get('/adminusercategory/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        var response = {};
        categoryModel.find({ user_id: req.params.id }, null, { sort: { position: 1 } }, function (err, category) {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": category };
            };
            res.json(response);
        });
    });
    
    // get category
    router.get('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
        var response = {};
        categoryModel.find({}, null, { sort: { position: 1 } }).populate('user_id').exec( function (err, categorys) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": categorys };
            };
            res.json(response);
        });
    });

    // add category
    router.post('/', passport.authenticate('jwt', { session: false }), function (req, res) {
        var response = {};
        var category = new categoryModel(req.body);
        category.save(function (err, category) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": category };
            }
            res.json(response);
        });
    });

    // update category
    router.put('/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
        var response = {};
        categoryModel.findByIdAndUpdate(req.params.id, req.body, { "new": true }, function (err, category) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": category };
            }
            res.json(response);
        });
    });
    // update position
    router.get('/update-position/:position', passport.authenticate('jwt', { session: false }), function (req, res) {
        var response = {};
        var position = req.params.position;
        console.log(position)
        categoryModel.update({ "position": { "$gte": position }}, { $inc: { 'position': 1 } }, { multi: true }).exec(function (err, category) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": category };
            }
            res.json(response);
        });
    });

    // get one category
    router.get('/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
        var response = {};
        categoryModel.findById(req.params.id, function (err, category) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": category };
            };
            res.json(response);
        });
    });

    // delete category
    router.delete('/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
        var response = {};
        categoryModel.remove({ _id: req.params.id }, function (err, category) {
            if (err) {
                response = { "error": true, "message": err };
                res.json(response);
            } else {
                bookmarkModel.remove({ category_id: req.params.id }, function (err, bookmark) {
                    if (err) {
                        response = { "error": true, "message": err };
                        res.json(response);
                    } else {
                        response = { "error": false, "message": 'category deleted successfully.' };
                        res.json(response);
                    };
                });
            };
        });
    });
 

    /*-------------------------------END category--------------------------------------------------------*/
    return router;
    
})();