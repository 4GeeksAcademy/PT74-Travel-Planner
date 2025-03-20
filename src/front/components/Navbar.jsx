import { Link } from "react-router-dom";
import travelImg from "../assets/img/travel.png";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "./Navbar.css";
import { AuthOrNone } from "./Authcomponents";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const { authToken } = store; // Get auth token from store

    const handleLogout = () => {
        dispatch({ type: "clear_auth_token" }); // Clear auth token
    };

    return (
        <nav className="navbar custom-navbar">
            {/* Sidebar Menu Button (Visible only for authenticated users) */}
            <AuthOrNone>
                <button className="btn btn-menu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                    ☰ Menu
                </button>
            </AuthOrNone>

            {/* Sidebar Offcanvas Menu (Only for authenticated users) */}
            <AuthOrNone>
                <div className="offcanvas offcanvas-start" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title">Travel Like A Rockstar!!</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                    </div>
                    <ul className="offcanvas-body list-unstyled">
                        <li className="my-1"><Link to="/add-travel-companions" className="btn btn-outline-primary">Add Travel Companions</Link></li>
                        <li className="my-1"><Link to="/destinations" className="btn btn-outline-primary">Favorite Destinations</Link></li>
                        <li className="my-1"><Link to="/view-packing-list" className="btn btn-outline-primary">View Packing List</Link></li>
                        <li className="my-1"><Link to="/enter-expenses" className="btn btn-outline-primary">Enter Expenses</Link></li>
                        <li className="my-1"><Link to="/view-itinerary" className="btn btn-outline-primary">View Itinerary</Link></li>
                        <li className="my-1"><Link to="/reset-password" className="btn btn-outline-primary">Reset Password</Link></li>
                    </ul>
                </div>
            </AuthOrNone>

            {/* Logo and Brand Name */}
            <div className="navbar-logo">
                <Link to="/" className="text-white text-decoration-none">
                    <img src={travelImg} alt="Travel Logo" className="logo-img" />
                    <span className="navbar-brand">Travel Planner</span>
                </Link>
            </div>

            {/* Authentication Buttons */}
            <div className="ml-auto">
                <AuthOrNone>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </AuthOrNone>
                {!authToken && (
                    <Link to="/login">
                        <button className="btn btn-auth">Sign In / Register</button>
                    </Link>
                )}
            </div>
        </nav>
    );
};