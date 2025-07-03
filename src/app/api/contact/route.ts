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
    const { name, email, project } = await request.json();

    // Validate input
    if (!name || !email || !project) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Configure email
    const mailOptions = {
      from: process.env.BREVO_FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 8px; background-color: #f9f9f9; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <h2 style="color: #111;">📩 New Contact Form Submission</h2>
          
          <p><strong>👤 Name:</strong> ${name}</p>
          <p><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #007BFF;">${email}</a></p>
    
          <p style="margin-top: 20px;"><strong>📝 Project Details:</strong></p>
          <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 6px;">
            ${project.replace(/\n/g, '<br>')}
          </div>
    
          <h3 style="margin-top: 30px; color: #111;">🔍 Additional Info</h3>
          <p>This message was sent via the contact form on <a href="${process.env.WEBSITE_URL}" target="_blank" style="color: #007BFF;">${process.env.WEBSITE_URL}</a></p>
        </div>
      `,
    };
    

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`Email sent successfully to ${process.env.ADMIN_EMAIL}`);

    // Send auto-reply to user
    const autoReplyOptions = {
      from: process.env.BREVO_FROM_EMAIL,
      to: email,
      subject: 'Thank you for contacting us. Figmenta Studio',
      html: `
        <h1>Thank you for contacting us. Figmenta Studio</h1>
        <h2>Thank you for reaching out!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Your Team</p>
      `,
    };

    // await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Error sending email' },
      { status: 500 }
    );
  }
} 