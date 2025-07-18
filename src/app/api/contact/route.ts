import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create transporter outside request handler for reuse
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const data = await request.json();
    const {
      title,
      firstName,
      lastName,
      email,
      phone,
      country,
      privacyPolicy,
      newsletter,
      marketing,
    } = data;

    // Configure email to admin
    const mailOptions = {
      from: process.env.BREVO_FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New Newsletter Subscription from ${firstName} ${lastName}`,
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Consents:</strong></p>
        <ul>
          <li>Privacy Policy: ${privacyPolicy ? 'Yes' : 'No'}</li>
          <li>Newsletter: ${newsletter ? 'Yes' : 'No'}</li>
          <li>Marketing: ${marketing ? 'Yes' : 'No'}</li>
        </ul>
      `,
    };

    // Send email to admin
    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const autoReplyOptions = {
      from: process.env.BREVO_FROM_EMAIL,
      to: email,
      subject: 'Thank you for subscribing to Laura Biagiotti Newsletter',
      html: `
        <h2>Thank you for subscribing!</h2>
        <p>Dear ${title} ${firstName} ${lastName},</p>
        <p>Thank you for subscribing to our newsletter. We're excited to keep you updated with our latest news, products, and special offers.</p>
        <p>Your subscription preferences:</p>
        <ul>
          ${newsletter ? '<li>Newsletter updates</li>' : ''}
          ${marketing ? '<li>Marketing communications</li>' : ''}
        </ul>
        <p>If you need to update your preferences or have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>Laura Biagiotti Team</p>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { message: 'Newsletter subscription successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    return NextResponse.json(
      { message: 'Error processing newsletter subscription' },
      { status: 500 }
    );
  }
} 