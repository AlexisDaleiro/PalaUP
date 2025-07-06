import { useState, useEffect } from "react";
import {
  User,
  Settings,
  LogOut,
  Edit,
  Camera,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Award,
  BookOpen,
} from "lucide-react";

const EmployeeProfile = () => {
  const [userData, setUserData] = useState({
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    phone: "+34 612 345 678",
    location: "Madrid, España",
    title: "Desarrollador Frontend Senior",
    experience: "5 años",
    education: "Ingeniería Informática - Universidad Complutense",
    skills: [
      "React",
      "JavaScript",
      "TypeScript",
      "CSS",
      "Node.js",
      "Git",
      "Docker",
    ],
    languages: [
      "Español (Nativo)",
      "Inglés (Avanzado)",
      "Francés (Intermedio)",
    ],
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=300&fit=crop",
  });

  const [applications, setApplications] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userData);

  useEffect(() => {
    // Simular carga de aplicaciones
    const mockApplications = [
      {
        id: 1,
        jobTitle: "Desarrollador Frontend React",
        company: "TechCorp",
        status: "En Revisión",
        appliedDate: "2024-01-15",
        lastUpdate: "2024-01-16",
      },
      {
        id: 2,
        jobTitle: "Ingeniero de Software",
        company: "DataFlow",
        status: "Entrevista Programada",
        appliedDate: "2024-01-10",
        lastUpdate: "2024-01-14",
      },
      {
        id: 3,
        jobTitle: "Desarrollador Full Stack",
        company: "InnovateTech",
        status: "Rechazado",
        appliedDate: "2024-01-05",
        lastUpdate: "2024-01-12",
      },
      {
        id: 4,
        jobTitle: "Frontend Developer",
        company: "StartupXYZ",
        status: "Aceptado",
        appliedDate: "2024-01-01",
        lastUpdate: "2024-01-08",
      },
    ];
    setApplications(mockApplications);
  }, []);

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Aceptado":
        return "bg-green-100 text-green-800";
      case "En Revisión":
        return "bg-yellow-100 text-yellow-800";
      case "Entrevista Programada":
        return "bg-blue-100 text-blue-800";
      case "Rechazado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg profile-avatar"
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
                  {userData.name}
                </h1>
                <p className="text-xl text-gray-600 mb-4">{userData.title}</p>
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{userData.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{userData.location}</span>
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
            {/* Job Applications */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Mis Aplicaciones
              </h3>

              <div className="space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="border border-gray-200 rounded-lg p-4 hover-border-amber-400 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {app.jobTitle}
                        </h4>
                        <p className="text-gray-600">{app.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                          <span>
                            Aplicado:{" "}
                            {new Date(app.appliedDate).toLocaleDateString()}
                          </span>
                          <span>
                            Última actualización:{" "}
                            {new Date(app.lastUpdate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                        <button className="px-3 py-1 bg-amber-100 text-amber-800 rounded text-sm hover-bg-amber-200">
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Habilidades Técnicas
              </h3>
              <div className="flex flex-wrap gap-3">
                {userData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Idiomas</h3>
              <div className="space-y-3">
                {userData.languages.map((language, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-700">{language}</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${
                            i <
                            (language.includes("Nativo")
                              ? 5
                              : language.includes("Avanzado")
                              ? 4
                              : 3)
                              ? "bg-amber-500"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
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
                  <span className="text-gray-700">{userData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-amber-600" />
                  <span className="text-gray-700">{userData.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3 text-amber-600" />
                  <span className="text-gray-700">{userData.location}</span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Educación
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {userData.education}
                  </h4>
                  <p className="text-sm text-gray-600">2015 - 2019</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Acciones Rápidas
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center px-4 py-3 bg-amber-500 text-white rounded-lg hover-bg-amber-600 transition-colors">
                  <BookOpen className="h-4 w-4 mr-3" />
                  Actualizar CV
                </button>
                <button className="w-full flex items-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover-bg-gray-50 transition-colors">
                  <Briefcase className="h-4 w-4 mr-3" />
                  Buscar Empleos
                </button>
                <button className="w-full flex items-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover-bg-gray-50 transition-colors">
                  <Settings className="h-4 w-4 mr-3" />
                  Configuración
                </button>
                <button className="w-full flex items-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover-bg-gray-50 transition-colors">
                  <LogOut className="h-4 w-4 mr-3" />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
