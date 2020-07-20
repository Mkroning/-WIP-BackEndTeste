import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import env from './env';

import adminRoute from './src/routes/adminRoute';
import userRoute from './src/routes/userRoute';
import naverRoute from './src/routes/naverRoute';
import projectRoute from './src/routes/projectRoute';

const app = express();

app.use(cors());

app.use(express.urlencoded({
  extended:false
}));
app.use(express.json());

app.use('/api', userRoute);
app.use('/api', adminRoute);
app.use('/api', naverRoute);
app.use('/api', projectRoute);

app.listen(env.port).on('listening', () => {
  console.log(`🚀 are live on ${env.port}`)
});

export default app;