// Mock data for jobs
const mockJobs = [
  {
    id: 1,
    title: "Desarrollador Frontend React",
    company: "TechCorp",
    location: "Madrid, España",
    type: "Tiempo completo",
    salary: "€35,000 - €45,000",
    description:
      "Buscamos un desarrollador Frontend con experiencia en React para unirse a nuestro equipo de desarrollo...",
    requirements: ["React", "JavaScript", "CSS", "Git"],
    postedDate: "2024-01-15",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "Ingeniero de Software Backend",
    company: "DataFlow",
    location: "Barcelona, España",
    type: "Tiempo completo",
    salary: "€40,000 - €55,000",
    description:
      "Desarrollador backend con experiencia en Node.js y bases de datos para proyectos escalables...",
    requirements: ["Node.js", "PostgreSQL", "Express", "MongoDB"],
    postedDate: "2024-01-14",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=50&h=50&fit=crop",
    featured: true,
  },
  {
    id: 3,
    title: "Diseñador UX/UI",
    company: "CreativeStudio",
    location: "Valencia, España",
    type: "Contrato",
    salary: "€30,000 - €40,000",
    description:
      "Diseñador creativo para mejorar la experiencia de usuario en aplicaciones móviles y web...",
    requirements: [
      "Figma",
      "Adobe Creative Suite",
      "Prototipado",
      "Investigación",
    ],
    postedDate: "2024-01-13",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=50&h=50&fit=crop",
    featured: true,
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Sevilla, España",
    type: "Tiempo completo",
    salary: "€45,000 - €60,000",
    description:
      "Ingeniero DevOps para gestionar infraestructura en la nube y automatizar procesos de CI/CD...",
    requirements: ["AWS", "Docker", "Kubernetes", "Terraform"],
    postedDate: "2024-01-12",
    logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=50&h=50&fit=crop",
    featured: false,
  },
  {
    id: 5,
    title: "Analista de Datos",
    company: "AnalyticsPro",
    location: "Bilbao, España",
    type: "Tiempo completo",
    salary: "€35,000 - €50,000",
    description:
      "Analista para extraer insights de datos empresariales y crear reportes automatizados...",
    requirements: ["Python", "SQL", "Tableau", "Excel"],
    postedDate: "2024-01-11",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=50&h=50&fit=crop",
    featured: false,
  },
  {
    id: 6,
    title: "Desarrollador Full Stack",
    company: "InnovateTech",
    location: "Málaga, España",
    type: "Tiempo completo",
    salary: "€40,000 - €55,000",
    description:
      "Desarrollador full stack para crear aplicaciones web completas desde el frontend hasta el backend...",
    requirements: ["React", "Node.js", "MongoDB", "Express"],
    postedDate: "2024-01-10",
    logo: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=50&h=50&fit=crop",
    featured: false,
  },
  {
    id: 7,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Madrid, España",
    type: "Tiempo completo",
    salary: "€50,000 - €70,000",
    description:
      "Product Manager para liderar el desarrollo de productos digitales innovadores...",
    requirements: ["Agile", "Scrum", "Product Strategy", "User Research"],
    postedDate: "2024-01-09",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
    featured: false,
  },
  {
    id: 8,
    title: "Desarrollador Mobile",
    company: "AppStudio",
    location: "Barcelona, España",
    type: "Tiempo completo",
    salary: "€45,000 - €60,000",
    description:
      "Desarrollador de aplicaciones móviles nativas para iOS y Android...",
    requirements: ["Swift", "Kotlin", "React Native", "Firebase"],
    postedDate: "2024-01-08",
    logo: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=50&h=50&fit=crop",
    featured: false,
  },
  {
    id: 9,
    title: "QA Engineer",
    company: "QualityTech",
    location: "Valencia, España",
    type: "Tiempo completo",
    salary: "€35,000 - €45,000",
    description:
      "Ingeniero de calidad para asegurar la excelencia en el desarrollo de software...",
    requirements: ["Selenium", "Jest", "Cypress", "Manual Testing"],
    postedDate: "2024-01-07",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=50&h=50&fit=crop",
    featured: false,
  },
  {
    id: 10,
    title: "Desarrollador Python",
    company: "DataScience Corp",
    location: "Madrid, España",
    type: "Tiempo completo",
    salary: "€40,000 - €55,000",
    description:
      "Desarrollador Python especializado en ciencia de datos y machine learning...",
    requirements: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    postedDate: "2024-01-06",
    logo: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=50&h=50&fit=crop",
    featured: false,
  },
  {
    id: 11,
    title: "Frontend Developer",
    company: "WebSolutions",
    location: "Bilbao, España",
    type: "Contrato",
    salary: "€30,000 - €40,000",
    description:
      "Desarrollador frontend para crear interfaces web modernas y responsivas...",
    requirements: ["HTML", "CSS", "JavaScript", "Vue.js"],
    postedDate: "2024-01-05",
    logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=50&h=50&fit=crop",
    featured: false,
  },
  {
    id: 12,
    title: "Backend Developer",
    company: "ServerTech",
    location: "Sevilla, España",
    type: "Tiempo completo",
    salary: "€40,000 - €55,000",
    description:
      "Desarrollador backend para crear APIs robustas y escalables...",
    requirements: ["Java", "Spring Boot", "MySQL", "Redis"],
    postedDate: "2024-01-04",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=50&h=50&fit=crop",
    featured: false,
  },
  {
    id: 13,
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Málaga, España",
    type: "Freelance",
    salary: "€25,000 - €35,000",
    description:
      "Diseñador UI/UX para crear experiencias digitales excepcionales...",
    requirements: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
    postedDate: "2024-01-03",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=50&h=50&fit=crop",
    featured: false,
  },
  {
    id: 14,
    title: "Cloud Architect",
    company: "CloudSolutions",
    location: "Barcelona, España",
    type: "Tiempo completo",
    salary: "€60,000 - €80,000",
    description:
      "Arquitecto de nube para diseñar infraestructuras escalables y seguras...",
    requirements: ["AWS", "Azure", "GCP", "Terraform"],
    postedDate: "2024-01-02",
    logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=50&h=50&fit=crop",
    featured: false,
  },
  {
    id: 15,
    title: "Data Engineer",
    company: "BigData Inc",
    location: "Madrid, España",
    type: "Tiempo completo",
    salary: "€50,000 - €65,000",
    description:
      "Ingeniero de datos para construir pipelines de datos y sistemas de analytics...",
    requirements: ["Apache Spark", "Kafka", "Hadoop", "Python"],
    postedDate: "2024-01-01",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=50&h=50&fit=crop",
    featured: false,
  },
];

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const jobService = {
  // Get featured jobs for homepage
  async getFeaturedJobs() {
    await delay(500);
    return mockJobs.filter((job) => job.featured);
  },

  // Get all jobs with pagination for infinite scroll
  async getJobs(page = 1, limit = 6, filters = {}) {
    await delay(800);

    let filteredJobs = [...mockJobs];

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.location) {
      filteredJobs = filteredJobs.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.type) {
      filteredJobs = filteredJobs.filter((job) => job.type === filters.type);
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    const hasMore = endIndex < filteredJobs.length;

    return {
      jobs: paginatedJobs,
      hasMore,
      total: filteredJobs.length,
      currentPage: page,
    };
  },

  // Get job by ID
  async getJobById(id) {
    await delay(300);
    return mockJobs.find((job) => job.id === parseInt(id));
  },

  // Search jobs
  async searchJobs(query, filters = {}) {
    await delay(600);

    let filteredJobs = [...mockJobs];

    if (query) {
      const searchTerm = query.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply additional filters
    if (filters.location) {
      filteredJobs = filteredJobs.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.type) {
      filteredJobs = filteredJobs.filter((job) => job.type === filters.type);
    }

    return filteredJobs;
  },
};

export default jobService;
