import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import logoutIcon from "../Assets/logout.svg";
import admin from "../Assets/admin.svg";
import ragIcon from "../Assets/rag.svg";
import testai from "../Assets/testgen.svg";
import { sweetalert } from "../utils/constatnts";

export const BootstrapSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  if (location.pathname === "/chat") return null;

  const role = sessionStorage.getItem("role");

  const sidebarItems = role === "admin"
    ? [
        { path: "/gitmetrics", icon: ragIcon, label: "RAG" },
        { path: "/adminDashBoard", icon: admin, label: "Admin" },
        { path: "/chat", icon: testai, label: "Chat" },
      ]
    : [
        { path: "/gitmetrics", icon: ragIcon, label: "RAG" },
        { path: "/chat", icon: testai, label: "Chat" },
      ];

  const handleNavigation = (path) => navigate(path);

  const handleLogout = () => {
    Swal.fire({
      title: sweetalert.WARNING_TITLE,
      text: sweetalert.LOGOUT_CONFIRM_TEXT,
      icon: sweetalert.WARNING_ICON,
      showCancelButton: true,
      confirmButtonText: sweetalert.CONFIRM_BUTTON_TEXT,
      cancelButtonText: sweetalert.CANCEL_BUTTON_TEXT,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
      }
    });
  };

  const navItemStyle = (isActive) => ({
    position: "relative",
    listStyle: "none",
    height: "45px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: isActive ? "#00BDD0" : "transparent",
    color: isActive ? "white" : "black",
    padding: "8px 12px",
  });

  const tooltipStyle = (isVisible) => ({
    position: "absolute",
    top: "60%",
    left: "75px",
    transform: "translateY(-50%)",
    background: "black",
    color: "white",
    padding: "6px 12px",
    fontSize: "14px",
    fontWeight: 400,
    whiteSpace: "nowrap",
    opacity: isVisible ? 0.85 : 0,
    transition: "opacity 0.3s ease",
    pointerEvents: "none",
    zIndex: 10,
    borderRadius: "4px",
  });

  return (
    <div className="sidebar">
      <ul style={{ margin: 0, padding: 0 }}>
        {sidebarItems.map(({ path, icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <li
              key={label}
              onClick={() => {
                handleNavigation(path);
                setHoveredItem(null); // Hide tooltip on click
              }}
              onMouseEnter={() => setHoveredItem(label)}
              onMouseLeave={() => setHoveredItem(null)}
              style={navItemStyle(isActive)}
            >
              <img src={icon} alt={label} className="ionStyles" />
              <span style={tooltipStyle(hoveredItem === label)}>{label}</span>
            </li>
          );
        })}
        <li
          onClick={() => {
            handleLogout();
            setHoveredItem(null); // Hide tooltip on click
          }}
          onMouseEnter={() => setHoveredItem("Logout")}
          onMouseLeave={() => setHoveredItem(null)}
          style={navItemStyle(false)}
        >
          <img src={logoutIcon} alt="Logout" className="ionStyles" />
          <span style={tooltipStyle(hoveredItem === "Logout")}>Logout</span>
        </li>
      </ul>
    </div>
  );
};
