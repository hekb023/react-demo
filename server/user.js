const express = require("express");
const utils = require("utility");
const Router = express.Router();
const models = require("./moudel.js");
const User = models.getModel("user");

const _filter = { pwd: 0, __v: 0 };

Router.get("/list", function(req, res) {
  const { type } = req.query;
  // User.deleteMany({}, function(req, res) {});
  User.find({ type }, function(err, doc) {
    return res.json({code:0, data: doc});
  });
});

Router.post("/update", function(req, res) {
  const userid = req.cookies.userid;
  if (!userid) {
    return JSON.dumps({ code: 1 });
  }
  const body = req.body;
  console.log(body);
  User.findByIdAndUpdate(userid, body, function(err, doc) {
    const data = Object.assign(
      {},
      {
        user: doc.user,
        type: doc.type
      },
      body
    );
    return res.json({ code: 0, data: data });
  });
});

Router.post("/register", function(req, res) {
  const { user, pwd, type } = req.body;
  User.findOne({ user }, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: "用户名重复" });
    }

    const userModel = new User({ user, type, pwd: md5pwd(pwd) });
    userModel.save((e, d) => {
      if (e) {
        return res.json({ code: 1, msg: "服务端错误" });
      }
      const { user, type, _id } = d;
      res.cookie("userid", _id);
      return res.json({ code: 0, data: { user, type, _id } });
    });
  });
});

Router.post("/login", function(req, res) {
  const { user, pwd } = req.body;
  User.findOne({ user, pwd: md5pwd(pwd) }, _filter, function(err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: "用户名或密码错误" });
    }
    res.cookie("userid", doc._id);
    return res.json({ code: 0, data: doc });
  });
});

Router.get("/info", function(req, res) {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1, msg: "测试失败" });
  }
  User.findOne({ _id: userid }, _filter, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: "服务端错误" });
    }
    if (doc) {
      return res.json({ code: 0, data: doc });
    }
  });
});

function md5pwd(pwd) {
  const salt = "imooc_is_good_390422838)#))$";
  return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
