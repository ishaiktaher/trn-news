const nodemailer = require("nodemailer");

exports.sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use 'smtp.mailtrap.io' for dev
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "contact@trn.com", // your business email
      subject: "New Contact Message",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    res.status(200).json({ msg: "Email sent" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to send email", error: err.message });
  }
};
