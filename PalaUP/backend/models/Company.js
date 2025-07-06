import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const companySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    industry: {
      type: String,
      required: [true, "Industry is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    founded: {
      type: String,
      trim: true,
    },
    employees: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop",
    },
    coverImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=300&fit=crop",
    },
    size: {
      type: String,
      enum: ["Pequeña", "Mediana", "Grande"],
      default: "Mediana",
    },
    type: {
      type: String,
      enum: ["Privada", "Pública", "Startup", "ONG"],
      default: "Privada",
    },
    specialties: [
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
    activeJobs: {
      type: Number,
      default: 0,
    },
    totalJobs: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["company", "admin"],
      default: "company",
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
companySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
companySchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON response
companySchema.methods.toJSON = function () {
  const company = this.toObject();
  delete company.password;
  return company;
};

export default mongoose.model("Company", companySchema);
