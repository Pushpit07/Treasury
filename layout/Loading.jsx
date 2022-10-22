import { useContext } from "react";
import LoadingContext from "../store/loading-context";
import styles from "../styles/Loading/Loading.module.css";

export default function Loading() {
	const [isLoading] = useContext(LoadingContext);

	return isLoading === "loadingSection" ? (
		<div className={styles["loading_section_container"]}>
			<div className={styles["loading_container_box"]}>
				<div className={styles["loadingSpinner"]}></div>
			</div>
		</div>
	) : (
		isLoading && (
			<div className={styles["loading_container"]}>
				<div className={styles["loading_container_box"]}>
					<div className={styles["loadingSpinner"]}></div>
				</div>
			</div>
		)
	);
}
