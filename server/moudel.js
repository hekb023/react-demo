const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/imooc-chat";
mongoose.connect(DB_URL, { useNewUrlParser: true });
mongoose.connection.on("open", () => {
  console.log("数据库连接成功");
});

const models = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    avatar: { type: String },
    desc: { type: String },
    // 职位名
    title: { type: String },
    // boss
    company: { type: String },
    money: { type: String }
  },
  chat: {
    chatid: { type: String, require: true },
    from: { type: String, require: true },
    to: { type: String, require: true },
    read: { type: Boolean, default: false },
    content: { type: String, require: true, default: "" },
    create_time: { type: String, default: new Date().getTime() }
  }
};

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name);
  }
};
