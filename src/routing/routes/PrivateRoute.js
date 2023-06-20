import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
	const accessToken = useSelector((state) => state.auth.accessToken);

	const code = new URLSearchParams(window.location.search).get("code");

	return accessToken !== null ? (
		children
	) : (
		<Navigate to={`login?code=${code}`} />
	);
}
