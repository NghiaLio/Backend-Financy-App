const mongoose = require("mongoose");

const account_type = {
  Cash: "Cash",
  E_Wallet: "E_Wallet",
  Banking: "Banking",
  Other: "Khác",
};
const account_currency = {
  VND: "VND",
  USD: "USD",
};

const accountSchema = new mongoose.Schema({
  accountName: {
    type: String, // cho phep nhap thu cong
    required: true,
  },
  accountType: {
    type: String,
    default: account_type.Cash,
    required: true,
  },
  accountBalance: {
    type: Number, // user nhap thu cong
    default: 0,
  },
  currency: {
    type: String,
    default: account_currency.VND,
  },
  userId: {
    type: String,
    required: true,
  },
  createAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  updateAt: {
    type: Date,
  },
  linked: {
    type: Boolean,
    default: false,
  }, //default:false -> chua lien ket ngan hang
  bankMeta: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  }, //thong tin lien ket sau nay
});

accountSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

const Account = mongoose.model("account", accountSchema);

module.exports = { Account, account_type, account_currency };
