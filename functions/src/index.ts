import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import * as nodemailer from "nodemailer";

// Initialize Firebase Admin
initializeApp();

// Access environment variables
const gmailUser = functions.config().gmail.user;
const gmailPass = functions.config().gmail.pass;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: gmailUser,
    pass: gmailPass,
  },
});

// Define the Cloud Function
export const sendWelcomeEmail = functions.firestore
  .document("subscribers/{subscriberId}")
  .onCreate(async (snap, context) => {
    const email = snap.data()?.email;
    if (!email) {
      console.error("No email found in document");
      return;
    }

    const mailOptions = {
      from: gmailUser,
      to: email,
      subject: "Thank you for subscribing!",
      text: "Thank you for subscribing to CeRRoute!" +
          " We will keep you updated with the latest news.",
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });
