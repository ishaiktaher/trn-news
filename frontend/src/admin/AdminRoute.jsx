import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (user?.role === 'admin' || user?.role === 'author' || user?.role === 'editor') { 
    
    return children;
  }
    return <Navigate to="/" />
};

export default AdminRoute;
