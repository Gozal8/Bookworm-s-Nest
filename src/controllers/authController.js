import crypto from 'crypto';
import { fetchData } from '../utils/fetchData.js';
import { sendEmail } from '../utils/Email.js';

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(20).toString('hex');

  const user = await fetchData('SELECT * FROM users WHERE email = $1', email);

  if (user.length === 0) {
    return res.status(404).send({ message: 'Foydalanuvchi topilmadi' });
  }


  await fetchData('UPDATE users SET reset_token = $1 WHERE email = $2', token, email);

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  await sendEmail(email, 'Parolni tiklash', `Parolni tiklash uchun iltimos quyidagi linkka o'ting: ${resetUrl}`);

  res.send({ message: 'Parolni tiklash sorovi yuborildi. Emailingizni tekshiring.' });
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await fetchData('SELECT * FROM users WHERE reset_token = $1', token);

  if (user.length === 0) {  
    return res.status(400).send({ message: 'Notogri yoki muddati otgan token' });
  }

  await fetchData('UPDATE users SET password = $1, reset_token = NULL WHERE reset_token = $2', newPassword, token);

  res.send({ message: 'Parol muvaffaqiyatli ozgartirildi.' });
};
