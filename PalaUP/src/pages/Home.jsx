import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Users,
  TrendingUp,
  Building,
  ArrowRight,
  Star,
  MapPin,
  Clock,
} from "lucide-react";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { jobService } from "../services/jobService";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const {
    data: jobs,
    loading,
    hasMore,
    loadMore,
  } = useInfiniteScroll(jobService.getJobs, 6);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() || location.trim()) {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.append("search", searchQuery.trim());
      if (location.trim()) params.append("location", location.trim());
      navigate(`/jobs?${params.toString()}`);
    }
  };

  const stats = [
    {
      icon: <Briefcase className="h-8 w-8 text-amber-500" />,
      number: "2,500+",
      label: "Empleos Activos",
      description: "Oportunidades disponibles",
    },
    {
      icon: <Users className="h-8 w-8 text-amber-500" />,
      number: "15,000+",
      label: "Candidatos",
      description: "Profesionales registrados",
    },
    {
      icon: <Building className="h-8 w-8 text-amber-500" />,
      number: "800+",
      label: "Empresas",
      description: "Empresas confían en nosotros",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-amber-500" />,
      number: "95%",
      label: "Tasa de Éxito",
      description: "Colocaciones exitosas",
    },
  ];

  const featuredJobs = jobs.slice(0, 6);

  return (
    <div className="flex-1 w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Encuentra tu
              <span className="gradient-text"> trabajo ideal</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Conectamos talento con oportunidades. Miles de empleos esperando
              por ti en las mejores empresas.
            </p>
          </div>

          {/* Search Form */}
          <div className="w-full flex justify-center mb-16">
            <form onSubmit={handleSearch} className="w-full max-w-4xl">
              <div className="flex flex-col md:flex-row gap-4 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="¿Qué trabajo buscas?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400 text-lg"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="¿Dónde?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400 text-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover-from-amber-600 hover-to-orange-600 transition-all transform hover-scale-105 shadow-lg"
                >
                  Buscar Empleos
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-800/30 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              PalaUP en números
            </h2>
            <p className="text-xl text-gray-300">
              La plataforma líder en búsqueda de empleo
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover-border-amber-500/50 transition-all hover-scale-105"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-amber-500 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 px-4 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Empleos Destacados
              </h2>
              <p className="text-xl text-gray-300">
                Las mejores oportunidades seleccionadas para ti
              </p>
            </div>
            <Link
              to="/jobs"
              className="hidden md:flex items-center space-x-2 px-6 py-3 bg-amber-500 text-white rounded-xl hover-bg-amber-600 transition-colors font-semibold"
            >
              <span>Ver todos</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 hover-border-amber-500/50 transition-all hover-scale-105 cursor-pointer shadow-lg"
                onClick={() => navigate(`/job/${job.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={job.company.logo}
                      alt={job.company.name}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-600"
                    />
                    <div>
                      <h3 className="font-semibold text-white group-hover-text-amber-500 transition-colors line-clamp-2">
                        {job.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {job.company.name}
                      </p>
                    </div>
                  </div>
                  {job.featured && (
                    <Star className="h-5 w-5 text-amber-500 fill-current" />
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{job.type}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-amber-500">
                    {job.salary}
                  </span>
                  <span className="text-sm text-gray-400">
                    Hace {job.postedAgo}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center md:hidden">
            <Link
              to="/jobs"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-amber-500 text-white rounded-xl hover-bg-amber-600 transition-colors font-semibold"
            >
              <span>Ver todos los empleos</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para encontrar tu próximo trabajo?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a miles de profesionales que ya encontraron su trabajo ideal
            en PalaUP
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/jobs"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover-from-amber-600 hover-to-orange-600 transition-all transform hover-scale-105 shadow-lg"
            >
              Buscar Empleos
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-transparent border-2 border-amber-500 text-amber-500 font-semibold rounded-xl hover-bg-amber-500 hover-text-white transition-all transform hover-scale-105"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
