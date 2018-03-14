module.exports = (function () {
    'use strict';
    const express = require('express');
    const router = express.Router();
    const passport = require('passport');
    const jwt = require('jsonwebtoken');
    const querystring = require('querystring');

    /*load Model*/
    let bookmarkModel = require("../models/bookmark.js");
    let categoryModel = require("../models/category.js");

    /*-------------------------------START bookmark--------------------------------------------------------*/
    // my bookmark
    router.get('/category/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        var response = {};
        var skip = 0;
        var limit = 20;
        if (req.query.start && req.query.end) {
            skip = parseInt(req.query.start);
            limit = parseInt(req.query.end);
        }
        bookmarkModel.find({ category_id: req.params.id }, null, { sort: { position: 1 } }).limit(limit).skip(skip).exec(function (err, bookmark) {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": bookmark };
            };
            res.json(response);
        });
    });

    // with out passport 
    router.get('/category/open/:id', (req, res) => {
        var response = {};
        var skip = 0;
        var limit = 20;
        if (req.query.start && req.query.end) {
            skip = parseInt(req.query.start);
            limit = parseInt(req.query.end);
        }
        bookmarkModel.find({ category_id: req.params.id }, null, { sort: { position: 1 } }).limit(limit).skip(skip).exec(function (err, bookmark) {
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
        bookmarkModel.find({}, null, { sort: { position: 1 } }, function (err, bookmarks) {
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
        var lastValuePositions;
        var newbookmark = new bookmarkModel(req.body);
        var category_id = req.body.category_id;
        bookmarkModel.find({ category_id: category_id }, null, { sort: { position: 1 } }, function (err, bookmarks) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                if (bookmarks.length > 0) {
                    /*  lastValuePositions = bookmarks[0].po sition;
                     newbookmark.position = lastValuePositions + 1; */
                    if (req.body.position == 'top') {
                        newbookmark.position = 1;
                        bookmarkModel.update({ category_id: req.body.category_id }, { $inc: { position: 1 } }, { multi: true },
                            function (err, num) {
                                if (err) {
                                    response = { "error": true, "message": err };
                                } else {
                                    newbookmark.save((err, bookmark) => {
                                        if (err) {
                                            response = { "error": true, "message": err };
                                            res.json(response);
                                        } else {
                                            response = { "error": false, "message": 'Bookmarks added successfully.' };
                                            res.json(response);
                                        }
                                    });
                                }
                            }
                        );
                    }
                    if (req.body.position == 'bottom') {
                        newbookmark.position = bookmarks[bookmarks.length - 1].position + 1;
                        newbookmark.save((err, bookmark) => {
                            if (err) {
                                response = { "error": true, "message": err };
                                res.json(response);
                            } else {
                                response = { "error": false, "message": 'Bookmarks added successfully.' };
                                res.json(response);
                            }
                        });
                    }
                }
                else {
                    newbookmark.position = 1;
                    newbookmark.save((err, bookmark) => {
                        if (err) {
                            response = { "error": true, "message": err };
                            res.json(response);
                        } else {
                            response = { "error": false, "message": 'Bookmarks added successfully.' };
                            res.json(response);
                        }
                    });
                }

            };
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

    // delete bookmark selected
    router.post('/delete-selected/', passport.authenticate('jwt', { session: false }), function (req, res) {
        var response = {};
        bookmarkModel.remove({ _id: { $in: req.body.ids } }, function (err, bookmark) {
            if (err) {
                response = { "error": true, "message": err };
            } else {
                response = { "error": false, "message": 'bookmark delete successfully.' };
            };
            res.json(response);
        });
    });

    // change position
    router.post('/change-position/', passport.authenticate('jwt', { session: false }), function (req, res) {
        var response = {};
        var position = req.body.position;
        var type = req.body.type;
        var bookmark_id = req.body.bookmark_id;
        var category_id = req.body.category_id;
        var secondValue;
        if (type == 'up') {
            secondValue = position - 1;
        }
        if (type == 'down') {
            secondValue = position + 1;
        }
        bookmarkModel.findOneAndUpdate({ position: secondValue, category_id: category_id }, { position: position }, function (err, bookmark) {

            if (err) {
                response = { "error": true, "message": err };
                res.json(response);
            } else {
                bookmarkModel.findOneAndUpdate({ _id: bookmark_id, category_id: category_id }, { position: secondValue }, function (err, bookmark) {
                    if (err) {
                        response = { "error": true, "message": err };
                        res.json(response);
                    } else {
                        response = { "error": false, "message": 'Position changed successfully.' };
                        res.json(response);
                    };
                });
            };
        });
    });

    /*-------------------------------END bookmark--------------------------------------------------------*/

    return router;
})();

