import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, Building, Briefcase, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Header = () => {
  const { user, isAuthenticated, isCompany, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Pages where we don't want to show the search bar
  const hideSearchPages = ["/jobs", "/", "/login", "/register"];
  const shouldShowSearch = !hideSearchPages.includes(location.pathname);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    if (isCompany) {
      navigate("/company-profile");
    } else {
      navigate("/employee-profile");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <header className="bg-gray-900 shadow-lg border-b border-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">PalaUP</span>
            </Link>
          </div>

          <nav className="flex items-center space-x-6 md:space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover-text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link
              to="/jobs"
              className="text-gray-300 hover-text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Empleos
            </Link>
            {isAuthenticated && isCompany && (
              <Link
                to="/post-job"
                className="text-gray-300 hover-text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Publicar Empleo
              </Link>
            )}
          </nav>

          {shouldShowSearch && (
            <div className="hidden sm:block relative flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="relative flex">
                <input
                  type="text"
                  placeholder="Buscar empleos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 text-white rounded-r-lg hover-bg-amber-600 transition-colors font-semibold"
                >
                  Buscar
                </button>
              </form>
            </div>
          )}

          <div className="flex items-center space-x-3 md:space-x-4">
            {isAuthenticated ? (
              <>
                <span className="hidden md:block text-sm text-gray-300">
                  Hola, {user?.name || "Usuario"}
                </span>
                <button
                  onClick={handleProfileClick}
                  className="flex items-center justify-center w-8 h-8 bg-amber-500 text-white rounded-full hover-bg-amber-600 transition-colors"
                  title={isCompany ? "Perfil de Empresa" : "Perfil de Empleado"}
                >
                  {isCompany ? (
                    <Building className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center px-3 py-2 text-gray-300 hover-text-amber-500 rounded-md text-sm font-medium transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="h-4 w-4 md:mr-1" />
                  <span className="hidden md:inline">Salir</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover-text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover-bg-amber-600 transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>

        {shouldShowSearch && (
          <div className="sm:hidden border-t border-gray-800 py-3">
            <form onSubmit={handleSearch} className="relative flex">
              <input
                type="text"
                placeholder="Buscar empleos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 text-white rounded-r-lg hover-bg-amber-600 transition-colors font-semibold"
              >
                Buscar
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
