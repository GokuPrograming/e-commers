"use client"
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getrolIdFromToken } from '../getrolID';
import Nvar1 from '@/app/ui/Nvar/Nvar1';
import Nvar2 from '@/app/ui/Nvar/Nvar2';
import Nvar3 from '@/app/ui/Nvar/Nvar3';

const useAdminNvar = () => {
  const [idRol, setIdRol] = useState<number | null>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const roleId = getrolIdFromToken(token);
    setIdRol(roleId);
  }, []);

  const renderNavbar = () => {
    switch (idRol) {
      case 1:
        console.log("id", idRol);
        return <Nvar1 />;
      case 2:
        console.log("id=", idRol);
        return <Nvar2 />;
      default:
        console.log("id  ", idRol);
        return <Nvar3 />;
    }
  };

  return { renderNavbar };
};

const AdminNvar: React.FC = () => {
  const { renderNavbar } = useAdminNvar();

  return (
    <>
      {renderNavbar()}
    </>
  );
};

export default AdminNvar;
