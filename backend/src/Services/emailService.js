const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"Cineverse Cinema" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Mã OTP Đặt Lại Mật Khẩu - Cineverse",
    text: `Mã OTP đặt lại mật khẩu Cineverse của bạn là: ${otp}. Mã có hiệu lực trong 5 phút. Vui lòng không chia sẻ mã này cho bất kỳ ai.`,
    headers: {
      "X-Priority": "1 (Highest)",
      "X-MSMail-Priority": "High",
      Importance: "High",
    },
    html: `
      <div style="background:#0b0c10; padding:32px; color:#ffffff; font-family:monospace; border-radius:12px; max-width:480px; margin:0 auto; border:1px solid #222;">
        <h2 style="color:#fbbf24; font-size:24px; margin-top:0; letter-spacing:2px;">CINE<span style="color:#fff;">VERSE</span></h2>
        <p style="color:#ccc; font-size:14px; margin-top:12px;">Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản Cineverse.</p>
        <p style="color:#888; font-size:12px; margin-top:20px; text-transform:uppercase; letter-spacing:1px;">MÃ OTP XÁC THỰC CỦA BẠN:</p>
        <div style="background:#15161b; padding:16px; border-radius:8px; text-align:center; border:1px solid rgba(251,191,36,0.3); margin:16px 0;">
          <span style="font-size:36px; font-weight:bold; letter-spacing:8px; color:#fbbf24;">${otp}</span>
        </div>
        <p style="color:#888; font-size:12px;">Mã có hiệu lực trong <b>5 phút</b>. Vui lòng không chia sẻ mã này cho bất kỳ ai.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendOTPEmail,
};
