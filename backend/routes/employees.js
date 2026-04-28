const express = require("express");
const Employee = require("../models/Employee");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// GET all employees
router.get("/", authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch employees", error: err.message });
  }
});

// GET single employee
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch employee", error: err.message });
  }
});

// POST create employee
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      department,
      designation,
      salary,
      joiningDate,
      status,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !department ||
      !designation ||
      !salary ||
      !joiningDate
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ message: "Employee with this email already exists" });
    }

    const employee = new Employee({
      name,
      email,
      phone,
      department,
      designation,
      salary,
      joiningDate,
      status: status || "Active",
    });

    await employee.save();
    res.status(201).json({
      message: "Employee created successfully",
      employee,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create employee", error: err.message });
  }
});

// PUT update employee
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      department,
      designation,
      salary,
      joiningDate,
      status,
    } = req.body;

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phone,
        department,
        designation,
        salary,
        joiningDate,
        status,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true },
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update employee", error: err.message });
  }
});

// DELETE employee
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
      employee,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete employee", error: err.message });
  }
});

module.exports = router;
