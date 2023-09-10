const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()
var inlineBase64 = require('nodemailer-plugin-inline-base64');

function formatMoneyVND(number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
    });
    const formattedNumber = formatter.format(number).trim();
    return formattedNumber;
}

const sendEmailCreateOrder = async (email, orderItems) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_ACCOUNT, // generated ethereal user
            pass: process.env.MAIL_PASSWORD, // generated ethereal password
        },
    });
    transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));

    let listItem = '';
    const attachImage = []
    orderItems.forEach((order) => {
        listItem += `<div>
                        <div>
                            Sản phẩm: <b>${order.name}</b><br>
                            Số lượng: <b>${order.amount}</b><br>
                            Giá: <b>${formatMoneyVND(order.price)} VND</b>
                        </div>
                        <div>Bên dưới là hình ảnh của sản phẩm</div>
                    </div>`
        attachImage.push({ path: order.image })
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: email, // list of receivers
        subject: "ĐẶT HÀNG THÀNH CÔNG", // Subject line
        text: "Thank for you pace order?", // plain text body
        html: `<div><b>Thông tin chi tiết</b></div> ${listItem}`,
        attachments: attachImage,
    });
}

module.exports = {
    sendEmailCreateOrder
}