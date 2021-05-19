import Link from "next/link";
import { useRouter } from "next/router";

const NotFound = () => {
	const router = useRouter();

	return (
		<div className="not-found">
			<h1>Ooops...</h1>
			<h2>That page cannot be found </h2>
			<p>
				Going back to the{" "}
				<Link href="/">
					<a>Homepage</a>
				</Link>
			</p>
		</div>
	);
};

export default NotFound;
