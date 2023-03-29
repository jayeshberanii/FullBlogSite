const emailjs= require("@emailjs/browser");


var templateParams = {
    name: 'James',
    message: 'Check this out!'
};
 
emailjs.send('service_7toysxb', 'template_uctg68m', templateParams,'uY_6lBoJ9xqdDjI8B')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });