// logic for the interaction of the Dalle API.
import express from 'express';
import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';

// To use env variables.
dotenv.config()

// Create additional routes to specify a router.
const router = express.Router();

// To make the API key secure, create a '.env' file and put the key there.
// Now we are able to call the API to generate stuff.
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

var ex = process.env.OPENAI_API_KEY;

// Create routes
router.route('/').get( (req, res) => {
    res.status(200).json({message: "Hello from Dall.e Routes", uhmm: ex, aaa:"ss"})
} )

// Route to pass the prompt from frontend to server.
// Add '.post()' so we can pass data through.
router.route('/').post( async (req, res) => {
    try {
        // Get the prompt coming from the frontend.
        const promptReq = req.body;
        // Generate the image based on prompt.
        // 'n' - number of images to create
        // 'size' - size of the image/s
        // 'response_format - the format of the image to be recieved.
        const response = await openai.images.generate({
            prompt: promptReq.prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        })
        console.log(response);
        const image = response.data.data[0].b64_json

        // Return the image to the frontend.
        res.status(200).json({ photo: image })

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: 'Something went Wrong' })
    }
} )


export default router