import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* different routes(mtlb different paths) pe apn different pages render ya mltb return ya mtlb show krtehh hai. */}
				<Route path="/" element={<Home />} />
				<Route path="/hotels/:id" element={<Hotel />} />
				<Route path="/hotels" element={<List />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
