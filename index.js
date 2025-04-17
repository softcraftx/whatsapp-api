const venom = require('venom-bot');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

venom
  .create({
    session: 'session-name'
  })
  .then((client) => start(client))
  .catch((error) => {
    console.log(error);
  });

function start(client) {
  app.post('/send', async (req, res) => {
    const { to, message } = req.body;
    try {
      await client.sendText(to, message);
      res.send({ status: 'success', to, message });
    } catch (err) {
      res.status(500).send({ status: 'error', error: err.toString() });
    }
  });

  app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
  });
}
