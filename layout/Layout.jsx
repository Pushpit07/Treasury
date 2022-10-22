import Loading from "./Loading";

const Layout = ({ children }) => {
	return (
		<>
			{children}
			<Loading />
		</>
	);
};

export default Layout;
