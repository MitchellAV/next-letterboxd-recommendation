import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout: React.FC = ({ children }) => {
	return (
		<>
			<Head>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
				/>
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
					rel="stylesheet"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<main className="content">{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
