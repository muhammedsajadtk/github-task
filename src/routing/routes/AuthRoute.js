import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthRoute({ children }) {
	const accessToken = useSelector((state) => state.auth.accessToken);

	return accessToken === null ? children : <Navigate to="/" />;
}
