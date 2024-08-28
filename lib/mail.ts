import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY as string);
const domain = process.env.NEXT_PUBLIC_APP_URL as string;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    text: `Click the link below to verify your email: ${confirmLink}`,
    html: `<p>Click <a href="${confirmLink}">Verify Email</a> to confirm your email</p>`,
  });
};
export const sendForgetPasswordEmail = async (email: string, token: string) => {
  const forgetPasswordLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    text: `Click the link below to verify your email: ${forgetPasswordLink}`,
    html: `<p>Click <a href="${forgetPasswordLink}">reset Email</a> to reset your password</p>`,
  });
};
