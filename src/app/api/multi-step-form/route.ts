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
    const formData = await request.formData();
    const fullName = formData.get("fullName") as string;
    const companyName = formData.get("companyName") as string;
    const aboutProject = formData.get("aboutProject") as string;
    const arrangeCall = formData.get("arrangeCall") as string;
    const files = formData.getAll('files') as File[];
    const answers = JSON.parse(formData.get("answers") as string);
    const totalPrice = formData.get("totalPrice") as string;

    // Prepare attachments if any files were uploaded
    const attachments = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return {
          filename: file.name,
          content: buffer,
        };
      })
    );

    // Format answers for email
    const formattedAnswers = answers.map((answer: any, index: number) => `
      Step ${index + 1}: ${answer.stepName}
      Answer: ${answer.answerText}
      ${answer.price ? `Price: $${answer.price}` : ""}
    `).join("\n");

    // Create email content
    const emailContent = `
      New Project Request from Multi-Step Calculator
      
      Client Details:
      Full Name: ${fullName}
      Company Name: ${companyName}
      About Project: ${aboutProject}
      Arrange Call: ${arrangeCall}
      
      Calculator Selections:
      ${formattedAnswers}
      
      Total Price: $${totalPrice}
    `;

    // Send email using Brevo
    const mailOptions = {
      from: process.env.BREVO_FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      replyTo: fullName,
      subject: `New Project Request from ${fullName} - ${companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 8px; background-color: #f9f9f9; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <h2 style="color: #111;">📩 New Contact Form Submission</h2>
          
          <p><strong>👤 Name:</strong> ${fullName}</p>
          <p><strong>📧 Email:</strong> <a href="mailto:${fullName}" style="color: #007BFF;">${fullName}</a></p>
    
          <p style="margin-top: 20px;"><strong>📝 Project Details:</strong></p>
          <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 6px;">
            ${aboutProject.replace(/\n/g, '<br>')}
          </div>

          <p style="margin-top: 20px;"><strong>📝 Calculator Selections:</strong></p>
          <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 6px;">
            ${formattedAnswers.replace(/\n/g, '<br>')}
          </div>

          <p style="margin-top: 20px;"><strong>📝 Total Price:</strong></p>
          <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 6px;">
            $${totalPrice}
          </div>

          <h3 style="margin-top: 30px; color: #111;">🔍 Additional Info</h3>
          <p>This message was sent via multi-step form on <a href="${process.env.WEBSITE_URL}" target="_blank" style="color: #007BFF;">${process.env.WEBSITE_URL}</a></p>
        </div>
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
