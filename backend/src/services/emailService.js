const axios = require("axios");

const sendOTPEmail = async (email, otp) => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("Missing BREVO_API_KEY in environment variables");
  }

  const payload = {
    sender: {
      name: "Cineverse App",
      email: process.env.EMAIL_USER || "Cineverse363636@gmail.com",
    },
    to: [{ email }],
    subject: `[Cineverse] Mã xác thực OTP của bạn là: ${otp}`,
    textContent: `Mã OTP đặt lại mật khẩu Cineverse của bạn là: ${otp}. Mã có hiệu lực trong 5 phút. Vui lòng không chia sẻ mã này cho bất kỳ ai.`,
    htmlContent: `
      <div style="background:#0b0c10; padding:32px; color:#ffffff; font-family:monospace; border-radius:12px; max-width:480px; margin:0 auto; border:1px solid #222;">
        <h2 style="color:#fbbf24; font-size:24px; margin-top:0; letter-spacing:2px;">CINE<span style="color:#fff;">VERSE</span></h2>
        <p style="color:#ccc; font-size:14px; margin-top:12px;">Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản Cineverse.</p>
        <p style="color:#888; font-size:12px; margin-top:20px; text-transform:uppercase; letter-spacing:1px;">MÃ OTP XÁC THỰC CỦA BẠN:</p>
        <div style="background:#15161b; padding:16px; border-radius:8px; text-align:center; border:1px solid rgba(251,191,36,0.3); margin:16px 0;">
          <span style="font-size:36px; font-weight:bold; letter-spacing:8px; color:#fbbf24;">${otp}</span>
        </div>
        <p style="color:#888; font-size:12px;">Mã có hiệu lực trong <b>5 phút</b>. Vui lòng không chia sẻ mã này cho bất kỳ ai.</p>
        <hr style="border:none; border-top:1px solid #222; margin:20px 0;" />
        <p style="color:#555; font-size:10px; margin:0;">Email tự động từ hệ thống Cineverse. Vui lòng không phản hồi email này.</p>
      </div>
    `,
  };

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      payload,
      {
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      },
    );
    return response.data;
  } catch (error) {
    console.error("🔥 [Brevo Error]:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Không thể gửi email OTP qua Brevo",
    );
  }
};

module.exports = {
  sendOTPEmail,
};
