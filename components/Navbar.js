import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Navbar = () => {
	const router = useRouter();
	let username = "";
	if (router.route.includes("user") && router.isReady) {
		const { slug } = router.query;
		username = slug;
	}
	const [search, setSearch] = useState("");

	const handleChange = (e) => {
		setSearch(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		router.push(`/user/${search}`);
		setSearch("");
	};
	return (
		<nav>
			<ul id="menu">
				<li className="logo nav-item">
					<Link href="/">
						<a className="logo">
							<img
								src="/logos/letterboxd-logo.svg"
								alt="Letterboxd Logo"
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
							<Link href={`/user/${username}`}>
								<a className="nav-link">{username}</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link href={`/user/${username}/personal`}>
								<a className="nav-link">Films</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link
								href={`https://letterboxd.com/${username}/following/`}
							>
								<a className="nav-link">Friends</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link href={`https://letterboxd.com/${username}`}>
								<a className="nav-link">Account</a>
							</Link>
						</li>
					</>
				)}
				<li className="searchbar">
					<form id="nav_searchbar" onSubmit={handleSubmit}>
						<input
							type="text"
							autoComplete="off"
							placeholder="Search Username"
							id="search"
							name="search"
							value={search}
							onChange={handleChange}
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
