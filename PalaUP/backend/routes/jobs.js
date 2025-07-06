import express from "express";
import Job from "../models/Job.js";
import Company from "../models/Company.js";
import { optionalAuth } from "../middleware/auth.js";

const router = express.Router();

// Get all jobs with pagination and filters
router.get("/", optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      location,
      type,
      experience,
      remote,
      featured,
    } = req.query;

    const skip = (page - 1) * limit;
    let query = { isActive: true };

    // Search filter
    if (search) {
      query.$text = { $search: search };
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Type filter
    if (type) {
      query.type = type;
    }

    // Experience filter
    if (experience) {
      query.experienceLevel = experience;
    }

    // Remote filter
    if (remote === "true") {
      query.remote = true;
    }

    // Featured filter
    if (featured === "true") {
      query.featured = true;
    }

    const jobs = await Job.find(query)
      .populate("company", "name logo industry")
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Job.countDocuments(query);

    // Increment views for each job
    if (jobs.length > 0) {
      const jobIds = jobs.map((job) => job._id);
      await Job.updateMany({ _id: { $in: jobIds } }, { $inc: { views: 1 } });
    }

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
    console.error("Get jobs error:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener empleos",
      error: error.message,
    });
  }
});

// Get featured jobs
router.get("/featured", async (req, res) => {
  try {
    const jobs = await Job.find({
      isActive: true,
      featured: true,
    })
      .populate("company", "name logo industry")
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("Get featured jobs error:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener empleos destacados",
      error: error.message,
    });
  }
});

// Get job by ID
router.get("/:id", optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id)
      .populate(
        "company",
        "name logo industry description website phone location"
      )
      .populate("applications.user", "name email avatar");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Empleo no encontrado",
      });
    }

    if (!job.isActive) {
      return res.status(404).json({
        success: false,
        message: "Este empleo ya no está disponible",
      });
    }

    // Increment views
    await Job.findByIdAndUpdate(id, { $inc: { views: 1 } });

    // Get related jobs
    const relatedJobs = await Job.find({
      _id: { $ne: id },
      company: job.company,
      isActive: true,
    })
      .populate("company", "name logo")
      .limit(3);

    res.json({
      success: true,
      data: {
        job,
        relatedJobs,
      },
    });
  } catch (error) {
    console.error("Get job by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener empleo",
      error: error.message,
    });
  }
});

// Search jobs
router.get("/search", async (req, res) => {
  try {
    const { q, location, type, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = { isActive: true };

    if (q) {
      query.$text = { $search: q };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (type) {
      query.type = type;
    }

    const jobs = await Job.find(query)
      .populate("company", "name logo industry")
      .sort({ score: { $meta: "textScore" }, createdAt: -1 })
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
    console.error("Search jobs error:", error);
    res.status(500).json({
      success: false,
      message: "Error al buscar empleos",
      error: error.message,
    });
  }
});

// Get job statistics
router.get("/stats/overview", async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments({ isActive: true });
    const featuredJobs = await Job.countDocuments({
      isActive: true,
      featured: true,
    });
    const totalApplications = await Job.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, total: { $sum: "$applicationsCount" } } },
    ]);

    const topCompanies = await Job.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$company", jobCount: { $sum: 1 } } },
      { $sort: { jobCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "companies",
          localField: "_id",
          foreignField: "_id",
          as: "company",
        },
      },
      { $unwind: "$company" },
      { $project: { name: "$company.name", jobCount: 1 } },
    ]);

    res.json({
      success: true,
      data: {
        totalJobs,
        featuredJobs,
        totalApplications: totalApplications[0]?.total || 0,
        topCompanies,
      },
    });
  } catch (error) {
    console.error("Get job stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener estadísticas",
      error: error.message,
    });
  }
});

export default router;
