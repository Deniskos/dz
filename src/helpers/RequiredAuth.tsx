import type { ReactNode } from "react";
import { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../context/UserContext";

export const RequiredAuth = ({ children }: { children: ReactNode }) => {
	const { isLogined } = useContext(UserContext);

	console.log("isLogined", isLogined);
	if (!isLogined) {
		return <Navigate to="/login" replace />;
	}

	return children;
};
