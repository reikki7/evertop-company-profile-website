import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import PropTypes from "prop-types";

const AdminLayout = ({ children }) => {
  AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 lg:mx-12 overflow-auto h-screen lg:h-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
