import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  Calendar,
  Building,
  ArrowLeft,
  Share2,
  Bookmark,
  Send,
} from "lucide-react";
import { jobService } from "../services/jobService";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);

  useEffect(() => {
    const loadJob = async () => {
      try {
        setLoading(true);
        const jobData = await jobService.getJobById(parseInt(id));
        if (jobData) {
          setJob(jobData);
          // Load related jobs
          const allJobs = await jobService.getJobs(1, 10);
          const related = allJobs.jobs
            .filter(
              (j) => j.id !== parseInt(id) && j.company === jobData.company
            )
            .slice(0, 3);
          setRelatedJobs(related);
        } else {
          setError("Empleo no encontrado");
        }
      } catch (err) {
        setError("Error al cargar el empleo");
        console.error("Error loading job:", err);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">
            {error || "Empleo no encontrado"}
          </p>
          <Link
            to="/jobs"
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover-bg-amber-600 transition-colors"
          >
            Volver a Empleos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/jobs"
          className="inline-flex items-center text-amber-600 hover-text-amber-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Empleos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h1>
                    <p className="text-xl text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          Publicado{" "}
                          {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="p-2 text-gray-400 hover-text-gray-600 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover-text-gray-600 transition-colors">
                    <Bookmark className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="text-2xl font-bold text-amber-600 mb-6">
                {job.salary}
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-amber-500 text-white py-3 px-6 rounded-lg font-semibold hover-bg-amber-600 transition-colors flex items-center justify-center">
                  <Send className="h-4 w-4 mr-2" />
                  Aplicar Ahora
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover-bg-gray-50 transition-colors">
                  Guardar Empleo
                </button>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Descripción del Empleo
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {job.description}
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Responsabilidades:
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                  <li>Desarrollar y mantener aplicaciones web modernas</li>
                  <li>Colaborar con el equipo de diseño y backend</li>
                  <li>Optimizar el rendimiento de las aplicaciones</li>
                  <li>Participar en code reviews y mejoras de procesos</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Requisitos:
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.requirements.map((req, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                    >
                      {req}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Beneficios:
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Horario flexible y trabajo remoto</li>
                  <li>Seguro médico privado</li>
                  <li>Plan de desarrollo profesional</li>
                  <li>Equipamiento moderno</li>
                  <li>Ambiente de trabajo dinámico</li>
                </ul>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Sobre la Empresa
              </h2>
              <div className="flex items-start space-x-4">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.company}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Empresa líder en tecnología con más de 10 años de
                    experiencia en el desarrollo de soluciones digitales
                    innovadoras.
                  </p>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      <span>150-300 empleados</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Apply */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Aplicación Rápida
              </h3>
              <button className="w-full bg-amber-500 text-white py-3 px-6 rounded-lg font-semibold hover-bg-amber-600 transition-colors mb-3">
                Aplicar con CV
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover-bg-gray-50 transition-colors">
                Subir CV
              </button>
            </div>

            {/* Job Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resumen del Empleo
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo:</span>
                  <span className="font-medium">{job.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ubicación:</span>
                  <span className="font-medium">{job.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Salario:</span>
                  <span className="font-medium text-amber-600">
                    {job.salary}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Publicado:</span>
                  <span className="font-medium">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Empleos Similares
                </h3>
                <div className="space-y-4">
                  {relatedJobs.map((relatedJob) => (
                    <div
                      key={relatedJob.id}
                      className="border-b border-gray-200 pb-4 last-border-b-0"
                    >
                      <Link
                        to={`/job/${relatedJob.id}`}
                        className="block hover-bg-gray-50 p-2 rounded-lg transition-colors"
                      >
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {relatedJob.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {relatedJob.company}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {relatedJob.location}
                          </span>
                          <span className="text-amber-600 font-medium">
                            {relatedJob.salary}
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
