import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN_CONTENIDO'];

export default function AdminGuard() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!ADMIN_ROLES.includes(user.rol)) {
    return <Navigate to="/inicio" replace />;
  }

  return <Outlet />;
}
