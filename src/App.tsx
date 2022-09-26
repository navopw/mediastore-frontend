import { BrowserRouter, Routes, Route } from "react-router-dom";

import MediaPage from "./pages/MediaPage";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MediaPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
