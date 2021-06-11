import { useEffect, useState } from "react";

const Modal = ({ response }) => {
	const { message, status } = response;
	const [alert, setAlert] = useState(false);

	useEffect(() => {
		// when the component is mounted, the alert is displayed for 3 seconds
		if (message !== "") {
			setAlert(true);
			setTimeout(() => {
				setAlert(false);
			}, 5000);
		}
	}, [response]);
	console.log(response);
	return (
		<>
			{alert && (
				<div
					className={
						status < 300
							? "modal-container modal-success"
							: "modal-container modal-fail"
					}
				>
					<h4 className="modal-message">{message}</h4>
				</div>
			)}
		</>
	);
};

export default Modal;
