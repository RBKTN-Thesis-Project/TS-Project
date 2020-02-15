const jobOffer = require("../models/JobOfferModel");
const Company = require("./../models/CompanyModel");
const user = require("../models/UserModel");
const _ = require("underscore");
//
exports.addPost = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      res.json
        .status(404)
        .json({ status: "fail", message: "company not found" });
    }
    req.body.companyName = company._id;
    const newPost = await jobOffer.create(req.body);
    company.jobOffers.push(newPost._id);
    await company.save({ validateBeforeSave: false });
    res.status(201).json({ status: "sucess", newPost });
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
};

exports.findAll = async (req, res) => {
  try {
    const result = await jobOffer
      .find({})
      .sort({
        createdAt: -1
      })
      .populate("companyName");
    res.status(201).json(result);
  } catch (err) {
    res.json({ err });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await jobOffer
      .findById(id)
      .populate("companyName", ["name", "description"])
      .populate("candidates"); // add ,"photo" when database is correctly filled
    res.status(201).json({
      data: result
    });
    console.log({ result }.companyName.name);
  } catch (err) {
    res.json({ err });
  }
};

exports.findAndDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await jobOffer.findByIdAndRemove(id);
  } catch (err) {
    res.json({ err });
  }
};

exports.findAndUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPost = await jobOffer.findByIdAndUpdate(id, req.body);
    res.json({
      data: { updatedPost }
    });
  } catch (err) {
    res.json({ err });
  }
};

exports.search = async (req, res) => {
  try {
    const skills = req.body.skills.split(" ");
    const location = req.body.location;
    const offers = await jobOffer.find({
      $or: [
        { location },
        {
          "skillRequired.name": {
            $in: skills
          }
        },
        {
          location,
          "skillRequired.name": {
            $in: skills
          }
        }
      ]
    });
    res.status(201).send(offers);
  } catch (err) {
    res.json({ err });
  }
};

const convertDateToInt = dateString => {
  let result;
  const now = new Date();
  if (dateString === "month ago") {
    result = now.setMonth(now.getMonth() - 1);
  } else if (dateString === "week ago") {
    result = now.setDate(now.getDate() - 1 * 7);
  } else if (dateString === "day ago") {
    result = now.setDate(now.getDate() - 1);
  }
  return result;
};

exports.searchBycategory = async (req, res) => {
  try {
    const time = convertDateToInt(req.body.time);
    // const test = await jobOffer.findOne();
    // console.log(new Date() < test.createdAt);

    req.body.salaryMin = req.body.salaryMin || 0;
    const jobs = await jobOffer.find({
      salaryMin: { $gte: req.body.salaryMin },
      jobType: { $eq: req.body.jobType },
      createdAt: { $gte: new Date(time) }
    });

    res.json({ results: jobs.length, jobs });
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
};
exports.apply = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const idOffre = req.params.idOffre;
    let data = {};
    data.job = idOffre;
    await user.findByIdAndUpdate(idUser, {
      $push: { appliedJobs: data }
    });
    res.json(201);
    return jobOffer.findByIdAndUpdate(
      idOffre,
      { $push: { candidates: idUser } },
      { new: true, useFindAndModify: false }
    );
  } catch (err) {
    console.log(err);
  }
};
