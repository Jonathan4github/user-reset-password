import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: 'Reset password api endpoint'
  })
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));