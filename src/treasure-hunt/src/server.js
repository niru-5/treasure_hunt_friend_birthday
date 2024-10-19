const express = require('express');
const yaml = require('js-yaml');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

app.post('/api/update-progress', async (req, res) => {
  const { code, currentQuestion } = req.body;

  try {
    // Read the YAML file
    const fileContents = await fs.readFile(path.join(__dirname, 'assets', 'codes.yaml'), 'utf8');
    const data = yaml.load(fileContents);

    // Find and update the correct code entry
    const codeEntry = data.find(entry => entry.code === code);
    if (codeEntry) {
      codeEntry.current_question = currentQuestion;

      // Write the updated data back to the file
      await fs.writeFile(path.join(__dirname, 'assets', 'codes.yaml'), yaml.dump(data), 'utf8');
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Code not found' });
    }
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));