const BankAccounts = require("../../models/BankAccounts");

exports.createBankAccount = async (req, res) => {

    BankAccounts.create({...req.body,user:req.user?._id}).then(
        () => {
          return  res.status(200).send({ message: "Account added successfully" });

        }
    ).catch(e => {
        res.status(500).send({ message: e });
    });
    // bankAccounts.save((err, _) => {
    //     if (err) {
    //         console.log(err)
    //         res.status(500).send({ message: err });
    //         return;
    //     } else {
    //         res.status(200).send({ message: "Account added successfully" });
    //     }
    // });
};


exports.getBankAccounts = async (req, res) => {
     // #swagger.tags = ['Bank Accounts']
    const bankAccounts = await BankAccounts.find({ user: req.user._id });
   return  res.status(200).send([...bankAccounts]);
    
};


exports.updateBankAccounts = async (req, res) => {
     // #swagger.tags = ['Bank Accounts']
    const bankAccounts = await BankAccounts.findByIdAndUpdate(req?.params?.id, { ...req.body });
    bankAccounts.save((err, account_details) => {
        if (err) {
            console.log(err)
            res.status(500).send({ message: err });
            return;
        } else {
            res.status(200).send({ ...account_details });
        }
    });
};