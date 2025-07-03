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
    const { companyName, country, fullName, email, message, solutionPageName } = await request.json();

    // Validate input
    if (!companyName || !fullName || !country || !email || !message) {
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
      subject: `New Contact Form Submission from ${companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 8px; background-color: #f9f9f9; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <h2 style="color: #111;">📩 New Contact Form Submission</h2>
    
          <p><strong>🏢 Company Name:</strong> ${companyName}</p>
          <p><strong>🌍 Country:</strong> ${country}</p>
          <p><strong>👤 Full Name:</strong> ${fullName}</p>
          <p><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #007BFF;">${email}</a></p>
    
          <p style="margin-top: 20px;"><strong>📝 Message:</strong></p>
          <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 6px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
    
          <p style="margin-top: 20px;"><strong>📄 Solution Page:</strong> ${solutionPageName}</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;">
          
          <p style="font-size: 14px; color: #777;">This message was sent via the <strong>${solutionPageName}</strong> solution page on <a href="${process.env.WEBSITE_URL}" target="_blank" style="color: #007BFF;">${process.env.WEBSITE_URL}</a></p>
        </div>
      `,
    };
    

    // Send email
    await transporter.sendMail(mailOptions);

    // Send auto-reply to user
    // const autoReplyOptions = {
    //   from: process.env.BREVO_FROM_EMAIL,
    //   to: email,
    //   subject: 'Thank you for contacting us',
    //   html: `
    //     <h2>Thank you for reaching out!</h2>
    //     <p>Dear ${fullName},</p>
    //     <p>We have received your message and will get back to you as soon as possible.</p>
    //     <p>Best regards,<br>Your Team</p>
    //   `,
    // };

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