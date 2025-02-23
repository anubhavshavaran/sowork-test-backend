const ChatSchema = require("../models/Chat");
const ChatRoomsSchema = require("../models/ChatRooms");


exports.getChatList = async (req, res) => {
  const bankAccounts = await ChatSchema.find({
    $or: [
    {
        $and: [
          { userFrom:req.params?.userFrom  }, { userTo: req.params?.userTo },
        ]
    },
    {  $and: [
      { userFrom:req.params?.userTo  }, { userTo: req.params?.userFrom },
    ]}
]
}).populate(
    "userFrom userTo"
  ).lean();
  return res.status(200).send([...bankAccounts]);
};

exports.getChatRoomsList = async (req, res) => {
  const bankAccounts = await ChatRoomsSchema.find({ $or: [{ userFrom:req.user?._id  }, { userTo: req.user?._id }] }).populate(
    "userFrom userTo"
  );
  return res.status(200).send([...bankAccounts]);
};

exports.createChatRoom = async (req, res) => {
  const {userFrom,userTo} = req.body
  const existingChatRoom = await ChatRoomsSchema.findOne({ $or: [{ userFrom,userTo }, { userTo:userFrom,userFrom:userTo }] }).populate("userFrom userTo").lean();
  if(existingChatRoom){
    return res.status(200).send({ ...existingChatRoom });
  }
  (await ChatRoomsSchema.create({ ...req.body })).populate("userFrom userTo")
    .then(async (data) => {
      const createdRoom = await ChatRoomsSchema.findById(data?._id).populate("userFrom userTo").lean();

      return res.status(200).send({...createdRoom, message: "Chat room created successfully" });
    })
    .catch((e) => {
      return res.status(500).send({ message: e });
    });
};