import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth/auth';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', authRoutes);
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: 'Reset password api endpoint'
  })
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));