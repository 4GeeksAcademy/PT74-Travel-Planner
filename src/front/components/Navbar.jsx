import { Link } from "react-router-dom";
import travelImg from "../assets/img/travel.png";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "./Navbar.css";

export const Navbar = () => {
	return (
		<nav className="navbar custom-navbar">
			{/* Botón del menú lateral */}
			<button className="btn btn-menu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
				☰ Menu
			</button>

			{/* Menú lateral (Offcanvas) */}
			<div className="offcanvas offcanvas-start" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
				<div className="offcanvas-header">
					<h5 className="offcanvas-title">Travel Like A Rockstar!!</h5>
					<button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
				</div>
				<ul className="offcanvas-body list-unstyled">
					<li className="my-1">Add Travel Companions</li>
					<li className="my-1">Favorite Destinations</li>
					<li className="my-1">View Packing List</li>
					<li className="my-1">Enter Expenses</li>
					<li className="my-1">View Itinerary</li>
				</ul>
			</div>

			{/* Logo y nombre */}
			<div className="navbar-logo">
				<Link to="/" className="text-white text-decoration-none">
					<img src={travelImg} alt="Travel Logo" className="logo-img"/>
					<span className="navbar-brand">Travel Planner</span>
				</Link>
			</div>

			{/* Botón de inicio de sesión */}
			<div>
				<Link to="/login">
					<button className="btn btn-auth">Sign In / Register</button>
				</Link>
			</div>
		</nav>
	);
};
