const mongoose = require("mongoose");
const { AppError } = require("../utils/appError");

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
  color: String,
  description: String,
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

// Prevent update and delete on inactive accounts
function blockInactive(next) {
  // 'this' is the query
  const filter = this.getFilter();
  // Nếu filter chỉ định active: false, hoặc không chỉ định active, thì cần kiểm tra trong DB
  if (filter.active === false) {
    // Sử dụng AppError với statusCode 403
    return next(new AppError("Cannot modify or delete inactive account.", 403));
  }
  next();
}

accountSchema.pre(
  [
    "updateOne",
    "updateMany",
    "findOneAndUpdate",
    "findByIdAndUpdate",
    "deleteOne",
    "deleteMany",
    "findOneAndDelete",
    "findByIdAndDelete",
  ],
  blockInactive
);

const Account = mongoose.model("account", accountSchema);

module.exports = { Account, account_type, account_currency };
