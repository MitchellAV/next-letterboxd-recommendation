import { useEffect, useState } from "react";
import { Response } from "../types";

interface ModalProps {
	response: Response;
}

const Modal = ({ response }: ModalProps) => {
	const { message, status } = response;
	const [alert, setAlert] = useState(false);

	useEffect(() => {
		// when the component is mounted, the alert is displayed for 3 seconds
		if (message && status >= 400) {
			setAlert(true);
			setTimeout(() => {
				setAlert(false);
			}, 5000);
		}
	}, [response]);
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
