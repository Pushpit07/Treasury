import { useState } from "react";
import "../styles/globals.css";
import LoadingContext from "../store/loading-context";
import Layout from "../layout/Layout";

function MyApp({ Component, pageProps }) {
	const [isLoading, setLoading] = useState(false);

	return (
		<LoadingContext.Provider value={[isLoading, setLoading]}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</LoadingContext.Provider>
	);
}

export default MyApp;
