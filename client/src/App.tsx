import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import SessionGuard from "./components/common/SessionGuard";
import AdminGuard from "./components/admin/AdminGuard";
import BetaLanding from "./pages/public/BetaLanding";
import Home from "./pages/public/Home";
import Cursos from "./pages/public/Cursos";
import CursoDetalle from "./pages/public/CursoDetalle";
import Foros from "./pages/public/Foros";
import MaterialEstudio from "./pages/public/MaterialEstudio";
import Premium from "./pages/public/Premium";
import Progreso from "./pages/public/Progreso";
import Registro from "./pages/auth/Registro";
import Login from "./pages/auth/Login";
import ConstituQuizHome from "./pages/quiz/ConstituQuizHome";
import QuizStudyMode from "./pages/quiz/QuizStudyMode";
import QuizPracticeMode from "./pages/quiz/QuizPracticeMode";
import QuizResults from "./pages/quiz/QuizResults";
import Glosario from "./pages/public/Glosario";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminCursos from "./pages/admin/AdminCursos";
import CasosHome from "./pages/casos/CasosHome";
import CasoDetalle from "./pages/casos/CasoDetalle";
import ExamenSimulado from "./pages/examen/ExamenSimulado";
import Timeline from "./pages/public/Timeline";

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

          {/* ── Admin — login público, panel protegido por AdminGuard ── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route element={<AdminGuard />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/usuarios" element={<AdminUsuarios />} />
              <Route path="/admin/cursos" element={<AdminCursos />} />
            </Route>
          </Route>

          {/* ── Rutas principales — requieren haber pasado por BetaLanding ── */}
          <Route element={<SessionGuard />}>
            <Route element={<MainLayout />}>
              <Route path="/inicio" element={<Home />} />
              <Route path="/cursos" element={<Cursos />} />
              <Route path="/cursos/:id" element={<CursoDetalle />} />
              <Route path="/foros" element={<Foros />} />
              <Route path="/material" element={<MaterialEstudio />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/progreso" element={<Progreso />} />
              <Route path="/glosario" element={<Glosario />} />
              <Route path="/constituquiz" element={<ConstituQuizHome />} />
              <Route path="/constituquiz/estudio/:temaId" element={<QuizStudyMode />} />
              <Route path="/constituquiz/practica/:temaId" element={<QuizPracticeMode />} />
              <Route path="/constituquiz/resultados/:temaId" element={<QuizResults />} />
              <Route path="/casos" element={<CasosHome />} />
              <Route path="/casos/:id" element={<CasoDetalle />} />
              <Route path="/examen" element={<ExamenSimulado />} />
              <Route path="/historia" element={<Timeline />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
