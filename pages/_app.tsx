import { AppProps } from "next/app";
import Layout from "../Layouts/Layout";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
