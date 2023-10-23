import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

// Connect the route from 'dalle.routes.js'.
import dalleRoutes from './routes/dalle.routes.js'

// Set environment variables.
dotenv.config()

const app = express();

// Setup middleware. Pass 'cors' to avoid crossorigin problems.
app.use(cors())
// Specify the weight of the payload that we can send.
app.use(express.json( {limit: '50mb'} ))

// Use the route as a middleware (the route from 'dalle.routes')
app.use('/api/v1/dalle', dalleRoutes);


// Create a demo route. (Wihtout middleware)
// app.get('/', (req, res) => {
//     res.status(200).json({ message: "Hello from DALL.E" })
// })


// run 'npm start' to run the server.

// To host it somewhere, listen to a specific port. (edit the port in url to view)
app.listen(8080, () => {
    console.log('server has started on the port.')
})