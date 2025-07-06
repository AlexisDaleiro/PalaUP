import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import Job from "../models/Job.js";
import { protect, protectEmployee } from "../middleware/auth.js";

const router = express.Router();

// Get user profile
router.get("/profile", protectEmployee, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("applications.jobId")
      .populate("savedJobs");

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener perfil",
      error: error.message,
    });
  }
});

// Update user profile
router.put(
  "/profile",
  protectEmployee,
  [
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("El nombre no puede estar vacío"),
    body("phone").optional().trim(),
    body("location").optional().trim(),
    body("title").optional().trim(),
    body("experience").optional().trim(),
    body("education").optional().trim(),
    body("bio").optional().trim(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Datos inválidos",
          errors: errors.array(),
        });
      }

      const updateData = req.body;
      delete updateData.password; // Don't allow password update here
      delete updateData.email; // Don't allow email update here

      const user = await User.findByIdAndUpdate(req.user._id, updateData, {
        new: true,
        runValidators: true,
      });

      res.json({
        success: true,
        message: "Perfil actualizado exitosamente",
        data: user,
      });
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar perfil",
        error: error.message,
      });
    }
  }
);

// Update skills
router.put(
  "/skills",
  protectEmployee,
  [body("skills").isArray().withMessage("Las habilidades deben ser un array")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Datos inválidos",
          errors: errors.array(),
        });
      }

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { skills: req.body.skills },
        { new: true }
      );

      res.json({
        success: true,
        message: "Habilidades actualizadas exitosamente",
        data: user.skills,
      });
    } catch (error) {
      console.error("Update skills error:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar habilidades",
        error: error.message,
      });
    }
  }
);

// Update languages
router.put(
  "/languages",
  protectEmployee,
  [body("languages").isArray().withMessage("Los idiomas deben ser un array")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Datos inválidos",
          errors: errors.array(),
        });
      }

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { languages: req.body.languages },
        { new: true }
      );

      res.json({
        success: true,
        message: "Idiomas actualizados exitosamente",
        data: user.languages,
      });
    } catch (error) {
      console.error("Update languages error:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar idiomas",
        error: error.message,
      });
    }
  }
);

// Apply to job
router.post("/apply/:jobId", protectEmployee, async (req, res) => {
  try {
    const { jobId } = req.params;
    const { cv, coverLetter } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Empleo no encontrado",
      });
    }

    if (!job.isActive) {
      return res.status(400).json({
        success: false,
        message: "Este empleo ya no está activo",
      });
    }

    // Add application to job
    await job.addApplication(req.user._id, cv, coverLetter);

    // Add application to user
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          applications: {
            jobId: jobId,
            status: "Aplicado",
            appliedDate: new Date(),
            lastUpdate: new Date(),
          },
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Aplicación enviada exitosamente",
      data: {
        application: user.applications[user.applications.length - 1],
      },
    });
  } catch (error) {
    console.error("Apply to job error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error al aplicar al empleo",
      error: error.message,
    });
  }
});

// Get user applications
router.get("/applications", protectEmployee, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "applications.jobId",
      select: "title companyName location salary type logo",
    });

    res.json({
      success: true,
      data: user.applications,
    });
  } catch (error) {
    console.error("Get applications error:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener aplicaciones",
      error: error.message,
    });
  }
});

// Save/unsave job
router.post("/save-job/:jobId", protectEmployee, async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Empleo no encontrado",
      });
    }

    const user = await User.findById(req.user._id);
    const isSaved = user.savedJobs.includes(jobId);

    if (isSaved) {
      // Remove from saved jobs
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { savedJobs: jobId },
      });
      res.json({
        success: true,
        message: "Empleo removido de guardados",
        saved: false,
      });
    } else {
      // Add to saved jobs
      await User.findByIdAndUpdate(req.user._id, {
        $push: { savedJobs: jobId },
      });
      res.json({
        success: true,
        message: "Empleo guardado exitosamente",
        saved: true,
      });
    }
  } catch (error) {
    console.error("Save job error:", error);
    res.status(500).json({
      success: false,
      message: "Error al guardar empleo",
      error: error.message,
    });
  }
});

// Get saved jobs
router.get("/saved-jobs", protectEmployee, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("savedJobs");

    res.json({
      success: true,
      data: user.savedJobs,
    });
  } catch (error) {
    console.error("Get saved jobs error:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener empleos guardados",
      error: error.message,
    });
  }
});

// Update avatar
router.put(
  "/avatar",
  protectEmployee,
  [body("avatar").isURL().withMessage("URL de avatar inválida")],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "URL inválida",
          errors: errors.array(),
        });
      }

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { avatar: req.body.avatar },
        { new: true }
      );

      res.json({
        success: true,
        message: "Avatar actualizado exitosamente",
        data: user.avatar,
      });
    } catch (error) {
      console.error("Update avatar error:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar avatar",
        error: error.message,
      });
    }
  }
);

export default router;
