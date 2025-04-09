import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePermissions } from "react-admin";

const PermissionRedirectGuard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { permissions, isLoading } = usePermissions();

  useEffect(() => {
    if (isLoading || !permissions || permissions === 'superuser') return;

    const currentPath = location.pathname.replace(/^\//, "");
    const hasCurrent = permissions[currentPath]?.view;

    if (!hasCurrent) {
      const fallback = Object.entries(permissions).find(
        ([_, p]) => p?.view
      );
      if (fallback) {
        navigate(`/${fallback[0]}`, { replace: true });
      } else {
        navigate('/no-access', { replace: true });
      }
    }
  }, [permissions, location.pathname, isLoading, navigate]);

  return null;
};

export default PermissionRedirectGuard;

