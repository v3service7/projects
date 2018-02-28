module.exports = (function () {
    'use strict';
    const express = require('express');
    const router = express.Router();
    const passport = require('passport');
    const jwt = require('jsonwebtoken');

    /*load Model*/
    let bookmarkModel = require("../models/bookmark.js");
    let categoryModel = require("../models/category.js");

    /*-------------------------------START bookmark--------------------------------------------------------*/
    // my bookmark
    router.get('/category/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        var response = {};

        bookmarkModel.find({ category_id: req.params.id }, function (err, bookmark) {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": bookmark };
            };
            res.json(response);
        });
    });
    // get bookmark
    router.get('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
        var response = {};
        bookmarkModel.find({}, null, { sort: { created_at: 1 } }, function (err, bookmarks) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": bookmarks };
            };
            res.json(response);
        });
    });

    // add bookmark
    router.post('/', passport.authenticate('jwt', { session: false }), function (req, res) {
        var response = {};
        console.log(req.body)
        var bookmark = new bookmarkModel(req.body);
        bookmark.save((err, bookmark) => {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": 'Bookmarks added successfully.' };
            }
            res.json(response);
        });
    });

    // update bookmark
    router.put('/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
        var response = {};
        bookmarkModel.findByIdAndUpdate(req.params.id, req.body, { "new": true }, function (err, bookmark) {
            if (err) {
                response = { "error": true, "message": err };
            } else {

                response = { "error": false, "message": bookmark };
            }
            res.json(response);
        });
    });

    // get one bookmark
    router.get('/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
        var response = {};
        bookmarkModel.findById(req.params.id, function (err, bookmark) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": bookmark };
            };
            res.json(response);
        });
    });

    // delete bookmark
    router.delete('/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
        var response = {};
        bookmarkModel.remove({ _id: req.params.id }, function (err, bookmark) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": bookmark };
            };
            res.json(response);
        });
    });

    
    /*-------------------------------END bookmark--------------------------------------------------------*/

    return router;
})();

