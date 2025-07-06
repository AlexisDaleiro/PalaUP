import { useState, useEffect } from "react";
import {
  Building,
  MapPin,
  Users,
  Globe,
  Mail,
  Phone,
  Edit,
  Plus,
  Briefcase,
  Camera,
  Settings,
} from "lucide-react";

const CompanyProfile = () => {
  const [company, setCompany] = useState({
    id: 1,
    name: "TechCorp Solutions",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=300&fit=crop",
    description:
      "Somos una empresa líder en desarrollo de software con más de 10 años de experiencia en el mercado. Nos especializamos en soluciones digitales innovadoras para empresas de todos los tamaños.",
    industry: "Tecnología",
    founded: "2014",
    employees: "150-300",
    location: "Madrid, España",
    website: "www.techcorp.com",
    email: "contact@techcorp.com",
    phone: "+34 91 123 4567",
    size: "Mediana",
    type: "Privada",
    specialties: ["Desarrollo Web", "Apps Móviles", "Cloud Computing", "IA/ML"],
    benefits: [
      "Seguro médico",
      "Horario flexible",
      "Trabajo remoto",
      "Desarrollo profesional",
    ],
    activeJobs: 8,
  });

  const [jobs, setJobs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(company);

  useEffect(() => {
    // Simular carga de trabajos de la empresa
    const companyJobs = [
      {
        id: 1,
        title: "Desarrollador Frontend React",
        type: "Tiempo completo",
        location: "Madrid",
        salary: "€35,000 - €45,000",
        postedDate: "2024-01-15",
        applicants: 24,
      },
      {
        id: 2,
        title: "Ingeniero DevOps",
        type: "Tiempo completo",
        location: "Madrid",
        salary: "€45,000 - €60,000",
        postedDate: "2024-01-14",
        applicants: 18,
      },
      {
        id: 3,
        title: "Diseñador UX/UI",
        type: "Contrato",
        location: "Madrid",
        salary: "€30,000 - €40,000",
        postedDate: "2024-01-13",
        applicants: 31,
      },
    ];
    setJobs(companyJobs);
  }, []);

  const handleSave = () => {
    setCompany(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(company);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg company-logo"
                />
                <button className="absolute bottom-0 right-0 bg-amber-500 text-white p-2 rounded-full hover-bg-amber-600 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-20 pb-6 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {company.name}
                </h1>
                <p className="text-xl text-gray-600 mb-4">{company.industry}</p>
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{company.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{company.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{company.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center px-4 py-2 bg-amber-500 text-white rounded-lg hover-bg-amber-600 transition-colors"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Cancelar" : "Editar"}
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover-bg-gray-50 transition-colors">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Jobs */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Empleos Activos
                </h3>
                <button className="flex items-center px-4 py-2 bg-amber-500 text-white rounded-lg hover-bg-amber-600 transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  Publicar Nuevo
                </button>
              </div>

              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-lg p-4 hover-border-amber-400 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {job.title}
                        </h4>
                        <div className="flex items-center space-x-4 text-gray-600 mt-2">
                          <span className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {job.type}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </span>
                          <span>{job.salary}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Publicado{" "}
                          {new Date(job.postedDate).toLocaleDateString()} •{" "}
                          {job.applicants} candidatos
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-amber-100 text-amber-800 rounded text-sm hover-bg-amber-200">
                          Editar
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover-bg-gray-200">
                          Ver Candidatos
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Specialties */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Especialidades
              </h3>
              <div className="flex flex-wrap gap-3">
                {company.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Información de Contacto
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-amber-600" />
                  <span className="text-gray-700">{company.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-amber-600" />
                  <span className="text-gray-700">{company.phone}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-3 text-amber-600" />
                  <span className="text-gray-700">{company.website}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3 text-amber-600" />
                  <span className="text-gray-700">{company.location}</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Beneficios
              </h3>
              <div className="space-y-2">
                {company.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Acciones Rápidas
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center px-4 py-3 bg-amber-500 text-white rounded-lg hover-bg-amber-600 transition-colors">
                  <Plus className="h-4 w-4 mr-3" />
                  Publicar Empleo
                </button>
                <button className="w-full flex items-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover-bg-gray-50 transition-colors">
                  <Users className="h-4 w-4 mr-3" />
                  Ver Candidatos
                </button>
                <button className="w-full flex items-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover-bg-gray-50 transition-colors">
                  <Edit className="h-4 w-4 mr-3" />
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
