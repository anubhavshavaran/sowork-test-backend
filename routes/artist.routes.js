const DiscoverRouter = require("../controllers/artist/discover.controller");
const UploadRouter = require("../controllers/upload.controller");
const NotificationRouter = require("../controllers/artist/notification.controller");
const IndexRouter = require("../controllers/artist/index.controller");
const ProfileRouter = require("../controllers/artist/profile.controller");
const BankRouter = require("../controllers/artist/BankAccountsController");
const ChatRouter = require("../controllers/chat.controller");


const DashboardRouter = require("../controllers/artist/dashboard.controller");
const { authArtist } = require("../middleware/auth.middleware");
const { getDashboard, getWorkList, updateWorkDetails } = require("../controllers/work.controller");

const router = require("express").Router();

//common routes
router.post("/login/send-code", IndexRouter.loginStep1);
router.post("/login/verify-code", IndexRouter.loginStep2);

//posts
router.post(
  "/posts/upload-image",
  UploadRouter.upload.single("image"),
  UploadRouter.uploadSingleFile
);
router.post(
  "/posts",
  authArtist,
  // UploadRouter.upload.single("image"),
  DiscoverRouter.addPost
);
router.delete(
  "/posts/:id",
  authArtist,
  // UploadRouter.upload.single("image"),
  DiscoverRouter.deletePost
);

//discover routes
router.get("/discover/post/get-all", authArtist, DiscoverRouter.getAllPosts);
router.get("/discover/post/get-one/:id", authArtist, DiscoverRouter.getPostById);
router.get("/discover/post/get-my-posts", authArtist, DiscoverRouter.getAllMyPosts);
router.post("/discover/post/react", authArtist, DiscoverRouter.reactOnPost);

//Bookmark routes
router.get(
  "/discover/post/bookmark/:_id",
  authArtist,
  DiscoverRouter.bookmarkPost
);
router.get(
  "/discover/post/get-bookmarks",
  authArtist,
  DiscoverRouter.getBookmarks
);

//notifications
router.post("/notification", NotificationRouter.addNotification);
router.get("/notification", authArtist, NotificationRouter.getAllNotifications);
//profile routes
router.post("/profile/basic-info", authArtist, ProfileRouter.saveBasicInfo);
router.post("/bankAccounts", authArtist, BankRouter.createBankAccount);
router.get("/bankAccounts", authArtist, BankRouter.getBankAccounts);
router.patch("/bankAccounts/:id", authArtist, BankRouter.updateBankAccounts);
router.patch("/profileDetails", authArtist, DashboardRouter.updateProfileDetails);

router.post("/profile/address-info", authArtist, ProfileRouter.saveAddressInfo);
router.get(
  "/profile/get-specializations",
  authArtist,
  ProfileRouter.getSpecializations
);
router.post(
  "/profile/set-specialization",
  authArtist,
  ProfileRouter.setSpecialization
);
router.post(
  "/profile/kyc/upload-image",
  UploadRouter.upload.single("image"),
  UploadRouter.uploadSingleFile
);
router.post("/profile/kyc", authArtist, ProfileRouter.addKyc);

router.get(
  "/profile/get-artist-by-id/:_id",
  authArtist,
  ProfileRouter.getArtistById
);

router.get(
  "/profile/get-artist-details",
  authArtist,
  ProfileRouter.getArtistDetails
);


router.post("/profile/update", authArtist, ProfileRouter.updateUserDetails);

router.post("/profile/address", authArtist, ProfileRouter.addAddress);
router.get("/profile/address", authArtist, ProfileRouter.getAddress);
router.get("/profile/address/:_id", authArtist, ProfileRouter.getAddressById);
router.post("/profile/address/update", authArtist, ProfileRouter.updateAddress);
router.get(
  "/profile/address/delete/:_id",
  authArtist,
  ProfileRouter.deleteAddress
);
router.get("/profile/edit-profile", authArtist, ProfileRouter.editProfile);
router.post(
  "/profile/upload-profile-pic",
  authArtist,
  UploadRouter.upload.single("image"),
  UploadRouter.uploadSingleFile
);
router.post(
  "/profile/upload-cover-pic",
  authArtist,
  UploadRouter.upload.single("image"),
  UploadRouter.uploadSingleFile
);
router.post("/profile/update-profile", authArtist, ProfileRouter.updateProfile);

//packages
router.post("/profile/package", authArtist, ProfileRouter.addUpdatePackage);
router.get("/profile/getAllPackages", authArtist, ProfileRouter.getAllPackageByArtist);
router.get("/profile/getAllPackages/:id", ProfileRouter.getAllPackageByArtistById);

router.post("/profile/addPackage", authArtist, ProfileRouter.addPackage);
router.get(
  "/profile/package/get-by-type/:type",
  authArtist,
  ProfileRouter.getPackageByType
);


router.post("/profile/getAllArtist", ProfileRouter.getAllArtists);

router.post("/work/getDashboardData", getDashboard);

router.post("/work/list", getWorkList);
router.patch("/work/update/:id", updateWorkDetails);


//portfolio
router.get(
  "/profile/portfolio/get-all",
  authArtist,
  ProfileRouter.getAllPortfolio
);

//reviews
router.get("/profile/review", authArtist, ProfileRouter.getReviews);

router.get("/chat/messages/:userFrom/:userTo", authArtist, ChatRouter.getChatList);
router.get("/chat/chatRooms", authArtist, ChatRouter.getChatRoomsList);
router.post("/chat/createChatRoom", authArtist, ChatRouter.createChatRoom);



//dashboard routes
router.get(
  "/dashboard/get-my-profile",
  authArtist,
  DashboardRouter.getMyProfile
);

module.exports = router;
