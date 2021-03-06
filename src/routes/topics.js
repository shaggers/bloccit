const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");

const topicController = require("../controllers/topicController");
const postController = require("../controllers/postController");

router.get("/topics", topicController.index);
router.get("/topics/new", topicController.new);
router.post("/topics/create", topicController.create);
router.get("/topics/:id", topicController.show);
router.post("/topics/:id/destroy", topicController.destroy);
router.get("/topics/:id/edit", topicController.edit);
router.post("/topics/:id/update", topicController.update);
router.post("/topics/:topicId/posts/:id/destroy",
    helper.ensureAuthenticated,
    postController.destroy);

module.exports = router;