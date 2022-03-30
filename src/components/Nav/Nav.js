import classes from "./Nav.module.css";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.Nav}>
      <Link className={`button ${classes.btnBackToMap}`} to="/">
        ←
      </Link>
    </div>
  );
};

export default Nav;
