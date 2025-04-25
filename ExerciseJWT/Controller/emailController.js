import nodemailer from "nodemailer"

export const emailOp = async (req, res) => {  // Alterado de GET para POST
    const { email, code } = req.body;

    console.log("the email is "+email+" the code is "+code)

    if (!email || !code) {
        return res.status(400).send({ msg: "Email e código são obrigatórios!" });
    }

    try {
        await sendEmail(email, code);
        res.status(200).send({ msg: "E-mail enviado com sucesso!" });
    } catch (e) {
        console.error(e);
        res.status(400).send({ msg: "Erro ao enviar e-mail" });
    }
}


async function sendEmail(email, code) {
    let transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5aa8518c5ca455",
          pass: "550d009d3c68cc"
        }
      });

    let mailOptions = {
        from: "seuemail@gmail.com",
        to: email,
        subject: "Código de verificação",
        text: `Seu código é: ${code}`
    };

    try {
        let info = await transport.sendMail(mailOptions); // Agora usando await
        console.log("E-mail enviado:", info.response);
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        throw new Error("Erro ao enviar e-mail");
    }
}