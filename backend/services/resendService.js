import { Resend } from 'resend';
import RESEND_API_KEY from 'dotenv';

const resend = new Resend(RESEND_API_KEY);

const { data, error } = await resend.batch.send([
  {
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'Welcome to Acme',
    html: '<p>Thanks for signing up!</p>',
  },
  {
    from: 'Acme <onboarding@resend.dev>',
    to: ['delivered@resend.dev'],
    subject: 'Order Confirmation',
    html: '<p>Your order has been confirmed.</p>',
  },
]);

console.log(data);
