import nodemailer from "nodemailer";

export interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
}

interface Event {
    name: string;
    startingDate: string;
    url: string;
    price: number;
}

interface PotentialVisitors {
    username: string;
    email: string;

}

export async function sendEmails(event: Event, potentialVisitors: PotentialVisitors[]): Promise<ApiResponse> {
    const MAX_RECIPIENTS = 100;
    const MAX_CC = 50;
    const MAX_BCC = 50;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.APP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        // Split potentialVisitors into chunks
        const chunks: PotentialVisitors[][] = [];
        for (let i = 0; i < potentialVisitors.length; i += MAX_RECIPIENTS) {
            chunks.push(potentialVisitors.slice(i, i + MAX_RECIPIENTS));
        }

        // Send emails in chunks
        for (const chunk of chunks) {
            const to = chunk[0]?.email || '';
            const cc = chunk.slice(1, 1 + MAX_CC).map(u => u.email);
            const bcc = chunk.slice(1 + MAX_CC).map(u => u.email);

            const username = chunk[0]?.username || 'User';

            const htmlResponse = `
      <body style="height: 100vh; font-family: sans-serif; background-color: #f7f7f7; overflow-x: hidden; margin: 0; padding: 0; color: #333; display: flex; justify-content: center; align-items: center;">
        <div style="font-family: Helvetica, Arial, sans-serif; max-width: 800px; overflow-x: hidden; line-height: 2; width: 90%; min-width: 280px; margin: 50px auto; padding: 20px; background: #fff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 8px;">
          <div style="margin: 50px auto; width: 100%; max-width: 600px; padding: 20px 0;">
            <div style="user-select: none; border-bottom: 1px solid #eee;">
              <a href="http://localhost:3000" style="user-select: none; font-size: 1.4em; color: #60d3ea; text-decoration: none; font-weight: 600;">Yatra</a>
            </div>
            <p style="user-select: none; font-size: 2em; display: inline-block;">Hello, <span style="border-bottom: 2px solid #60d3ea; display: inline-block;">${username}</span></p>
            <p style="user-select: none;">It's a pleasure to inform you that a event of <span style="color: #60d3ea; text-decoration: none;">${event.name}</span> going to be conducted at ${event.startingDate} ! Feel free to attend the event at your ease. Here's the link to the event: </p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="http://localhost:3000/${event.url}">${event.url}</a>
            </div>
            <p style="user-select: none; font-size: 0.9em;">Warm Regards,</p>
            <p style="user-select: none; font-size: 0.9em;">Yatra</p>
            <hr style="user-select: none; border: none; border-top: 1px solid #eee;" />
            <div style="user-select: none; float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300;">
              <p>&copy; 2024 Yatra. All rights reserved.</p>
              <p>Rupandehi, Nepal</p>
            </div>
          </div>
        </div>
      </body>
      `;

            const mailOptions = {
                from: {
                    name: "Yatra",
                    address: process.env.USER || '',
                },
                to,
                cc,
                bcc,
                subject: `Yatra Event: ${event.name}`,
                text: `Hello, ${username}!\n\nYou're invited to the event: ${event.name} on ${event.startingDate}. Visit: http://localhost:3000/${event.url}`,
                html: htmlResponse,
            };

            try {
                await transporter.sendMail(mailOptions);
            } catch (error) {
                console.error("Error sending verification email", error);
                return { success: false, message: "Failed to send verification email to some users." };
            }
        }
        return {
            success: true,
            message: "Verification emails sent successfully.",
        };
    } catch (error) {
        console.error("Error setting up transporter", error);
        return { success: false, message: "Failed to set up email transporter." };
    }
}