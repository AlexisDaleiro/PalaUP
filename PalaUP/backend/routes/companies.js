import express from "express";
import { body, validationResult } from "express-validator";
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import { protect, protectCompany } from "../middleware/auth.js";

const router = express.Router();

// Get company profile
router.get("/profile", protectCompany, async (req, res) => {
  try {
    const company = await Company.findById(req.user._id).populate({
      path: "jobs",
      select: "title location type salary applicationsCount isActive createdAt",
    });

    res.json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.error("Get company profile error:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener perfil de empresa",
      error: error.message,
    });
  }
});

// Update company profile
router.put(
  "/profile",
  protectCompany,
  [
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("El nombre no puede estar vacío"),
    body("industry").optional().trim(),
    body("description").optional().trim(),
    body("founded").optional().trim(),
    body("employees").optional().trim(),
    body("location").optional().trim(),
    body("website").optional().trim(),
    body("phone").optional().trim(),
    body("size")
      .optional()
      .isIn(["Pequeña", "Mediana", "Grande"])
      .withMessage("Tamaño inválido"),
    body("type")
      .optional()
      .isIn(["Privada", "Pública", "Startup", "ONG"])
      .withMessage("Tipo inválido"),
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

      const company = await Company.findByIdAndUpdate(
        req.user._id,
        updateData,
        { new: true, runValidators: true }
      );

      res.json({
        success: true,
        message: "Perfil actualizado exitosamente",
        data: company,
      });
    } catch (error) {
      console.error("Update company profile error:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar perfil",
        error: error.message,
      });
    }
  }
);

// Update specialties
router.put(
  "/specialties",
  protectCompany,
  [
    body("specialties")
      .isArray()
      .withMessage("Las especialidades deben ser un array"),
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

      const company = await Company.findByIdAndUpdate(
        req.user._id,
        { specialties: req.body.specialties },
        { new: true }
      );

      res.json({
        success: true,
        message: "Especialidades actualizadas exitosamente",
        data: company.specialties,
      });
    } catch (error) {
      console.error("Update specialties error:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar especialidades",
        error: error.message,
      });
    }
  }
);

// Update benefits
router.put(
  "/benefits",
  protectCompany,
  [body("benefits").isArray().withMessage("Los beneficios deben ser un array")],
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

      const company = await Company.findByIdAndUpdate(
        req.user._id,
        { benefits: req.body.benefits },
        { new: true }
      );

      res.json({
        success: true,
        message: "Beneficios actualizados exitosamente",
        data: company.benefits,
      });
    } catch (error) {
      console.error("Update benefits error:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar beneficios",
        error: error.message,
      });
    }
  }
);

// Create job
router.post(
  "/jobs",
  protectCompany,
  [
    body("title").notEmpty().trim().withMessage("El título es requerido"),
    body("location").notEmpty().trim().withMessage("La ubicación es requerida"),
    body("type")
      .isIn([
        "Tiempo completo",
        "Tiempo parcial",
        "Contrato",
        "Freelance",
        "Prácticas",
      ])
      .withMessage("Tipo de empleo inválido"),
    body("salary").notEmpty().trim().withMessage("El salario es requerido"),
    body("description")
      .notEmpty()
      .trim()
      .withMessage("La descripción es requerida"),
    body("requirements")
      .isArray()
      .withMessage("Los requisitos deben ser un array"),
    body("responsibilities")
      .optional()
      .isArray()
      .withMessage("Las responsabilidades deben ser un array"),
    body("benefits")
      .optional()
      .isArray()
      .withMessage("Los beneficios deben ser un array"),
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

      const jobData = {
        ...req.body,
        company: req.user._id,
        companyName: req.user.name,
        logo: req.user.logo,
      };

      const job = await Job.create(jobData);

      // Update company job count
      await Company.findByIdAndUpdate(req.user._id, {
        $inc: {
          activeJobs: 1,
          totalJobs: 1,
        },
      });

      res.status(201).json({
        success: true,
        message: "Empleo creado exitosamente",
        data: job,
      });
    } catch (error) {
      console.error("Create job error:", error);
      res.status(500).json({
        success: false,
        message: "Error al crear empleo",
        error: error.message,
      });
    }
  }
);

// Get company jobs
router.get("/jobs", protectCompany, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let query = { company: req.user._id };
    if (status === "active") {
      query.isActive = true;
    } else if (status === "inactive") {
      query.isActive = false;
    }

    const jobs = await Job.find(query)
      .populate("applications.user", "name email avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Job.countDocuments(query);

    res.json({
      success: true,
      data: {
        jobs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Get company jobs error:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener empleos",
      error: error.message,
    });
  }
});

// Update job
router.put(
  "/jobs/:jobId",
  protectCompany,
  [
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("El título no puede estar vacío"),
    body("location")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("La ubicación no puede estar vacía"),
    body("type")
      .optional()
      .isIn([
        "Tiempo completo",
        "Tiempo parcial",
        "Contrato",
        "Freelance",
        "Prácticas",
      ])
      .withMessage("Tipo de empleo inválido"),
    body("salary")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("El salario no puede estar vacío"),
    body("description")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("La descripción no puede estar vacía"),
    body("requirements")
      .optional()
      .isArray()
      .withMessage("Los requisitos deben ser un array"),
    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("Estado activo debe ser booleano"),
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

      const { jobId } = req.params;

      const job = await Job.findOne({ _id: jobId, company: req.user._id });
      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Empleo no encontrado",
        });
      }

      const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
        new: true,
        runValidators: true,
      });

      res.json({
        success: true,
        message: "Empleo actualizado exitosamente",
        data: updatedJob,
      });
    } catch (error) {
      console.error("Update job error:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar empleo",
        error: error.message,
      });
    }
  }
);

// Delete job
router.delete("/jobs/:jobId", protectCompany, async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findOne({ _id: jobId, company: req.user._id });
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Empleo no encontrado",
      });
    }

    await Job.findByIdAndDelete(jobId);

    // Update company job count
    await Company.findByIdAndUpdate(req.user._id, { $inc: { activeJobs: -1 } });

    res.json({
      success: true,
      message: "Empleo eliminado exitosamente",
    });
  } catch (error) {
    console.error("Delete job error:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar empleo",
      error: error.message,
    });
  }
});

// Get job applications
router.get("/jobs/:jobId/applications", protectCompany, async (req, res) => {
  try {
    const { jobId } = req.params;
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    const job = await Job.findOne({
      _id: jobId,
      company: req.user._id,
    }).populate({
      path: "applications.user",
      select: "name email avatar phone location title experience skills",
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Empleo no encontrado",
      });
    }

    let applications = job.applications;
    if (status) {
      applications = applications.filter((app) => app.status === status);
    }

    const total = applications.length;
    const paginatedApplications = applications.slice(
      skip,
      skip + parseInt(limit)
    );

    res.json({
      success: true,
      data: {
        applications: paginatedApplications,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Get job applications error:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener aplicaciones",
      error: error.message,
    });
  }
});

// Update application status
router.put(
  "/jobs/:jobId/applications/:applicationId",
  protectCompany,
  [
    body("status")
      .isIn([
        "Aplicado",
        "En Revisión",
        "Entrevista Programada",
        "Aceptado",
        "Rechazado",
      ])
      .withMessage("Estado inválido"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Estado inválido",
          errors: errors.array(),
        });
      }

      const { jobId, applicationId } = req.params;
      const { status } = req.body;

      const job = await Job.findOne({ _id: jobId, company: req.user._id });
      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Empleo no encontrado",
        });
      }

      const application = job.applications.id(applicationId);
      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Aplicación no encontrada",
        });
      }

      application.status = status;
      application.lastUpdate = new Date();
      await job.save();

      res.json({
        success: true,
        message: "Estado de aplicación actualizado exitosamente",
        data: application,
      });
    } catch (error) {
      console.error("Update application status error:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar estado de aplicación",
        error: error.message,
      });
    }
  }
);

// Update company logo
router.put(
  "/logo",
  protectCompany,
  [body("logo").isURL().withMessage("URL de logo inválida")],
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

      const company = await Company.findByIdAndUpdate(
        req.user._id,
        { logo: req.body.logo },
        { new: true }
      );

      res.json({
        success: true,
        message: "Logo actualizado exitosamente",
        data: company.logo,
      });
    } catch (error) {
      console.error("Update logo error:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar logo",
        error: error.message,
      });
    }
  }
);

export default router;
