import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello TypeScript with Express!');
});
app.get("/api/tts", async (req, res) => {
  const { text } = req.query;
  const ttsResponse = await axios({
    method: 'get',
    url: `http://localhost:8001/speak`,
    params: { text },
    responseType: 'stream'
  });
  res.setHeader("Content-Type", "audio/wav");
  ttsResponse.data.pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
