const { clientUrl, serverUrl } = require("./url.util");

const emailPage = (title, message, description, code, token, userId, action) => {
    return (
        `
        <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        @media screen {
            @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 400;
                src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
            }
            @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 700;
                src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
            }
        }
        body,
        table,
        td,
        a {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }
        table,
        td {
            mso-table-rspace: 0pt;
            mso-table-lspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
        }
        a[x-apple-data-detectors] {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
        }
        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }
        body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
        }
        table {
            border-collapse: collapse !important;
        }
        a {
            color: #1a82e2;
        }
        img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
        }
    </style>
</head>
<body style="background-color: #e9ecef;">

    <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        ${description}
       
    </div>

    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" bgcolor="#e9ecef">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" valign="top" style="padding: 36px 24px;">
                            <img src="https://neonize.gumlet.io/wp-content/uploads/2022/08/Shopping-Cart_light.jpg" alt="Logo" border="0" width="64" style="display: block; width: 64px;border-radius:50%; max-width: 64px; min-width: 64px;">
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr>
            <td align="center" bgcolor="#e9ecef">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                            <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">${title}</h1>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr>
            <td align="center" bgcolor="#e9ecef">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0 auto;text-align: center;">${description}</p>
                        </td>
                    </tr>
                ${action !== "reset" ? `<tr>
            <td align="center" bgcolor="#ffffff" style="padding: 24px;">
                <h2 style="margin: 0; font-size: 24px; font-weight: 700;">${message}</h2>
                <h1 style="margin: 15px 0 0; font-size: 32px; font-weight: 700;letter-spacing:10px;">${code}</h1>
            </td>
        </tr>` : ""
        }
                  <tr>
                        <td align="left" bgcolor="#ffffff">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center" bgcolor="#003d29" style="border-radius: 6px;">
                                                    <a href="${serverUrl}/${action === "verify " ? "auth/verify" : action === "reset" ? "/auth/resetpassword" : ""}?token=${token}&userId=${userId}" target="_blank" style="display: inline-block; padding: 16px 40px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Auto Verify</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                            <p style="margin: 0; word-wrap: break-word;"><a href="${serverUrl}/${action === "verify " ? "auth/verify" : action === "reset" ? "/auth/resetpassword" : ""}?token=${token}&userId=${userId}" target="_blank">${serverUrl}/${action === "verify " ? "auth/verify" : action === "reset" ? "/auth/resetpassword" : ""}?token=${token}&userId=${userId}</a></p>
                        </td>
                    </tr>

                    <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                            <p style="margin: 0;">Cheers,<br> DevalShoppingCart</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>

        <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                            <p style="margin: 0;">You received this email because we received a ${action === "verify " ? "sign up " : action === "reset" ? "password reset" : ""} request for your account. If you didn't request for ${action === "verify " ? "sign up " : action === "reset" ? "password reset" : ""} , you can safely delete this email.</p>
                            <p style="margin: 0;">Don't publicly share the code in this email</p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                            <p style="margin: 0;">To stop receiving these emails, you can <a href="${clientUrl}/unsubscribe" target="_blank">unsubscribe</a> at any time.</p>
                            <p style="margin: 0;">DevalShoppingCart, Nairobi Kenya</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>

    </table>

</body>
</html>
        `
    );
};

module.exports = emailPage