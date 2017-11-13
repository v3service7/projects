var nodemailer = require('nodemailer');
var ejs = require('ejs');
var randomstring = require("randomstring");

var emailFrom = 'sahal@vatfile.com';
//server-34
//var templateDir = '/home/nodeapp/account/email_template';

//server-54
var templateDir = '/home/ec2-user/vatfile/email_template';

//localhost
//var templateDir = '../api/email_template';

var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    auth: {
        user: "sahal@vatfile.com",
       pass: "Sahaldubai"
    }
});

module.exports = {

    emailTest: function() {
        var html = 'Hello test Mail'

        var options = {
            from: emailFrom,
            to: 'dharmendra@v3xperts.com',
            subject: 'Test mail',
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
            subject: 'Activate Account',
            html: html,
            text: 'text'
        };
        sendmail(options);
    },

    forgetEmailShoot: function(customer, type) {
        console.log(customer);
        if (type == 'cust') {
            customer['resetPassLink'] = 'http://sahal.vatfile.com/customer/reset-password/'+customer._id;
            /*customer['resetPassLink'] = 'http://localhost:4200/customer/reset-password/'+customer._id;*/
        }else{
            customer['resetPassLink'] = 'http://sahal.vatfile.com/admin/reset-password/'+customer._id;
            /*customer['resetPassLink'] = 'http://localhost:4200/admin/reset-password/'+customer._id;*/
        }

        console.log(customer);

        // rendering html template (same way can be done for subject, text)
        var html = ejs.renderFile(templateDir + '/forgetPassword.ejs', {customer : customer},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
                return data;
            });

        //build options
        var options = {
            from: emailFrom,
            to: customer.firstname + " <" + customer.email + " >",
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