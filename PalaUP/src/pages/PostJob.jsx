import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X } from "lucide-react";

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    salary: "",
    description: "",
    requirements: [],
  });
  const [newRequirement, setNewRequirement] = useState("");
  const [errors, setErrors] = useState({});

  const jobTypes = [
    "Tiempo completo",
    "Tiempo parcial",
    "Contrato",
    "Freelance",
    "Prácticas",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const addRequirement = () => {
    if (
      newRequirement.trim() &&
      !formData.requirements.includes(newRequirement.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()],
      }));
      setNewRequirement("");
    }
  };

  const removeRequirement = (index) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "El título es requerido";
    if (!formData.company.trim()) newErrors.company = "La empresa es requerida";
    if (!formData.location.trim())
      newErrors.location = "La ubicación es requerida";
    if (!formData.type) newErrors.type = "El tipo de empleo es requerido";
    if (!formData.salary.trim()) newErrors.salary = "El salario es requerido";
    if (!formData.description.trim())
      newErrors.description = "La descripción es requerida";
    if (formData.requirements.length === 0)
      newErrors.requirements = "Al menos un requisito es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would send the data to your API
      console.log("Job posted:", formData);

      // Show success message and redirect
      alert("¡Empleo publicado exitosamente!");
      navigate("/jobs");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Error al publicar el empleo. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/jobs")}
            className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Empleos
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Publicar Nuevo Empleo
          </h1>
          <p className="text-gray-600 mt-2">
            Completa el formulario para publicar tu oferta de trabajo
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del Empleo *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ej: Desarrollador Frontend React"
                className={`w-full px-4 py-3 border rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Empresa *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Nombre de la empresa"
                className={`w-full px-4 py-3 border rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none ${
                  errors.company ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">{errors.company}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Ciudad, País"
                className={`w-full px-4 py-3 border rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none ${
                  errors.location ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Empleo *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none ${
                  errors.type ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Seleccionar tipo</option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type}</p>
              )}
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salario *
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="Ej: €35,000 - €45,000"
                className={`w-full px-4 py-3 border rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none ${
                  errors.salary ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.salary && (
                <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción del Empleo *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                placeholder="Describe las responsabilidades, requisitos y beneficios del empleo..."
                className={`w-full px-4 py-3 border rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Requirements */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requisitos *
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="Ej: React, JavaScript"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus-ring-2 focus-ring-amber-500 focus-outline-none"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addRequirement())
                  }
                />
                <button
                  type="button"
                  onClick={addRequirement}
                  className="px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {formData.requirements.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.requirements.map((req, index) => (
                    <span
                      key={index}
                      className="flex items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                    >
                      {req}
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="ml-2 hover:text-amber-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {errors.requirements && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.requirements}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Publicar Empleo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
