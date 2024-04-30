const express = require("express");
const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


/**--------------------------------------
 * @desc create a new user 
 * @method  POST
 * @route /reg
 * @access public
 -------------------------------------*/

exports.register = async (req, res) => {
  const {
    name,
    password,
    email,
    userType,
    location,
    specialization,
    adress,
    phone,
    workingHours,
  } = req.body;
  if (!name || !password || !email || !userType)
    return res.status(400).json({ msg: " bad req" });
  const oldUser = await models.User.findOne({ where: { email } });
  if (oldUser) return res.status(400).json({ message: "alredy exist" });

  try {
    const user = await models.User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      userType,
      longitude: location?.longitude,
      latitude: location?.latitude,
    });
    if (userType === "doctor") {
      const profile = await models.Profile.create({
        userId: user.id,
        specialization,
        workingHours,
        adress,
        phone,
      });
    }
    res.json({ message: "تم إنشاء الحساب بنجاح" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

/**--------------------------------------
 * @desc login 
 * @method  POST
 * @route /login
 * @access private
 -------------------------------------*/

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "Missing fields" });
    }
    let user = await models.User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: "الحساب غير موجود :( " });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ msg: "Password or email is invalid" });
    }

    // create a token
    const payload = { id: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json(error);
  }
};

/**--------------------------------------
 * @desc myProfile 
 * @method  get
 * @route /myProfile
 * @access private
 -------------------------------------*/


exports.getProfile = async (req, res) => {
  try {
    const result = await models.User.findAll({
      where: { id: req.currentUser.id },
      include: [{ model: models.Profile, as: "profile" }],
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e);
  }
};

/**-----------------------------------------
 * @description DELETE user
 * @method DELETE
 * @route /delete
 * @access private
 *-----------------------------------------*/

exports.delUser = async (req, res) => {
  const user = req.currentUser;
  const exist = await models.User.findOne({where : {id : user.id}});
  if(!exist) return res.status(400).json({msg : 'not found'})
  try {
    const del = await models.User.destroy({
      where: { id: user.id },
    });
    res.status(202).json("your account has been deleted");
  } catch (error) {
    res.status(500).json({ msg: "something went wrong, deleting failed" });
  }
};

/**-----------------------------------------
 * @description UPDATE user
 * @method PUT
 * @route /update
 * @access private
 *-----------------------------------------*/

exports.upUser = async (req, res) => {
  const user = req.currentUser;
  const exist = await models.User.findOne({ where: { id: user.id } });
  if (!exist) return res.status(404).json({ message: "أنت غير مسجل , لايمكنك تعديل البيانات" });

  const {
    name,
    email,
    password,
    userType,
    location,
    specialization,
    adress, 
    phone,
    workingHours,
  } = req.body;
  try {
    const up_user = await models.User.update(
      {
        name,
        email,
        password: password ? bcrypt.hashSync(password, 10) : user.password,
        latitude: location.latitude,
        longitude : location.longitude,
      },
      { where: { id: user.id } }
    );
    if (userType === "doctor") {
      const profile = await models.Profile.update({
        specialization,
        workingHours,
        adress,
        phone,
      },
      {where : {userId : user.id}}
    );
    }
    res.status(202).json({message : "your account has been updated"});
  } catch (error) {
    res.status(500).json({ message: "something went wrong, deleting failed" });
  }
};
