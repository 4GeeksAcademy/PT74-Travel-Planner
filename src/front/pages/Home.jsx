import React from "react";
import './style.css';

export const Home = () => {
  return (
    <div className="bg-dark min-vh-100 d-flex flex-column justify-content-start">
      {/* Carousel */}
      <div className="container-fluid p-0">
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://cdn.prod.website-files.com/5d9667bad4a41e222995e15b/62a28855d2adb643754bcb64_Grand%20Cayman.jpg"
                className="d-block w-100"
                alt="Grand Cayman"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.travelandleisure.com/thmb/Qa7_o8_XVpIVH5vqq7i73UlTSkU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde.jpg"
                className="d-block w-100"
                alt="Eiffel Tower"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://themilepost.com/wp-content/uploads/2022/05/Peyto_Lake-Banff_NP-Canada.jpg"
                className="d-block w-100"
                alt="Banff Canada"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="container-fluid my-5 pb-5">
        <div className="d-flex flex-column gap-3 align-items-center">

          <div className="card custom-card bg-light">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=3270&auto=format&fit=crop"
              alt="Destinations"
              className="card-icon"
            />
            <div className="card-body">
              <h5 className="card-title mb-0">Destinations</h5>
            </div>
          </div>

          <div className="card custom-card bg-light">
            <img
              src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=3270&auto=format&fit=crop"
              alt="Itinerary"
              className="card-icon"
            />
            <div className="card-body">
              <h5 className="card-title mb-0">Itinerary</h5>
            </div>
          </div>

          <div className="card custom-card bg-light">
            <img
              src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=3270&auto=format&fit=crop"
              alt="Expenses"
              className="card-icon"
            />
            <div className="card-body">
              <h5 className="card-title mb-0">Expenses</h5>
            </div>
          </div>

          <div className="card custom-card bg-light">
            <img
              src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=3272&auto=format&fit=crop"
              alt="Packing List"
              className="card-icon"
            />
            <div className="card-body">
              <h5 className="card-title mb-0">Packing List</h5>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};



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