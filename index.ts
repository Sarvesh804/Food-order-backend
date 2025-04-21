import express from 'express';
import { AdminRoute,VendorRoute } from './routes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { MONGO_URI } from './config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', AdminRoute)
app.use('/vendor', VendorRoute)


mongoose.connect(MONGO_URI)
.then(() => {
  console.log('Database connected');
})
.catch((error) => {
  console.log('Error connecting to database');
  console.log(error);
});


app.listen(5000, () => {
  console.clear();
  console.log('Server is running on port 5000');
});
