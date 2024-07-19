import Mailgun from 'mailgun-js';

const formData = require('form-data');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'bb4119a3f3cfb5e642b0b08286fac45a-91fbbdba-949c497a'});

mg.messages.create('sandbox-123.mailgun.org', {
    from: "Excited User <mailgun@sandboxf41aff1b5ffd49e883d5371612c3cfc2.mailgun.org>",
    to: ["bilyaymelik@gmail.com",],
    subject: "Hello",
    text: "Testing some Mailgun awesomeness!",
    html: "<h1>Testing some Mailgun awesomeness!</h1>"
})
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.log(err)); // logs any error
