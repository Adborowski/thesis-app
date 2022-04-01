import classes from "./Nav.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const Nav = () => {
  const navigate = useNavigate();

  const handleNavClick = useCallback(
    () => navigate("/", { replace: true, reloadDocument: true }),
    [navigate]
  );

  return (
    <div className={classes.Nav}>
      <button
        onClick={handleNavClick}
        className={`${classes.btnBackToMap}`}
        to="/"
      >
        ←
      </button>
    </div>
  );
};

export default Nav;
