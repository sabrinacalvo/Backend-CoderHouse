const Router = require('express');
const Message = require('../dao/dbManagers/messages.dbManager.js');

const router = new Router();
const msg = new Message();

router.get("/", (req, res) => {
  let result = msg.getAll();
  res.send({ status: "Ok", payload: result });
});

router.post("/", async (req, res) => {
  let { user, message } = req.body;
  let fullMessage = {
    user,
    message,
  };
  let result = await msg.addMessage(fullMessage);
  res.send({ status: "Ok", payload: result });
});

module.exports = router;