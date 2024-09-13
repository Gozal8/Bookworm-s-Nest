import nodemailer from 'nodemailer';

// Email yuborish uchun konfiguratsiya
const transporter = nodemailer.createTransport({
  service: 'gmail', // O'zingizning email xizmatingizni tanlang
  auth: {
    user: process.env.EMAIL_USER, // Email manzilingiz
    pass: process.env.EMAIL_PASS  // Email parolingiz
  }
});

export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });
  } catch (error) {
    console.error('Email yuborishda xatolik:', error);
  }
};
