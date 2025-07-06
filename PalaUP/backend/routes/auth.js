import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import Company from "../models/Company.js";
import { generateToken } from "../middleware/auth.js";

const router = express.Router();

// Validation middleware
const validateRegistration = [
  body("email").isEmail().normalizeEmail().withMessage("Email inválido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("name").notEmpty().trim().withMessage("El nombre es requerido"),
];

const validateLogin = [
  body("email").isEmail().normalizeEmail().withMessage("Email inválido"),
  body("password").notEmpty().withMessage("La contraseña es requerida"),
];

// Register Employee
router.post("/register/employee", validateRegistration, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Datos inválidos",
        errors: errors.array(),
      });
    }

    const { email, password, name, phone, location, title } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Ya existe una cuenta con este email",
      });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      name,
      phone,
      location,
      title,
    });

    // Generate token
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: "Empleado registrado exitosamente",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Error al registrar empleado",
      error: error.message,
    });
  }
});

// Register Company
router.post("/register/company", validateRegistration, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Datos inválidos",
        errors: errors.array(),
      });
    }

    const { email, password, name, industry, location, website, phone } =
      req.body;

    // Check if company already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Ya existe una empresa con este email",
      });
    }

    // Create company
    const company = await Company.create({
      email,
      password,
      name,
      industry,
      location,
      website,
      phone,
    });

    // Generate token
    const token = generateToken(company._id, company.role);

    res.status(201).json({
      success: true,
      message: "Empresa registrada exitosamente",
      data: {
        company,
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Error al registrar empresa",
      error: error.message,
    });
  }
});

// Login (works for both users and companies)
router.post("/login", validateLogin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Datos inválidos",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Try to find user first
    let user = await User.findOne({ email });
    let isCompany = false;

    // If not found, try company
    if (!user) {
      user = await Company.findOne({ email });
      isCompany = true;
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Cuenta desactivada",
      });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      message: "Login exitoso",
      data: {
        user,
        token,
        isCompany,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
});

// Get current user/company
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No autorizado",
      });
    }

    const jwt = await import("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await User.findById(decoded.id).select("-password");
    let isCompany = false;

    if (!user) {
      user = await Company.findById(decoded.id).select("-password");
      isCompany = true;
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.json({
      success: true,
      data: {
        user,
        isCompany,
      },
    });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(401).json({
      success: false,
      message: "Token inválido",
    });
  }
});

// Logout (client-side token removal)
router.post("/logout", (req, res) => {
  res.json({
    success: true,
    message: "Logout exitoso",
  });
});

export default router;
