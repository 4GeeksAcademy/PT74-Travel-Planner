import { Link } from "react-router-dom";
import travelImg from "../assets/img/five-lads-logo.png";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "./Navbar.css";
import { AuthOrNone } from "./Authcomponents";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const { authToken } = store;

  const handleLogout = () => {
    dispatch({ type: "clear_auth_token" });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar custom-navbar">
        <AuthOrNone>
          <button
            className="btn btn-menu"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            ☰ Menu
          </button>
        </AuthOrNone>

        <div className="navbar-logo">
          <Link to="/" className="text-white text-decoration-none d-flex align-items-center gap-2">
            <img src={travelImg} alt="Travel Logo" className="logo-img" />
            <span className="navbar-brand">Travel Planner</span>
          </Link>
        </div>

        <div className="ml-auto">
          <AuthOrNone>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </AuthOrNone>
          {!authToken && (
            <Link to="/login">
              <button className="btn btn-auth">Sign In / Register</button>
            </Link>
          )}
        </div>
      </nav>

      {/* Offcanvas (moved outside navbar!) */}
      <AuthOrNone>
        <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="true"
          tabIndex="-1"
          id="offcanvasScrolling"
          aria-labelledby="offcanvasScrollingLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Travel Like A Rockstar!!</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <ul className="offcanvas-body list-unstyled px-3">
            <li className="my-2">
              <Link to="/add-travel-companions" className="btn btn-outline-primary w-100">
                Add Travel Companions
              </Link>
            </li>
            <li className="my-2">
              <Link to="/destinations" className="btn btn-outline-primary w-100">
                Favorite Destinations
              </Link>
            </li>
            <li className="my-2">
              <Link to="/view-packing-list" className="btn btn-outline-primary w-100">
                View Packing List
              </Link>
            </li>
            <li className="my-2">
              <Link to="/enter-expenses" className="btn btn-outline-primary w-100">
                Enter Expenses
              </Link>
            </li>
            <li className="my-2">
              <Link to="/view-itinerary" className="btn btn-outline-primary w-100">
                View Itinerary
              </Link>
            </li>
            <li className="my-2">
              <Link to="/reset-password" className="btn btn-outline-primary w-100">
                Reset Password
              </Link>
            </li>
          </ul>
        </div>
      </AuthOrNone>
    </>
  );
};