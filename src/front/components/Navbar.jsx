import { Link } from "react-router-dom";
import travelImg from "../assets/img/travel.png";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Corrected Import

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer(); // Get state from global store
    const { authToken } = store;

    const handleLogout = () => {
        dispatch({ type: 'clear_auth_token' });
    };

    return (
        <nav className="navbar navbar-light bg-primary nav-justified">
            {authToken && (
                <>
                    <button className="btn btn-primary-subtle fa-solid fa-bars nav-item" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"> Menu</button>
                    <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Travel Like A Rockstar!!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <ul className="offcanvas-body d-flex flex-column gap-2">
                            <a href="/add-travel-companions" className="btn btn-outline-primary">Add Travel Companions</a>
                            <a href="/Destinations" className="btn btn-outline-primary">Favorite Destinations</a>
                            <a href="/view-packing-list" className="btn btn-outline-primary">View Packing List</a>
                            <a href="/enter-expenses" className="btn btn-outline-primary">Enter Expenses</a>
                            <a href="/view-itinerary" className="btn btn-outline-primary">View Itinerary</a>
                        </ul>
                    </div>
                </>
            )}
            <div className="container nav-item d-flex justify-content-center">
                <Link to="/">
                    <img src={travelImg} alt="Travel Logo" className="logo-img" />
                    <span className="navbar-brand mb-0 h1">Travel Planner</span>
                </Link>
            </div>
            <div className="ml-auto nav-item">
                {authToken ? (
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to="/login">
                        <button className="btn btn-primary">Sign In / Register</button>
                    </Link>
                )}
            </div>
        </nav>
    );
};
