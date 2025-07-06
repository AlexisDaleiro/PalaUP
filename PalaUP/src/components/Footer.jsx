import { Link } from "react-router-dom";
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Logo and Description Row */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">PalaUP</span>
          </div>
          <p className="text-gray-400 mb-4 leading-relaxed text-sm">
            Conectamos talento con oportunidades. Encuentra tu trabajo ideal o
            encuentra al candidato perfecto para tu empresa.
          </p>
          <div className="flex space-x-3">
            <a
              href="#"
              className="text-gray-400 hover:text-amber-500 transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-amber-500 transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-amber-500 transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-amber-500 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick Links and For Employers Row */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Quick Links */}
          <div className="flex-1">
            <h3 className="text-white font-semibold text-base mb-3">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Buscar Empleos
                </Link>
              </li>
              <li>
                <Link
                  to="/post-job"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Publicar Empleo
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div className="flex-1">
            <h3 className="text-white font-semibold text-base mb-3">
              Para Empresas
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/post-job"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Publicar Empleo
                </Link>
              </li>
              <li>
                <Link
                  to="/company-profile"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Perfil de Empresa
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Planes y Precios
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Recursos para Empresas
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                >
                  Centro de Ayuda
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-6 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-xs mb-2 md:mb-0">
              © 2024 PalaUP. Todos los derechos reservados.
            </div>
            <div className="flex space-x-4 text-xs">
              <a
                href="#"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                Política de Privacidad
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                Términos de Servicio
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
