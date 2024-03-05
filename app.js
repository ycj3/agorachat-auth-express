import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import rtcChannelRoutes from './routes/rtcChannelRoutes';
import dbConnect from './utils/dbConnect';
import { hostname, port } from './constants'; // Import port from constants

const app = express();

app.use(cors());
app.use(express.json());

dbConnect(); // Connect to the database

app.use('/app/chat', userRoutes);
app.use('', rtcChannelRoutes);

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});