var functions = require('firebase-functions');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
var wrotedata;
exports.Pushtrigger = functions.database.ref('/panic/{panicId}').onWrite((event) => {
    wrotedata = event.after.val().panic;
    console.log("event", event.after.val());

    admin.database().ref('/drivers').once('value').then((alltokens) => {
        var rawtokens = alltokens.val();
        var tokens = [];
        processtokens(rawtokens).then((processedtokens) => {
            
            for (var token of processedtokens) {
                tokens.push(token.devtoken);
            }
        
        var payload = {
            
            "notification":{
                "title":"Patient Notification",
                "body":"Please attend Patient at " + wrotedata.userLocation.address,
                "sound":"default",
                },
            "data":{
                "sendername":"Patient Notification",
                "message":"Please attend Patient at " + wrotedata.userLocation.address,
                "panicID":wrotedata._id
            }
        }   

            return admin.messaging().sendToDevice(tokens, payload).then((response) => {
                console.log('Pushed notifications');
            }).catch((err) => {
                console.log(err);
            })    
            
        })    
    })
})

function processtokens(rawtokens) {
    var promise = new Promise((resolve, reject) => {
         var processedtokens = []
    for (var token in rawtokens) {
        processedtokens.push(rawtokens[token]);
    }
    resolve(processedtokens);
    })
    return promise;    
    
}