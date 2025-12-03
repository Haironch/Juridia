import { Scale } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-secondary-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-semibold text-white">
                Derecho GT
              </span>
            </div>
            <p className="text-sm text-secondary-400 max-w-md">
              Plataforma de aprendizaje especializada en derecho guatemalteco. 
              Aprende, practica y domina todas las áreas del derecho con contenido 
              verificado por expertos.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Plataforma
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/cursos" className="text-sm hover:text-primary-400 transition-colors">
                  Cursos
                </a>
              </li>
              <li>
                <a href="/foros" className="text-sm hover:text-primary-400 transition-colors">
                  Foros
                </a>
              </li>
              <li>
                <a href="/material" className="text-sm hover:text-primary-400 transition-colors">
                  Material de Estudio
                </a>
              </li>
              <li>
                <a href="/premium" className="text-sm hover:text-primary-400 transition-colors">
                  Premium
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/terminos" className="text-sm hover:text-primary-400 transition-colors">
                  Términos de Uso
                </a>
              </li>
              <li>
                <a href="/privacidad" className="text-sm hover:text-primary-400 transition-colors">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/contacto" className="text-sm hover:text-primary-400 transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-secondary-800">
          <p className="text-sm text-secondary-400 text-center">
            {currentYear} Derecho GT. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
