import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// const AdminRoute = ({ children }) => {
//   const { user } = useAuth();
  
//   if (user?.role === 'admin' || user?.role === 'author' || user?.role === 'editor') { 
    
//     return children;
//   }
//     return <Navigate to="/" />
// };

// export default AdminRoute;

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // or spinner

  const allowedRoles = ['admin', 'editor', 'author'];

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
