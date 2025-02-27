import React, { useEffect } from "react"
import './style.css';

export const Home = () => {
	return (
	<div class="bg-dark">	
	<div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner mb-4">
      <div class="carousel-item active">
        <img src="https://cdn.prod.website-files.com/5d9667bad4a41e222995e15b/62a28855d2adb643754bcb64_Grand%20Cayman.jpg" class="d-block w-100" alt="..."/>
      </div>
      <div class="carousel-item">
        <img src="https://www.travelandleisure.com/thmb/Qa7_o8_XVpIVH5vqq7i73UlTSkU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde.jpg" class="d-block w-100" alt="..."/>
      </div>
      <div class="carousel-item">
        <img src="https://themilepost.com/wp-content/uploads/2022/05/Peyto_Lake-Banff_NP-Canada.jpg" class="d-block w-100" alt="..."/>
      </div>
    </div>
  </div>
<div class="card mb-4 bg-primary-subtle">
<div class="card-body text-center">
  Destinations
</div>
</div>
<div class="card mb-4 bg-primary-subtle">
  <div class="card-body text-center">
    Itinerary
  </div>
</div>
<div class="card mb-4 bg-primary-subtle">
  <div class="card-body text-center">
    Expenses
  </div>
</div>
<div class="card mb-4 bg-primary-subtle">
  <div class="card-body text-center">
   Packing List
  </div>
</div>
</div>
	);


}



// import rigoImageUrl from "../assets/img/rigo-baby.jpg";
// import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

// export const Home = () => {

// 	const { store, dispatch } = useGlobalReducer()

// 	const loadMessage = async () => {
// 		try {
// 			const backendUrl = import.meta.env.VITE_BACKEND_URL

// 			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

// 			const response = await fetch(backendUrl + "/api/hello")
// 			const data = await response.json()

// 			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

// 			return data

// 		} catch (error) {
// 			if (error.message) throw new Error(
// 				`Could not fetch the message from the backend.
// 				Please check if the backend is running and the backend port is public.`
// 			);
// 		}

// 	}

// 	useEffect(() => {
// 		loadMessage()
// 	}, [])

// 	return (
// 		<div className="text-center mt-5">
// 			<h1 className="display-4">Hello Rigo!!</h1>
// 			<p className="lead">
// 				<img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
// 			</p>
// 			<div className="alert alert-info">
// 				{store.message ? (
// 					<span>{store.message}</span>
// 				) : (
// 					<span className="text-danger">
// 						Loading message from the backend (make sure your python 🐍 backend is running)...
// 					</span>
// 				)}
// 			</div>
// 		</div>
// 	);
// }; 