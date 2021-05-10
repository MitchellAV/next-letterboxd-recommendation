const Status = ({ state, statusText }) => {
	const determine_icon = (state) => {
		let iconClassName = "";
		switch (state) {
			case "success":
				iconClassName = "fa fa-check-circle-o";
				break;
			case "failed":
				iconClassName = "fa fa-times-circle-o";
				break;
			case "working":
				iconClassName = "fa fa-cog fa-spin fa-3x fa-fw";

				break;
			case "waiting":
				iconClassName = "fa fa-circle-o";
				break;

			default:
				break;
		}
		return iconClassName;
	};

	return (
		<div className="status-container">
			<i className={determine_icon(state)}></i>
			<h3 className="status-text">{statusText}</h3>
		</div>
	);
};

export default Status;
