import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Job type is required"],
      enum: [
        "Tiempo completo",
        "Tiempo parcial",
        "Contrato",
        "Freelance",
        "Prácticas",
      ],
    },
    salary: {
      type: String,
      required: [true, "Salary is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    responsibilities: [
      {
        type: String,
        trim: true,
      },
    ],
    benefits: [
      {
        type: String,
        trim: true,
      },
    ],
    logo: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    applications: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: [
            "Aplicado",
            "En Revisión",
            "Entrevista Programada",
            "Aceptado",
            "Rechazado",
          ],
          default: "Aplicado",
        },
        appliedDate: {
          type: Date,
          default: Date.now,
        },
        lastUpdate: {
          type: Date,
          default: Date.now,
        },
        cv: {
          type: String,
        },
        coverLetter: {
          type: String,
        },
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    applicationsCount: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    experienceLevel: {
      type: String,
      enum: ["Junior", "Mid-level", "Senior", "Lead", "Executive"],
      default: "Mid-level",
    },
    remote: {
      type: Boolean,
      default: false,
    },
    hybrid: {
      type: Boolean,
      default: false,
    },
    onsite: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
jobSchema.index({
  title: "text",
  description: "text",
  companyName: "text",
  location: "text",
  requirements: "text",
});

// Update applications count
jobSchema.methods.updateApplicationsCount = function () {
  this.applicationsCount = this.applications.length;
  return this.save();
};

// Add application
jobSchema.methods.addApplication = function (
  userId,
  cv = null,
  coverLetter = null
) {
  const existingApplication = this.applications.find(
    (app) => app.user.toString() === userId.toString()
  );

  if (existingApplication) {
    throw new Error("Ya has aplicado a este empleo");
  }

  this.applications.push({
    user: userId,
    cv,
    coverLetter,
  });

  this.applicationsCount = this.applications.length;
  return this.save();
};

// Update application status
jobSchema.methods.updateApplicationStatus = function (userId, status) {
  const application = this.applications.find(
    (app) => app.user.toString() === userId.toString()
  );

  if (!application) {
    throw new Error("Aplicación no encontrada");
  }

  application.status = status;
  application.lastUpdate = new Date();
  return this.save();
};

export default mongoose.model("Job", jobSchema);
