import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Briefcase, DollarSign, Filter, X, MapPin, Clock } from "lucide-react";
import { jobService } from "../services/jobService";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const JobList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: jobs,
    loading,
    hasMore,
    error,
    refresh,
  } = useInfiniteScroll(jobService.getJobs, filters);

  const jobTypes = [
    "Tiempo completo",
    "Tiempo parcial",
    "Contrato",
    "Freelance",
    "Prácticas",
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update URL params
    const newSearchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) newSearchParams.set(k, v);
    });
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    setFilters({ search: "", location: "", type: "" });
    setSearchParams({});
  };

  const hasActiveFilters = filters.search || filters.location || filters.type;

  return (
    <div className="flex-1 w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            {hasActiveFilters ? "Resultados de búsqueda" : "Todos los empleos"}
          </h1>
          <p className="text-gray-300">{jobs.length} empleos encontrados</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-gray-700/30">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Buscar empleos, empresas o habilidades..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                />
              </div>

              {/* Location */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Ubicación"
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100 placeholder-gray-400"
                />
              </div>

              {/* Job Type */}
              <div className="flex-1">
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none text-gray-100"
                >
                  <option value="">Tipo de empleo</option>
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="bg-amber-500 text-white px-6 py-3 rounded-lg hover-bg-amber-600 transition-colors font-semibold flex items-center justify-center"
              >
                Buscar
              </button>

              {/* Filter Toggle */}
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg hover-bg-gray-600 transition-colors text-white"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filtros
              </button>
            </div>
          </form>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.search && (
                <span className="flex items-center px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm border border-amber-500/30">
                  Búsqueda: {filters.search}
                  <button
                    onClick={() => handleFilterChange("search", "")}
                    className="ml-2 hover-text-amber-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.location && (
                <span className="flex items-center px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm border border-amber-500/30">
                  Ubicación: {filters.location}
                  <button
                    onClick={() => handleFilterChange("location", "")}
                    className="ml-2 hover-text-amber-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.type && (
                <span className="flex items-center px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm border border-amber-500/30">
                  Tipo: {filters.type}
                  <button
                    onClick={() => handleFilterChange("type", "")}
                    className="ml-2 hover-text-amber-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="px-3 py-1 text-gray-400 hover-text-gray-300 text-sm underline"
              >
                Limpiar todos
              </button>
            </div>
          )}
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 hover-shadow-xl transition-all hover-scale-105 border border-gray-700/30"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-gray-600"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-400 font-medium">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-amber-500 font-semibold">
                        {job.salary}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(job.postedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{job.type}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.requirements.slice(0, 4).map((req, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-amber-500/20 text-amber-400 text-sm rounded-full border border-amber-500/30"
                      >
                        {req}
                      </span>
                    ))}
                    {job.requirements.length > 4 && (
                      <span className="px-3 py-1 bg-gray-700/50 text-gray-400 text-sm rounded-full border border-gray-600">
                        +{job.requirements.length - 4} más
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <Link
                      to={`/job/${job.id}`}
                      className="bg-amber-500 text-white px-6 py-2 rounded-lg font-semibold hover-bg-amber-600 transition-colors"
                    >
                      Ver Detalles
                    </Link>
                    <button className="text-amber-500 hover-text-amber-400 font-medium">
                      Aplicar Ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
              <span className="ml-3 text-gray-400">
                Cargando más empleos...
              </span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-400 mb-4">
                Error al cargar los empleos: {error}
              </p>
              <button
                onClick={refresh}
                className="bg-amber-500 text-white px-6 py-2 rounded-lg hover-bg-amber-600 transition-colors"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* No More Jobs */}
          {!loading && !hasMore && jobs.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No hay más empleos para mostrar</p>
            </div>
          )}

          {/* No Jobs Found */}
          {!loading && jobs.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-500 mb-4">
                <Briefcase className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No se encontraron empleos
              </h3>
              <p className="text-gray-400 mb-6">
                Intenta ajustar tus filtros de búsqueda
              </p>
              <button
                onClick={clearFilters}
                className="bg-amber-500 text-white px-6 py-2 rounded-lg hover-bg-amber-600 transition-colors"
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>

        {/* Infinite Scroll Sentinel */}
        <div id="scroll-sentinel" className="h-4"></div>
      </div>
    </div>
  );
};

export default JobList;
