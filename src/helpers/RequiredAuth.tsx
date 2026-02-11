import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { RootState } from "../store/store";

export const RequiredAuth = ({ children }: { children: ReactNode }) => {
	const { isLogined } = useSelector(
		(store: RootState) => store.userProfile,
	);

	if (!isLogined) {
		return <Navigate to="/login" replace />;
	}

	return children;
};
