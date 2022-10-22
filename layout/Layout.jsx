import Loading from "./Loading";
import ErrorBox from "./Modal/ErrorBox";
import SuccessBox from "./Modal/SuccessBox";

const Layout = ({ children }) => {
	return (
		<>
			{children}
			<Loading />
			<ErrorBox />
			<SuccessBox />
		</>
	);
};

export default Layout;
