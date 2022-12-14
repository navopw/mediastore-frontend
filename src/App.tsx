import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SnackbarProvider } from 'notistack';

import LoginPage from "./pages/LoginPage";
import MediaPage from "./pages/MediaPage";

import 'cross-fetch/polyfill';
import Navbar from "./components/Navbar";

const App = () => {
	return (
		<BrowserRouter>
			<SnackbarProvider maxSnack={3}>
				<Navbar/>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/" element={<MediaPage />} />
				</Routes>
			</SnackbarProvider>
		</BrowserRouter>
	);
};

export default App;
