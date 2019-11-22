const express = require('express');
const cors = require('cors');
const router = express.Router();
const port = 3000;
const app = express();
app.use(cors());
let mock = {
  data: require('./festival')
}
/* GET api listing. */
app.get('/api/v1/festivals', (req, res) => {
  return res.status(200).json(mock.data.data);
});


module.exports = router;
app.listen(port, () => console.log(`Server started on port ${port}!`));
