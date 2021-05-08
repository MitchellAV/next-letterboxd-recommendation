import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
	const router = useRouter();
	let username = "";
	console.log(router);
	if (router.route.includes("user")) {
		const { slug } = router.query;
		username = slug;
	}
	return (
		<nav>
			<ul id="menu">
				<li className="logo nav-item">
					<Link href="/">
						<a className="logo">
							<img
								src="/logos/letterboxd-logo.svg"
								alt="Letterboxd Logo"
								// width={200}
								// height={100}
								// layout={"intrinsic"}
							></img>
						</a>
					</Link>
				</li>
				<li className="toggle">
					<Link href="#menu">
						<a>
							<i className="icon fa fa-bars" />
						</a>
					</Link>
				</li>
				{username && (
					<>
						<li className="nav-item">
							<Link
								className="nav-link"
								href={`/user/${username}`}
							>
								{username}
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								href={`/user/${username}/personal`}
							>
								<a>Films</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								href={`https://letterboxd.com/${username}/following/`}
							>
								<a>Friends</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								href={`https://letterboxd.com/${username}`}
							>
								<a>Account</a>
							</Link>
						</li>
					</>
				)}
				<li className="searchbar">
					<form id="nav_searchbar">
						<input
							type="text"
							autoComplete="off"
							placeholder="Search Username"
							name="username"
						/>
						<button type="submit">
							<i className="fa fa-search" />
						</button>
					</form>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
