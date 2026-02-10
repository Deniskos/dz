import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import styles from "./styles.module.css";

const Header = () => {
	return (
		<header className={styles["header__root"]}>
			<div className={styles["header__logo"]}>
				<Link to="/">
					<img src="/logo.svg" />
				</Link>
			</div>
			<Menu />
		</header>
	);
};

export default Header;
