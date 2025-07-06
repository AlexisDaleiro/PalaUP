import { useState } from "react";
import {
  User,
  Settings,
  LogOut,
  Edit,
  Camera,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    phone: "+34 612 345 678",
    location: "Madrid, España",
    title: "Desarrollador Frontend Senior",
    experience: "5 años",
    skills: ["React", "JavaScript", "TypeScript", "CSS", "Node.js"],
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  });

  const [editData, setEditData] = useState(userData);

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(userData);
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
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Sobre Mí
              </h2>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus-outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título Profesional
                    </label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus-outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus-outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus-outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) =>
                        setEditData({ ...editData, location: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring-2 focus-outline-none"
                    />
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-amber-500 text-white rounded-lg hover-bg-amber-600 transition-colors"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover-bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Desarrollador Frontend apasionado con más de 5 años de
                    experiencia en la creación de aplicaciones web modernas y
                    responsivas. Especializado en React, JavaScript y
                    TypeScript, con un fuerte enfoque en la experiencia del
                    usuario y el rendimiento.
                  </p>
                  <div className="flex items-center text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    <span>Experiencia: {userData.experience}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Habilidades
              </h2>
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

            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Aplicaciones Recientes
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Desarrollador Frontend React
                    </h3>
                    <p className="text-gray-600">TechCorp • Madrid</p>
                    <p className="text-sm text-gray-500">
                      Aplicado hace 2 días
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    En Revisión
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Ingeniero de Software
                    </h3>
                    <p className="text-gray-600">DataFlow • Barcelona</p>
                    <p className="text-sm text-gray-500">
                      Aplicado hace 1 semana
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Aceptado
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Estadísticas
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Aplicaciones</span>
                  <span className="font-semibold text-gray-900">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Entrevistas</span>
                  <span className="font-semibold text-gray-900">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ofertas</span>
                  <span className="font-semibold text-gray-900">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Perfil Completo</span>
                  <span className="font-semibold text-amber-600">85%</span>
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
                  <User className="h-4 w-4 mr-3" />
                  Actualizar CV
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

export default UserProfile;
