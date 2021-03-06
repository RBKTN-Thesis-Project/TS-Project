const express = require("express");
const authController = require("./../controllers/authController");
const router = express.Router();
const jobOfferController = require("../controllers/jobOfferController");

router.route("/addPost/:id").post(jobOfferController.addPost);
router.route("/postUpdate/:id").patch(jobOfferController.findAndUpdate);
router.route("/deletePost/:id").delete(jobOfferController.findAndDelete);
router.route("/showPosts").get(jobOfferController.findAll);
router.route("/showPosts/:id").get(jobOfferController.findOne);
router.route("/search").post(jobOfferController.search);
router.route("/category").post(jobOfferController.searchBycategory);
router.route("/:idOffre/user/:idUser").post(jobOfferController.apply);
module.exports = router;
