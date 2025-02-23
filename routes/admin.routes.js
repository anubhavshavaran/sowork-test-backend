const router = require("express").Router();
const IndexRouter = require("../controllers/admin/index.contoller");
const ReportRouter = require("../controllers/admin/report.controller");
const UserRouter = require("../controllers/admin/user.controller");
const { addCategory, addSpecialization, getCategories } = require("../controllers/common.controller");
const { authAdmin } = require("../middleware/auth.middleware");
const Specialization = require("../models/specialization");

//general routes
router.post("/signup", IndexRouter.signup);
router.post("/login", IndexRouter.login);

//report routes
router.get("/report/post", authAdmin, ReportRouter.getPostReports);
router.get("/report/comment", authAdmin, ReportRouter.getCommentReports);
router.get(
  "/report/comment/change-status/:type/:comment_id",
  authAdmin,
  ReportRouter.changeCommentStatus
);
router.get(
  "/report/post/change-status/:type/:post_id",
  authAdmin,
  ReportRouter.changePostStatus
);

//users routes
router.get("/users/:role", authAdmin, UserRouter.getUsersByRole);

router.post("/specializations", async (req, res) => {
  console.log(req.body);
  // {
  //   "category_name": "music",
  //   "specializations": {
  //     "specialization_name": "singer",
  //     "sub_specializations": {
  //       "sub_specialization_name": "play back"
  //     }
  //   }
  // }
  Specialization.create({
    category_name: "music",
    specializations: {
      specialization_name: "singer",
      sub_specializations: {
        sub_specialization_name: "play back",
      },
    },
  }).then(() => {
    res.send({ error: false, message: "Added successfully" });
  });
});

router.post("/addCategory", addCategory);
router.post("/addSpecialization", addSpecialization);
router.get("/getCategories", getCategories);


router.patch("/updateSpecializations/:id", async (req, res) => {
  Specialization.findByIdAndUpdate(req?.params?.id,req.body).then(() => {
    res.send({ error: false, message: "Added successfully" });
  }).catch(e => {
    res.status(500).send({ error: e });

  });
});
module.exports = router;
