import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import SessionGuard from "./components/common/SessionGuard";
import BetaLanding from "./pages/public/BetaLanding";
import Home from "./pages/public/Home";
import Cursos from "./pages/public/Cursos";
import Foros from "./pages/public/Foros";
import MaterialEstudio from "./pages/public/MaterialEstudio";
import Premium from "./pages/public/Premium";
import Progreso from "./pages/public/Progreso";
import Registro from "./pages/auth/Registro";
import ConstituQuizHome from "./pages/quiz/ConstituQuizHome";
import QuizStudyMode from "./pages/quiz/QuizStudyMode";
import QuizPracticeMode from "./pages/quiz/QuizPracticeMode";
import QuizResults from "./pages/quiz/QuizResults";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* ── Pantalla de entrada (Beta Landing) ── */}
          <Route path="/" element={<BetaLanding />} />

          {/* ── Rutas principales — requieren haber pasado por BetaLanding ── */}
          <Route element={<SessionGuard />}>
            <Route element={<MainLayout />}>
              <Route path="/inicio" element={<Home />} />
              <Route path="/cursos" element={<Cursos />} />
              <Route path="/foros" element={<Foros />} />
              <Route path="/material" element={<MaterialEstudio />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/progreso" element={<Progreso />} />
              <Route path="/constituquiz" element={<ConstituQuizHome />} />
              <Route path="/constituquiz/estudio/:temaId" element={<QuizStudyMode />} />
              <Route path="/constituquiz/practica/:temaId" element={<QuizPracticeMode />} />
              <Route path="/constituquiz/resultados/:temaId" element={<QuizResults />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
