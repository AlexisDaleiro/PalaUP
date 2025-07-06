import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Company from "../models/Company.js";

// Generate JWT token
export const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Token inválido");
  }
};

// Protect routes - require authentication
export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No autorizado - Token no proporcionado",
      });
    }

    const decoded = verifyToken(token);

    // Check if user exists
    let user = await User.findById(decoded.id).select("-password");
    if (!user) {
      // Check if company exists
      user = await Company.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "No autorizado - Usuario no encontrado",
        });
      }
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "No autorizado - Token inválido",
    });
  }
};

// Protect routes for employees only
export const protectEmployee = async (req, res, next) => {
  try {
    await protect(req, res, async () => {
      if (req.user.role !== "employee") {
        return res.status(403).json({
          success: false,
          message: "Acceso denegado - Solo empleados",
        });
      }
      next();
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "No autorizado",
    });
  }
};

// Protect routes for companies only
export const protectCompany = async (req, res, next) => {
  try {
    await protect(req, res, async () => {
      if (req.user.role !== "company") {
        return res.status(403).json({
          success: false,
          message: "Acceso denegado - Solo empresas",
        });
      }
      next();
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "No autorizado",
    });
  }
};

// Optional authentication - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      const decoded = verifyToken(token);

      let user = await User.findById(decoded.id).select("-password");
      if (!user) {
        user = await Company.findById(decoded.id).select("-password");
      }

      if (user) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};
