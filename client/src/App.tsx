import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/public/Home";
import Cursos from "./pages/public/Cursos";
import Foros from "./pages/public/Foros";
import MaterialEstudio from "./pages/public/MaterialEstudio";
import Premium from "./pages/public/Premium";
import Registro from "./pages/auth/Registro";

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
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/foros" element={<Foros />} />
            <Route path="/material" element={<MaterialEstudio />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/registro" element={<Registro />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
