const EnquiryModel = require("../../models/enquiry.model");
const Sub_Category_Model = require("../../models/sub_category.model");
const UserModel = require("../../models/user.model");
require('dotenv').config();

async function PostEnquiryService(userID, productID, message, quantity) {
    try {
        const enquiryData = new EnquiryModel({ userID, productID, message, quantity });

        const user = await UserModel.findById(userID);
        const product = await Sub_Category_Model.findById(productID);
        const username = user.name;
        const phoneNumber = user.phoneNumber;
        const productName = product.name;
        // Save the enquiry data to the MongoDB database
        await enquiryData.save();

        const fetch = require('node-fetch');

        const url = 'https://api.brevo.com/v3/smtp/email';
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'api-key': process.env.brevo_api_key
            },
            body: JSON.stringify({
                sender: { name: 'FouressGroup', email: 'abhijeet@fouressgroup.com' },
                bcc: [{ email: 'abhi.bunnny@gmail.com', name: 'Fouress Group' }],
                htmlContent: `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                    <title>HTML + CSS</title>
                  </head>
                  <body>
                    <div style="margin-top: 20px; border: 1px solid #ddd; padding: 10px;">
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #ddd;">
                          <td style="padding: 8px; text-align: center;">Customer Name</td>
                          <td style="padding: 8px; text-align: center;">Phone Number</td>
                          <td style="padding: 8px; text-align: center;">Product Name</td>
                          <td style="padding: 8px; text-align: center;">Message</td>
                          <td style="padding: 8px; text-align: center;">Quantity</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #ddd;">
                          <td style="padding: 8px; text-align: center;">${username}</td>
                          <td style="padding: 8px; text-align: center;">${phoneNumber}</td>
                          <td style="padding: 8px; text-align: center;">${productName}</td>
                          <td style="padding: 8px; text-align: center;">${message}</td>
                          <td style="padding: 8px; text-align: center;">${quantity}</td>
                        </tr>
                      </table>
                    </div>
                  </body>
                </html>
                `,
                subject: `Enquiry request by ${username}.`
            })
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error('error:' + err));

        return {
            status: true,
            message: 'Your enquiry has been posted successfully.',
            data: enquiryData
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}


module.exports = PostEnquiryService;
