const { createCustomError } = require("../errors/CustomError");
const Task = require("../models/Task");
const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});

const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});
const getTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id });
  if (!task) {
    next(createCustomError("Task not found", 404));
    return;
  }
  res.status(200).json(task);
});

const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });
  if (!task) {
    res.status(404).json("Task Not Found");
  }
  res.status(200).json(task);
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id });
  if (!task) {
    return res.status(404).json({ errObj: "Task not found" });
  }
  res.status(200).json(task);
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
