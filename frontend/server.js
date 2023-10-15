import express from 'express';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '../');

const app = express();
const port = 5173;

// Serve static files from the 'dist' directory
app.use(express.static(join(__dirname, 'dist')));

app.get('*', (req, res) => res.sendFile(path.resolve('dist', 'index.html')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});