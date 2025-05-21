import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedData = contactFormSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ message: 'Invalid form data.', errors: parsedData.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, email, subject, message } = parsedData.data;

    // In a real application, you would handle the data here, e.g.:
    // 1. Send an email using a service like SendGrid, Mailgun, AWS SES.
    //    (Requires API keys and setup, which is beyond this scope)
    //    Example: await sendEmail({ to: 'your-email@example.com', from: email, subject, text: message, html: `<p>${message}</p>` });
    // 2. Save the message to a database.
    // 3. Notify a Slack channel, etc.

    console.log('Contact form submission received:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);

    // Simulate successful processing
    return NextResponse.json({ message: 'Message received successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
