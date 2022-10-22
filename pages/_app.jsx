import { useState } from "react";
import "../styles/globals.css";
import LoadingContext from "../store/loading-context";
import StatusContext from "../store/status-context";
import Layout from "../layout/Layout";

function MyApp({ Component, pageProps }) {
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState({
		title: "",
		message: "",
		showErrorBox: false,
	});
	const [success, setSuccess] = useState({
		title: "",
		message: "",
		showSuccessBox: false,
	});

	return (
		<LoadingContext.Provider value={[isLoading, setLoading]}>
			<StatusContext.Provider value={[error, success, setSuccess, setError]}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</StatusContext.Provider>
		</LoadingContext.Provider>
	);
}

export default MyApp;
