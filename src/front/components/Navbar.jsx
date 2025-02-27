import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-primary">
			<button class="btn btn-primary-subtle fa-solid fa-bars" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"> Menu</button>
			<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
				<div class="offcanvas-header">
					<h5 class="offcanvas-title" id="offcanvasScrollingLabel">Travel Like A Rockstar!!</h5>
					<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<ul class="offcanvas-body">
					<li>Add Travel Companions</li>
					<li>Favorite Destinations</li>
					<li>View Packing List</li>
					<li>Enter Expenses</li>
					<li>View Itinerary</li>
				</ul>
			</div>
			<div className="container ">
				<Link to="/">
				{/* <img
					src="https://media.istockphoto.com/id/1258141375/vector/plane-travel-icon-air-travel-around-the-world-flying-around-the-world-travel-agency-logo.jpg?s=612x612&w=0&k=20&c=QaZk5NDYsdfKd_7iUNAe3CImkcwlzyaibpMuYIteeWY="
					className="logo-img">
					
					</img> */}
					
				
					<span className="navbar-brand mb-0 h1">Travel Planner</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary">Sign In / Register</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};