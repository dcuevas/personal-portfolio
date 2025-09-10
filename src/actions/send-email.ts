'use server';

import { Resend } from 'resend';

import { env } from '@/env.mjs';
import { TFormSchema } from '@/lib/form-schema';

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmailAction = async ({ email, message }: TFormSchema) => {
  try {
    await resend.emails.send({
      from: 'Dario Cuevas Site <onboarding@resend.dev>',
      to: 'dario.cuevas@gmail.com',
      subject: 'Message from contact form',
      replyTo: email,
      text: `email: ${email} \nmessage: ${message}`,
    });

    return {
      data: 'Email sent successfully!',
    };
  } catch {
    return {
      error: `Something went wrong!`,
    };
  }
};
