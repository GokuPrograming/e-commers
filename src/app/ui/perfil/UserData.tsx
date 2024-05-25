import React from 'react';

const UserData: React.FC = () => {
  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-bold mb-2">Personal Data</h2>
      <p>Name: John Doe</p>
      <p>Email: johndoe@example.com</p>
      {/* Agregar más campos según sea necesario */}
    </div>
  );
};

export default UserData;
