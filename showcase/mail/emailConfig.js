var nodemailer = require('nodemailer');
var ejs = require('ejs');
var randomstring = require("randomstring");

// email 
var emailFrom = 'Showcasesocial@gmail.com';
var templateDir = __dirname + '/email_template';
/*var transporter = nodemailer.createTransport({
     service: 'gmail',
    port: 443,
    options: {
      debug: true,
    },
    auth: {
        user: "navaidkitchen@gmail.com",
        pass: "navaidkitchennavaidkitchen"
    } 
});
*/
let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
});
module.exports = {
    emailTest: function(emailTo, username) {
        var html = ejs.renderFile(templateDir + '/register.ejs', { username: username, token: '654654654trdt' },
            function(err, data) {
                if (err) {
                    console.log(err);
                }
                return data;
            });

        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'ShowCase Register Email Activate Link',
            html: html,
            text: 'text'
        };
        sendmail(options);
    },
    emailShoot: function(emailTo, username, token) {

        // rendering html template (same way can be done for subject, text)
        var html = ejs.renderFile(templateDir + '/register.ejs', { username: username, token: token },
            function(err, data) {
                if (err) {
                    console.log(err);
                }
                return data;
            });

        //build options
        var options = {
            from: emailFrom,
            to: emailTo,
            subject: 'ShowCase Register Email Activate Link',
            html: html,
            text: 'text'
        };
        sendmail(options);
    },

    forgetEmailShoot: function(user) {
        if(user.role=='Admin')
        {
            user['resetPassLink'] = siteUrl + 'admin/resetpassword/'+user._id;
            //user['resetPassLink'] = 'https://localhost:4200/admin/resetpassword/'+user._id;
        }
        else
        {
            user['resetPassLink'] = siteUrl + 'resetpassword/'+user._id;
            //user['resetPassLink'] = 'https://localhost:4200/resetpassword/'+user._id;
        }
    
        // rendering html template (same way can be done for subject, text)
        var html = ejs.renderFile(templateDir + '/forgetPassword.ejs', {user : user},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
                return data;
            });

        //build options
        var options = {
            from: emailFrom,
            to: user.firstname + " <" + user.email + " >",
            subject: 'Reset Password',
            html: html,
            text: 'text'
        };
        sendmail(options);
        
    }
};

function sendmail(options){
    transporter.sendMail(options, function(error, info) {
        if (error) {
            console.log('Message not sent');
            console.log(error);
            return false;
        } else {
            console.log('Message sent Successfully !!!');
            return true;
        };
    });
}