import { Fragment, useContext, useEffect } from "react";
import { Transition } from "@headlessui/react";
import StatusContext from "../../store/status-context";

const SuccessBox = () => {
	const [, success, setSuccess] = useContext(StatusContext);
	const handleClose = () => {
		setSuccess((prevState) => ({
			...prevState,
			showSuccessBox: false,
		}));
	};

	useEffect(() => {
		if (success.showSuccessBox) {
			setTimeout(function () {
				setSuccess((prevState) => ({
					...prevState,
					showSuccessBox: false,
				}));
			}, 5000);
		}
	}, [success.showSuccessBox, setSuccess]);

	return (
		<Transition show={success.showSuccessBox}>
			<Transition.Child
				as={Fragment}
				enter="transition-all ease-in-out duration-400"
				enterFrom="opacity-0 scale-75 translate-x-1/3"
				enterTo="opacity-100 scale-100"
				leave="transition-all ease-out duration-200"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-75 translate-x-1/3"
			>
				<div
					className="fixed bottom-0 right-0 z-50 xl:w-4/12 lg:w-5/12 md:w-8/12 px-5 py-4 font-primary border-primary-100 backdrop-blur-[40px] backdrop-brightness-200 text-white dark:bg-[rgba(19,19,19,0.4)] dark:backdrop-blur-[24px] dark:border-primary-200 border-2 rounded-lg shadow-2xl -translate-x-4 -translate-y-4 break-words"
					role="alert"
				>
					<strong className="font-semibold">{success.title}</strong>
					<br />
					<br />
					<span className="block sm:inline">{success.message}</span>
					<div
						onClick={handleClose}
						className="absolute top-1 right-1 w-8 h-8 flex justify-center items-center rounded-md transition-all duration-200 cursor-pointer hover:bg-primary-100 hover:text-light-100"
					>
						<i className="fa-solid fa-xmark"></i>
					</div>
				</div>
			</Transition.Child>
		</Transition>
	);
};

export default SuccessBox;
