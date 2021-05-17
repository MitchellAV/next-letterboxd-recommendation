import { useEffect, useState } from "react";

const useWindowSize = () => {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	useEffect(() => {
		const handleResize = (event) => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		};
		handleResize();
		// set resize listener
		window.addEventListener("resize", handleResize);

		// clean up function
		return () => {
			// remove resize listener
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return [width, height];
};

export default useWindowSize;
