// pages/api/subscribe.js
import mailgun from 'mailgun-js';

// Mailgun yapılandırmasını yapın
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;

        const data = {
            from: 'melikbilyay@hotmail.com', // Mailgun'da doğrulanmış e-posta adresi
            to: email,
            subject: 'Thank You for Subscribing!',
            text: 'Thank you for subscribing to our newsletter! We appreciate your interest.',
        };

        try {
            await mg.messages().send(data);
            res.status(200).json({ message: 'Subscription successful!' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to send email.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
