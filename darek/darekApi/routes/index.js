var express = require('express');
var router = express.Router();
var countryModel  =  require("../model/Country.js");
var stateModel  =  require("../model/State.js");
var cityModel  =  require("../model/City.js");
var ownerModel  =  require("../model/Owner.js");
var deliveryZone = require("../model/DeliveryZone.js");
var kitchenMenuModel  =  require("../model/Kitchenmenu.js");
var itemModel  =  require("../model/Item.js");
var addOnModel  =  require("../model/addon.js");
var languageModel  =  require("../model/Language.js");



/*-------------------------------START LANGUAGE--------------------------------------------------------*/

router.get('/language', function(req, res, next) {
	/*if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }*/
	var response={};
	languageModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/language',function(req, res){
	/*if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }*/
	var response={};
    var languageModelObj = new languageModel(req.body);
    languageModelObj.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/language/:id',function(req, res){
	/*if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }*/
	var response={};
	languageModel.findByIdAndUpdate(req.params.id, req.body, function(err, languageModelObj) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/language/:id',function(req,res){
	/*if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }*/
	var response={};
	console.log(req.params.id);
	languageModel.findById(req.params.id,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/language/:id',function(req,res){
	/*if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }*/
	var response={};
	console.log(req.params.id);
	languageModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});


/*-------------------------------END LANGUAGE--------------------------------------------------------*/


/*-------------------------------START DELIVERY ZONE--------------------------------------------------------*/

router.get('/deliveryzones/:id', function(req, res, next) {
	/*if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }*/
	var response={};
	deliveryZone.find({restaurantId: req.params.id}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/deliveryzone',function(req, res){
	/*if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }*/
	var response={};
    var deliveryZoneObj = new deliveryZone(req.body);
    deliveryZoneObj.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/deliveryzone/:id',function(req, res){
	/*if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }*/
	var response={};
	deliveryZone.findByIdAndUpdate(req.params.id, req.body, function(err, deliveryZoneObj) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/deliveryzone/:id',function(req,res){
	/*if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }*/
	var response={};
	console.log(req.params.id);
	deliveryZone.findById(req.params.id,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/deliveryzone/:id',function(req,res){
	/*if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }*/
	var response={};
	console.log(req.params.id);
	deliveryZone.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});


/*-------------------------------END DELIVERY ZONE--------------------------------------------------------*/







/*-------------------------------START COUNTRY--------------------------------------------------------*/

router.get('/country', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	countryModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/country',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var country = new countryModel(req.body);
    country.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/country/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	countryModel.findByIdAndUpdate(req.params.id, req.body, function(err, country) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/country/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	countryModel.findById(req.params.id,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/country/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	countryModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END COUNTRY--------------------------------------------------------*/

/*-------------------------------START STATE--------------------------------------------------------*/
router.get('/state', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	stateModel.find({}).populate('countryId').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/state',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var state = new stateModel(req.body);
    state.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/state/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	stateModel.findByIdAndUpdate(req.params.id, req.body, function(err, state) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/state/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	stateModel.findById(req.params.id).populate('countryId').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/state/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	stateModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END STATE--------------------------------------------------------*/

/*-------------------------------START CITY--------------------------------------------------------*/
router.get('/city', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	cityModel.find({}).populate('countryId').populate('stateId').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/city',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var city = new cityModel(req.body);
    city.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/city/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	cityModel.findByIdAndUpdate(req.params.id, req.body, function(err, city) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/city/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	cityModel.findById(req.params.id).populate('countryId').populate('stateId').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/city/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	cityModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});

/*-------------------------------END CITY--------------------------------------------------------*/

/*-------------------------------START CITY--------------------------------------------------------*/
router.get('/owner', function(req, res, next) {
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	ownerModel.find({}).populate('countryId').populate('stateId').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/owner',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
    var owner = new ownerModel(req.body);
    owner.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/owner/:id',function(req, res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	ownerModel.findByIdAndUpdate(req.params.id, req.body, function(err, owner) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/owner/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	ownerModel.findById(req.params.id).populate('countryId').populate('stateId').exec(function (err, data) {
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/owner/:id',function(req,res){
	if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false,
            message:'Access Denied'
        });
    }
	var response={};
	console.log(req.params.id);
	ownerModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});

/*-------------------------------END CITY--------------------------------------------------------*/


/*-------------------------------START MENU--------------------------------------------------------*/

router.get('/menu', function(req, res, next) {
	var response={};
	kitchenMenuModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.get('/menu-list/:id', function(req, res, next) {
	var response={};
	kitchenMenuModel.find({kitchenId : req.params.id}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/menu',function(req, res){
	var response={};
    var menu = new kitchenMenuModel(req.body);
    menu.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/menu/:id',function(req, res){
	var response={};
	kitchenMenuModel.findByIdAndUpdate(req.params.id, req.body, function(err, menu) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/menu/:id',function(req,res){
	var response={};
	console.log(req.params.id);
	kitchenMenuModel.findById(req.params.id,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/menu/:id',function(req,res){
	var response={};	
	kitchenMenuModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});
/*-------------------------------END MENU--------------------------------------------------------*/

/*-------------------------------START ITEM--------------------------------------------------------*/

router.get('/item', function(req, res, next) {
	var response={};
	itemModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.post('/item',function(req, res){
	var response={};
	console.log(req.body);
    var item = new itemModel(req.body);    
    item.save(function(err){
    	console.log(err);
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/item/:id',function(req, res){
	var response={};
	itemModel.findByIdAndUpdate(req.params.id, req.body, function(err, item) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/item/:id',function(req,res){
	var response={};
	itemModel.findById(req.params.id,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/item/:id',function(req,res){
	var response={};	
	itemModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});


router.put('/itemaddon/:id',function(req, res){
	var response={};	
	itemModel.findById({"_id": req.params.id}, function(err, doc){		
		doc.multisize.push({size: req.body.multisize.size, price : req.body.multisize.price});
		doc.save(function(err, item){
			if(err) {
				response = {"error" : true,"message" : err};
			} else {
				response = {"error" : false,"message" : "Data Update"};
			}			
			res.json(response);
		});
	});	
});


router.delete('/itemaddon/:id/:index',function(req, res){
	var response={};	
	itemModel.findById({"_id": req.params.id }, function(err, doc){			
        doc.multisize.splice(req.params.index, 1);
		doc.save(function(err, item){
			if(err) {
				response = {"error" : true,"message" : err};
			} else {
				response = {"error" : false,"message" : "Data Update"};
			}			
			res.json(response);
		});
	});
});


router.get('/itemaddon/:addonid/:id',function(req, res){
	var response={};	
	itemModel.findOne({"_id": req.params.id},{"multisize" : { $elemMatch : { "_id": req.params.addonid }}}, function(err, data){		
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});
});


router.put('/itemaddonedit/:id',function(req, res){
	var response={};
	itemModel.update({"_id": req.params.id, 'multisize._id': req.body.id}, {'$set': {
		'multisize.$.size': req.body.size,
		'multisize.$.price': req.body.price
	    }}, function(err, data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});

});

/*-------------------------------END ITEM--------------------------------------------------------*/



/*-------------------------------START ITEM--------------------------------------------------------*/

router.get('/addon', function(req, res, next) {
	var response={};
	addOnModel.find({}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.get('/addon-list/:id', function(req, res, next) {
	var response={};
	addOnModel.find({restaurantId : req.params.id}, null, {sort: {created_at: 1}},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});


router.post('/addon',function(req, res){
	var response={};
    var item = new addOnModel(req.body);
    item.save(function(err){
    	if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
});

router.put('/addon/:id',function(req, res){
	var response={};
	addOnModel.findByIdAndUpdate(req.params.id, req.body, function(err, item) {
	    	if(err) {
	            response = {"error" : true,"message" : err};
	        } else {
	            response = {"error" : false,"message" : "Data Update"};
	        }
	        res.json(response);
        });
});

router.get('/addon/:id',function(req,res){
	var response={};	
	addOnModel.findById(req.params.id,function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});	
});

router.delete('/addon/:id',function(req,res){
	var response={};	
	addOnModel.remove({_id:req.params.id},function(err,data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : "Deleted Successfully"};
		};
		res.json(response);
	});	
});

router.put('/addonchoice/:id',function(req, res){
	var response={};
	addOnModel.findById({"_id": req.params.id}, function(err, doc){		
		doc.subaddon.push({name: req.body.name, price : req.body.price});
		doc.save(function(err, item){
			if(err) {
				response = {"error" : true,"message" : err};
			} else {
				response = {"error" : false,"message" : "Data Update"};
			}			
			res.json(response);
		});
	});
});

router.delete('/addonchoice/:index/:id',function(req, res){	
	var response={};	
	addOnModel.findById({"_id": req.params.id}, function(err, doc){			
        doc.subaddon.splice(req.params.index, 1);
		doc.save(function(err, item){
			if(err) {
				response = {"error" : true,"message" : err};
			} else {
				response = {"error" : false,"message" : "Data Update"};
			}			
			res.json(response);
		});
	});
});


router.get('/addonchoice/:id/:subaddonid',function(req, res){
	var response={};	
	addOnModel.findOne({"_id": req.params.id},{"subaddon" : { $elemMatch : { "_id": req.params.subaddonid }}}, function(err, data){		
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});
});


router.put('/addonchoiceedit/:id',function(req, res){	
	var response={};
	addOnModel.update({"_id": req.params.id, 'subaddon._id': req.body.id}, {'$set': {
		'subaddon.$.name': req.body.name,
		'subaddon.$.price': req.body.price
	    }}, function(err, data){
		if (err) {
			response = {"error" : true,"message" : "Error fetching data"};
		} else{
			response = {"error" : false,"message" : data};
		};
		res.json(response);
	});

});

module.exports = router;
