const WorkRequests = require("../models/WorkRequests");
const Notification = require("../models/Notifications");

exports.createWorkRequests = async (req, res) => {
  WorkRequests.create({ ...req.body, customer: req.user?._id })
    .then(async () => {
      const title = "New work";
      const body = `${req.body?.jobName} work has been assigned to you, Check out this work and action on it`;
      let newNotification = new Notification({
        title,
        body,
        user: req.body.artist,
      });
      await newNotification.save();
      return res.status(200).send({ message: "work added successfully" });
    })
    .catch((e) => {
      res.status(500).send({ message: e });
    });
};

exports.getDashboard = async (req, res) => {
  try {
    const activeCount = await WorkRequests.count({
      status: "Active",
      ...req.body,
    });
    const pendingCount = await WorkRequests.count({
      status: "Pending",
      ...req.body,
    });
    const finishCount = await WorkRequests.count({
      status: "Finish",
      ...req.body,
    });
    const rejectedCount = await WorkRequests.count({
      status: "Rejected",
      ...req.body,
    });
    return res
      .status(200)
      .send({ activeCount, pendingCount, finishCount, rejectedCount });
  } catch (e) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

exports.getWorkList = async (req, res) => {
  const bankAccounts = await WorkRequests.find({ ...req.body }).populate(
    "customer artist package"
  );
  return res.status(200).send([...bankAccounts]);
};

exports.updateWorkDetails = async (req, res) => {
  try {
    const bankAccounts = await WorkRequests.findByIdAndUpdate(req?.params?.id, {
      ...req.body,
    });
    if (bankAccounts) {
      if (req.body.status) {
        const title = req.body.status == "Rejected" ? 'Work Rejected' : req.body.status == "Finish" ? "Work Completed" : "Work Update";
        const body = `${req.body?.jobName} work has been updated with status ${req.body.status}`;
        let newNotification = new Notification({
          title,
          body,
          user: bankAccounts.customer,
        });
        await newNotification.save();
      }
      res.status(200).send({ ...bankAccounts });
      return;
    }
    return res.status(404).send({ message: "Not found" });
  } catch (e) {
    res.status(500).send({ message: "Something went wrong" });
  }
  // bankAccounts.save((err, account_details) => {
  //     if (err) {
  //         res.status(500).send({ message: err });
  //         return;
  //     } else {
  //         res.status(200).send({ ...account_details });
  //     }
  // });
};
