import React from "react";
import "./style.css";

export const Home = () => {
  return (
    <div className="bg-dark">
     

      {/* Carousel */}
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide slideshow-background"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://cdn.prod.website-files.com/5d9667bad4a41e222995e15b/62a28855d2adb643754bcb64_Grand%20Cayman.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.travelandleisure.com/thmb/Qa7_o8_XVpIVH5vqq7i73UlTSkU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://themilepost.com/wp-content/uploads/2022/05/Peyto_Lake-Banff_NP-Canada.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
      </div>

      {/* Secciones de contenido */}
      <div className="content-wrapper">
        <div className="card content">
          <div className="row">
            <div className="col-4">
              <img
                src="https://plus.unsplash.com/premium_photo-1683121257579-d40449389b63?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="col my-auto">
              <div className="card-body text-center">Destinations</div>
            </div>
          </div>
        </div>

        <div className="card content">
          <div className="row">
            <div className="col-4">
              <img
                src="https://plus.unsplash.com/premium_photo-1706189731991-39c4e4697d05?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="col my-auto">
              <div className="card-body text-center">Itinerary</div>
            </div>
          </div>
        </div>

        <div className="card content">
          <div className="row">
            <div className="col-4">
              <img
                src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="col my-auto">
              <div className="card-body text-center">Expenses</div>
            </div>
          </div>
        </div>

        <div className="card content">
          <div className="row">
            <div className="col-4">
              <img
                src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="col my-auto">
              <div className="card-body text-center">Packing List</div>
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