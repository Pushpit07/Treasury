import { Fragment, useContext, useEffect } from "react";
import { Transition } from "@headlessui/react";
import StatusContext from "../../store/status-context";

const ErrorBox = () => {
	const [error, , , setError] = useContext(StatusContext);

	const handleClose = () => {
		setError((prevState) => ({
			...prevState,
			showErrorBox: false,
		}));
	};

	useEffect(() => {
		if (error.showErrorBox) {
			setTimeout(function () {
				setError((prevState) => ({
					...prevState,
					showErrorBox: false,
				}));
			}, 5000);
		}
	}, [error.showErrorBox, setError]);

	return (
		<Transition show={error.showErrorBox}>
			<Transition.Child
				as={Fragment}
				enter="transition-all ease-in-out duration-400"
				enterFrom="opacity-0 scale-75 translate-x-full"
				enterTo="opacity-100 scale-100"
				leave="transition-all ease-out duration-200"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-75 translate-x-full"
			>
				<div
					className="fixed bottom-0 right-0 z-50 xl:w-4/12 lg:w-5/12 md:w-8/12 px-5 py-4 font-primary border-error-300 border-2 backdrop-blur-[40px] backdrop-brightness-200 text-white -translate-x-4 -translate-y-4 bg-[rgba(169,0,0,0.7)] rounded-lg shadow-2xl break-words"
					role="alert"
				>
					<strong className="font-semibold">{error.title}</strong>
					<br />
					<br />
					<span className="block sm:inline">{error.message}</span>
					<div
						onClick={handleClose}
						className="absolute top-1 right-1 w-8 h-8 flex justify-center items-center rounded-md transition-all duration-200 cursor-pointer hover:bg-error-300"
					>
						<i className="fa-solid fa-xmark"></i>
					</div>
				</div>
			</Transition.Child>
		</Transition>
	);
};

export default ErrorBox;
