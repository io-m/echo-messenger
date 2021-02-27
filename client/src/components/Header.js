import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Payments from "./Payments";

const Header = () => {
  const { isAuth, fetchUser, credits } = useContext(AuthContext);
  useEffect(() => {
    fetchUser();
  }, []);

  const renderHeaderContent = () => {
    switch (isAuth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login w/Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="2" style={listStyle}>
            Credits:{credits}
          </li>,
          <li key="3">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          {isAuth ? (
            <Link to="/surveys" className="left brand-logo">
              Echo
            </Link>
          ) : (
            <Link to="/" className="left brand-logo">
              Echo
            </Link>
          )}

          <div className="right"></div>
          <ul className="right">{renderHeaderContent()}</ul>
        </div>
      </nav>
    </div>
  );
};

const listStyle = { margin: "0 10px" };

export default Header;
