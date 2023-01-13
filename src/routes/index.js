const Router = require("express");

const router = Router();
const authRouter = require("./auth.js");
const questionrouter = require("./question.js");
const answerrouter = require("./answer.js");

router.use("/user", authRouter);
router.use("/question", questionrouter);
router.use("/answer", answerrouter);

module.exports = router;
