var nodemailer = require('nodemailer');
var ejs = require('ejs');

// email 
var emailFrom = 'maarora@gmail.com';
var templateDir = __dirname + '/email_template';

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
});
module.exports = {
    emailShoot: function(emailTo, name, token) {

        // rendering html template (same way can be done for subject, text)		
        var html = ejs.renderFile(templateDir+'/register.ejs',{ name: name,token: token,siteUrl:siteUrl },
            function(err, data) {
                if (err) {
                    console.log(err);
                }
                //build options
                var options = {
                    from: emailFrom,
                    to: emailTo,
                    subject: 'Email Activation Link',
                    html: data,
                    text: 'text'
                };
                sendmail(options);
                return data;
            });
    },

    forgetEmailShoot: function(user) {
        if(user.role=='Admin')
        {
            user['resetPassLink'] = siteUrl + 'admin/resetpassword/'+user._id;
        }
        else
        {
            user['resetPassLink'] = siteUrl + 'admin/resetpassword/'+user._id;
        }
    
        // rendering html template (same way can be done for subject, text)
        var html = ejs.renderFile(templateDir + '/forgetPassword.ejs', {user : user},
            function(err, data) {
                if (err) {
                    console.log(err);
                }
                //build options
                var options = {
                    from: emailFrom,
                    to: user.email,
                    subject: 'Reset Password',
                    html: data,
                    text: 'text'
                };
                sendmail(options);
                return data;
            });        
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