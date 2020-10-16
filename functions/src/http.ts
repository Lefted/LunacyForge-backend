import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express';
const axios = require('axios');

admin.initializeApp();
const app = express();

export const api = functions.https.onRequest(app);

app.use('/post', validateRequest);

// test endpoint
app.post('/post/cat', function (req, res) {
    res.send('Cat');
});

async function validateRequest(request, response, next) {
    const id = request.body.id;
    const request_id = request.body.request_id;
    const request_secret = request.body.request_secret;
    const code = request.body.code;

    if (!id) {
        response.status(400).send("id undefined");
        return;
    } else if (!request_id) {
        response.status(400).send("request_id undefined");
        return;
    } else if (!request_secret) {
        response.status(400).send("request_secret undefined");
        return;
    } else if (!code) {
        response.status(400).send("code undefined");
        return;
    }

    // perform request to minecraft.id
    try {

        const data = JSON.stringify({
            id: id,
            request_id: request_id,
            request_secret: request_secret,
            code: code
        });
        const mcid_response = await axios.post(`https://api.minecraft.id/auth/status/${id}`, data,{
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        });
        console.log("minecraft.id responded verification with:");
        console.log(mcid_response.data);
        
        // check if auth was verified
        if (mcid_response.data.status === 'VERIFIED') {
            next();
        } else {
            response.send();
            return;
        }
        
    } catch (error) {
        console.log("Error");
        console.log(error.response.data);
        response.send(error.response.data);
        return;
    }
}