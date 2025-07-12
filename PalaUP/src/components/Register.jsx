import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building,
  MapPin,
  Phone,
  Globe,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [activeTab, setActiveTab] = useState("employee");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    title: "",
  });

  const [companyData, setCompanyData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    industry: "",
    location: "",
    website: "",
    phone: "",
  });

  const { registerEmployee, registerCompany } = useAuth();
  const navigate = useNavigate();

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const validateForm = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    if (data.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    return true;
  };

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateForm(employeeData)) {
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...data } = employeeData;
      const result = await registerEmployee(data);

      if (result.success) {
        setSuccess("¡Empleado registrado exitosamente!");
        setTimeout(() => {
          navigate("/employee-profile");
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Error al registrar empleado. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateForm(companyData)) {
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...data } = companyData;
      const result = await registerCompany(data);

      if (result.success) {
        setSuccess("¡Empresa registrada exitosamente!");
        setTimeout(() => {
          navigate("/company-profile");
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Error al registrar empresa. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 mx-auto">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Únete a PalaUP</h2>
          <p className="text-gray-300">Crea tu cuenta y comienza tu viaje</p>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-700/30">
          <div className="flex space-x-1 mb-6 bg-gray-700/50 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("employee")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "employee"
                  ? "bg-gray-600 text-amber-400 shadow-sm"
                  : "text-gray-300 hover-text-white"
              }`}
            >
              <User className="h-4 w-4 inline mr-2" />
              Empleado
            </button>
            <button
              onClick={() => setActiveTab("company")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "company"
                  ? "bg-gray-600 text-amber-400 shadow-sm"
                  : "text-gray-300 hover-text-white"
              }`}
            >
              <Building className="h-4 w-4 inline mr-2" />
              Empresa
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
              <span className="text-red-300">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
              <span className="text-green-300">{success}</span>
            </div>
          )}

          {/* Employee Registration Form */}
          {activeTab === "employee" && (
            <form onSubmit={handleEmployeeSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="employee-name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    id="employee-name"
                    name="name"
                    type="text"
                    required
                    value={employeeData.name}
                    onChange={handleEmployeeChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                    placeholder="Tu nombre completo"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="employee-email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    id="employee-email"
                    name="email"
                    type="email"
                    required
                    value={employeeData.email}
                    onChange={handleEmployeeChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="employee-title"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Título Profesional
                </label>
                <input
                  id="employee-title"
                  name="title"
                  type="text"
                  value={employeeData.title}
                  onChange={handleEmployeeChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                  placeholder="Ej: Desarrollador Frontend"
                />
              </div>

              <div>
                <label
                  htmlFor="employee-phone"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    id="employee-phone"
                    name="phone"
                    type="tel"
                    value={employeeData.phone}
                    onChange={handleEmployeeChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                    placeholder="+34 612 345 678"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="employee-location"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Ubicación
                </label>
                <input
                  id="employee-location"
                  name="location"
                  type="text"
                  value={employeeData.location}
                  onChange={handleEmployeeChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                  placeholder="Madrid, España"
                />
              </div>

              <div>
                <label
                  htmlFor="employee-password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    id="employee-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={employeeData.password}
                    onChange={handleEmployeeChange}
                    className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover-text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="employee-confirm-password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    id="employee-confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={employeeData.confirmPassword}
                    onChange={handleEmployeeChange}
                    className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover-text-gray-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg font-semibold hover-bg-amber-600 focus-ring-2 focus-ring-amber-500 focus-outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Registrando..." : "Registrar Empleado"}
              </button>
            </form>
          )}

          {/* Company Registration Form */}
          {activeTab === "company" && (
            <form onSubmit={handleCompanySubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="company-name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Nombre de la Empresa
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    id="company-name"
                    name="name"
                    type="text"
                    required
                    value={companyData.name}
                    onChange={handleCompanyChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company-email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    id="company-email"
                    name="email"
                    type="email"
                    required
                    value={companyData.email}
                    onChange={handleCompanyChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                    placeholder="contacto@empresa.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company-industry"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Industria
                </label>
                <input
                  id="company-industry"
                  name="industry"
                  type="text"
                  required
                  value={companyData.industry}
                  onChange={handleCompanyChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                  placeholder="Ej: Tecnología, Salud, Finanzas"
                />
              </div>

              <div>
                <label
                  htmlFor="company-location"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Ubicación
                </label>
                <input
                  id="company-location"
                  name="location"
                  type="text"
                  required
                  value={companyData.location}
                  onChange={handleCompanyChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                  placeholder="Madrid, España"
                />
              </div>

              <div>
                <label
                  htmlFor="company-website"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Sitio Web
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    id="company-website"
                    name="website"
                    type="url"
                    value={companyData.website}
                    onChange={handleCompanyChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                    placeholder="https://www.empresa.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company-phone"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    id="company-phone"
                    name="phone"
                    type="tel"
                    value={companyData.phone}
                    onChange={handleCompanyChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                    placeholder="+34 91 123 4567"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company-password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    id="company-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={companyData.password}
                    onChange={handleCompanyChange}
                    className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover-text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="company-confirm-password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                    id="company-confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={companyData.confirmPassword}
                    onChange={handleCompanyChange}
                    className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover-text-gray-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg font-semibold hover-bg-amber-600 focus-ring-2 focus-ring-amber-500 focus-outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Registrando..." : "Registrar Empresa"}
              </button>
            </form>
          )}

          {/* Links */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="text-amber-500 hover-text-amber-400 font-medium"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
