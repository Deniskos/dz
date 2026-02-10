import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

import styles from "./styles.module.css";

export const Layout = () => {
	return (
		<div className="layout">
			<Header />
			<section className={styles["content"]}>
				<Outlet />
			</section>
		</div>
	);
};
