var nodemailer = require('nodemailer');
var ejs = require('ejs');
var randomstring = require("randomstring");

var emailFrom = 'this@company.com';
/*var templateDir = '/home/nodeapp/account/email_template';*/
var templateDir = '../api/email_template';
var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "derekitchen@gmail.com",
        pass: "derekitchen123"
    }
});

module.exports = {

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
        if (type == 'cust') {
            /*customer['resetPassLink'] = 'http://34.209.114.118:4021/customers/reset-password/'+customer._id;*/
            customer['resetPassLink'] = 'http://localhost:4200/customer/reset-password/'+customer._id;
        }else{
            /*customer['resetPassLink'] = 'http://34.209.114.118:4021/admin/reset-password/'+customer._id;*/
            customer['resetPassLink'] = 'http://localhost:4200/admin/reset-password/'+customer._id;
        }

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