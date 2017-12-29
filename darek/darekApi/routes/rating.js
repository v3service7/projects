var express = require('express');
var router = express.Router();

var ratingModel = require("../model/Rating.js");

router.get('/rating', function(req, res, next) {
    var response={};
    /*ratingModel.find({}, null, {sort: {created_at: 1}},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });*/
    ratingModel.aggregate(
    	[
	    	{
	    		$group:
	    		{
	    			_id: "$restaurantId",
	    			avgRating: { $avg: { $sum: "$rating" } },
	    			reviewCount: { $sum: 1 }
	    		}
	    	}
    	],function (err, result) {
	        if (err) {
	            next(err);
	        } else {
	            res.json(result);
	        }
	    }
    );
});

router.post('/rating',function(req, res){
    var response={};

    ratingModel.findOne({customerId:req.body.customerId , restaurantId:req.body.restaurantId },function(err,obj){
        if(err){
            response = {"error" : true,"message" : "Error fetching data"};
            return(res.json(response));
        }else{
            if (obj) {
                ratingModel.findByIdAndUpdate(obj._id, req.body, function(err, data) {
                    if(err) {
                        response = {"error" : true,"message" : err};
                    } else {
                        response = {"error" : false,"message" : "Data Update"};
                    }
                    return res.json(response);
                });
            }else{
                var rating = new ratingModel(req.body);
                rating.save(function(err,data){
                    if(err) {
                        response = {"error" : true,"message" : err};
                    } else {
                        response = {"error" : false,"message" : "Data Added"};
                    }
                    return res.json(response);
                });
            }
        }
    });
});

router.put('/rating/:id',function(req, res){
    var response={};
    ratingModel.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data Update"};
        }
        res.json(response);
    });
});

router.get('/rating/:id',function(req,res){
    var response={};
    ratingModel.find({restaurantId:req.params.id}).populate('restaurantId').populate('customerId').exec(function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });
});

router.delete('/rating/restaurant/:id',function(req,res){
    var response={};
    ratingModel.remove({restaurantId:req.params.id},function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : "Deleted Successfully"};
        }
        res.json(response);
    });
});

/*router.delete('/rating/:id',function(req,res){
    var response={};
    ratingModel.find(req.params.id,function(err,data){
        if (err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else{
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });
});*/




module.exports = router;