import "./App.css";
import LandingPage from "./pages/landing/LandingPage";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Navigate replace to="/welcome" />} />
				<Route path="/welcome" element={<LandingPage />} />
			</Routes>
		</div>
	);
}
export default App;
