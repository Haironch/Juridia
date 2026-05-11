import { Link } from "react-router-dom";
import { BookOpen, Users, Award, TrendingUp, Brain, BarChart2, MessageSquare, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-[#d8e9f5]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#2a628f] to-[#13293d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-3xl tracking-tight font-extrabold text-white sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="block">Domina el Derecho</span>
              <span className="block text-[#8bbde0]">Guatemalteco</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-[#b2d3ea] sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Plataforma de aprendizaje interactivo con contenido verificado por
              expertos. Practica con preguntas, accede a material de estudio y
              participa en foros especializados.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/constituquiz"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#13293d] bg-white hover:bg-[#d8e9f5] transition-colors md:py-4 md:text-lg md:px-10"
              >
                Comenzar Gratis
              </Link>
              <Link
                to="/premium"
                className="px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-[#16324f] transition-colors md:py-4 md:text-lg md:px-10"
              >
                Ver Premium
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-[#cce0f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#13293d] sm:text-4xl">
              Una plataforma completa para tu aprendizaje
            </h2>
            <p className="mt-4 text-lg text-[#16324f]">
              Todo lo que necesitas para dominar el derecho guatemalteco en un
              solo lugar
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-[#9ac1e2]">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#8bbde0] text-[#13293d] mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-[#13293d]">
                Preguntas Interactivas
              </h3>
              <p className="mt-2 text-base text-[#2a628f]">
                Practica con preguntas de opción múltiple organizadas por
                materia y dificultad
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-[#9ac1e2]">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#8bbde0] text-[#13293d] mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-[#13293d]">
                Foros Especializados
              </h3>
              <p className="mt-2 text-base text-[#2a628f]">
                Intercambia conocimientos con estudiantes y profesionales del
                derecho
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-[#9ac1e2]">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#8bbde0] text-[#13293d] mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-[#13293d]">
                Material Verificado
              </h3>
              <p className="mt-2 text-base text-[#2a628f]">
                Accede a contenido revisado y aprobado por expertos en derecho
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-[#9ac1e2]">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#8bbde0] text-[#13293d] mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-[#13293d]">
                Seguimiento de Progreso
              </h3>
              <p className="mt-2 text-base text-[#2a628f]">
                Monitorea tu avance y mejora continuamente con estadísticas
                detalladas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="py-16 bg-[#d8e9f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#13293d]">
              Acceso rápido
            </h2>
            <p className="mt-3 text-lg text-[#16324f]">
              Todo lo que necesitas, a un clic de distancia
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              to="/constituquiz"
              className="group bg-gradient-to-br from-[#2a628f] to-[#18435a] rounded-2xl p-6 text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Brain className="h-10 w-10 mb-4 opacity-90" />
              <h3 className="text-lg font-bold mb-1">ConstituQuiz</h3>
              <p className="text-sm text-[#b2d3ea] mb-4">
                Practica con quizzes y tarjetas de estudio interactivas.
              </p>
              <div className="flex items-center text-sm font-medium">
                Empezar ahora <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/progreso"
              className="group bg-white rounded-2xl p-6 border border-[#9ac1e2] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <BarChart2 className="h-10 w-10 mb-4 text-[#2a628f]" />
              <h3 className="text-lg font-bold text-[#13293d] mb-1">Mi Progreso</h3>
              <p className="text-sm text-[#16324f] mb-4">
                Revisa tus estadísticas, puntajes y áreas de mejora.
              </p>
              <div className="flex items-center text-sm font-medium text-[#2a628f]">
                Ver estadísticas <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/foros"
              className="group bg-white rounded-2xl p-6 border border-[#9ac1e2] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <MessageSquare className="h-10 w-10 mb-4 text-[#2a628f]" />
              <h3 className="text-lg font-bold text-[#13293d] mb-1">Foros</h3>
              <p className="text-sm text-[#16324f] mb-4">
                Comparte dudas y aprende con otros estudiantes de derecho.
              </p>
              <div className="flex items-center text-sm font-medium text-[#2a628f]">
                Ver foros <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-[#13293d] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-extrabold text-white">3</p>
              <p className="text-sm text-[#b2d3ea] mt-1">Temas de quiz disponibles</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white">15+</p>
              <p className="text-sm text-[#b2d3ea] mt-1">Preguntas de práctica</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white">6</p>
              <p className="text-sm text-[#b2d3ea] mt-1">Cursos disponibles</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white">100%</p>
              <p className="text-sm text-[#b2d3ea] mt-1">Gratuito para estudiantes</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#18435a]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">¿Listo para comenzar?</span>
            <span className="block text-[#81bdde]">
              Inicia hoy mismo de forma gratuita
            </span>
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 lg:mt-0 lg:flex-shrink-0">
            <Link
              to="/constituquiz"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#13293d] bg-white hover:bg-[#bdd5eb] transition-colors"
            >
              <Brain className="h-5 w-5 mr-2" />
              Ir a ConstituQuiz
            </Link>
            <Link
              to="/cursos"
              className="inline-flex items-center justify-center px-5 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-[#2a628f] transition-colors"
            >
              Ver cursos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
