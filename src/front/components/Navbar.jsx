import { Link } from "react-router-dom";
import travelImg from "../assets/img/travel.png";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-primary nav-justified">
			<button class="btn btn-primary-subtle fa-solid fa-bars nav-item" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"> Menu</button>
			<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
				<div class="offcanvas-header">
					<h5 class="offcanvas-title" id="offcanvasScrollingLabel">Travel Like A Rockstar!!</h5>
					<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<ul class="offcanvas-body d-flex flex-column gap-2">
				<a href="/add-travel-companions" class="btn btn-outline-primary">Add Travel Companions</a>
				<a href="/Destinations" class="btn btn-outline-primary">Favorite Destinations</a>
        		<a href="/view-packing-list" class="btn btn-outline-primary">View Packing List</a>
        		<a href="/enter-expenses" class="btn btn-outline-primary">Enter Expenses</a>
        		<a href="/view-itinerary" class="btn btn-outline-primary">View Itinerary</a>
				</ul>
			</div>
			<div className="container nav-item d-flex justify-content-center">
				<Link to="/">
					<img
						src={travelImg} alt="Travel Logo"
						className="logo-img"/>				
					<span className="navbar-brand mb-0 h1">Travel Planner</span>
				</Link>
			</div>
			<div className="ml-auto nav-item">
				<Link to="/login">
					<button className="btn btn-primary">Sign In / Register</button>
				</Link>
			</div>
		</nav>
	);
};