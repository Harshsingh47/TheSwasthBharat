import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuthStore } from '../../store/authStore';

interface ProtectedRouteProps {
  allowedRoles?: ('PATIENT' | 'DOCTOR' | 'ADMIN')[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role as any))) {
    // User's role is not authorized, redirect to home page or unauthorized page
    return <Navigate to="/" replace />;
  }

  // If authenticated and authorized, render child routes
  return <Outlet />;
};
