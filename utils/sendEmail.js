const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    // إعداد النقل (Transporter)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // يمكنك استخدام خدمات أخرى مثل Outlook أو SMTP مخصص
      auth: {
        user: process.env.EMAIL_USER, // بريدك الإلكتروني
        pass: process.env.EMAIL_PASS, // كلمة المرور أو App Password
      },
    });

    // إعداد الرسالة
    const mailOptions = {
      from: process.env.EMAIL_USER, // البريد المرسل منه
      to, // البريد المرسل إليه
      subject, // عنوان الرسالة
      text, // نص الرسالة
    };

    // إرسال البريد الإلكتروني
    await transporter.sendMail(mailOptions);
    console.log('✅ تم إرسال البريد الإلكتروني بنجاح');
  } catch (err) {
    console.error('❌ حصلت مشكلة أثناء إرسال البريد الإلكتروني:', err);
  }
};

module.exports = sendEmail;