const { Fragment, useState, useEffect } = require("react");
const { Transition } = require("@headlessui/react");

// Inspiration from- https://gist.github.com/clqu/32883b5bc2146bdc545a261b49c3c5eb
export default function Modal({
	isOpen = "",
	image = "",
	title = "",
	titleClasses = "",
	content = "",
	buttons = [],
	classes = "",
	onClose = "",
	onConfirm = "",
	onDiscard = "",
	children,
}) {
	let [isModalOpen, setIsModalOpen] = useState(isOpen);

	useEffect(() => {
		setIsModalOpen(isModalOpen);
		if (!isModalOpen) {
			document.documentElement.style.overflow = "auto";
		} else {
			document.documentElement.style.overflow = "hidden";
		}
	}, [isModalOpen]);

	useEffect(() => {
		setIsModalOpen(isOpen);
	}, [isOpen]);

	const handleChange = () => {
		setIsModalOpen(!isModalOpen);
	};

	const closeModal = () => {
		handleChange();
		onClose();
	};

	return (
		<>
			<div onClick={() => handleChange()}>{children}</div>

			<Transition show={isModalOpen}>
				<Transition.Child
					as={Fragment}
					enter="transition-all duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-all duration-200"
					leaveTo="opacity-0"
					leaveFrom="opacity-100"
				>
					<div
						style={{ zIndex: "50" }}
						onClick={() => handleChange()}
						className="w-screen h-screen left-0 top-0 bg-black/50 backdrop-blur-sm fixed"
					/>
				</Transition.Child>
				<Transition.Child
					as={Fragment}
					enter="transition-all duration-200"
					enterFrom="opacity-0 scale-75"
					enterTo="opacity-100 scale-100"
					leave="transition-all duration-200"
					leaveTo="opacity-0 scale-75"
					leaveFrom="opacity-100 scale-100"
				>
					<div style={{ zIndex: "60" }} className="flex left-0 top-0 justify-center items-center h-full w-full fixed">
						<div className={`sm:w-full w-11/12 p-4 bg-white dark:bg-dark-100 rounded-lg ${classes ? classes : "max-w-[32rem]"}`}>
							<div className="w-full flex justify-end items-center">
								<div
									onClick={() => closeModal()}
									className="w-8 h-8 flex justify-center items-center rounded-lg transition-all duration-200 cursor-pointer hover:bg-zinc-500/20 "
								>
									<i className="fa-solid fa-xmark"></i>
								</div>
							</div>
							<div className={`w-full flex flex-col mb-4 ${titleClasses ? titleClasses : "justify-between items-center"}`}>
								{image}
								<div className="font-medium text-xl text-center">{title}</div>
							</div>
							<div className="text-sm pt-6 pb-4 px-2 sm:px-8 text-center">{content}</div>
							<div className="mt-6 flex justify-end items-center gap-2 mb-2 mr-2">
								{buttons.map((button, index) => (
									<button
										onClick={() => {
											if (button.role === "discard") {
												onDiscard();
											}
											if (button.role === "confirm") {
												onConfirm();
											}
											if (button.role === "custom") {
												button.onClick();
											}
											if (button.toClose) {
												setIsModalOpen(false);
											}
										}}
										key={index}
										className={button.classes}
									>
										{button.label}
									</button>
								))}
							</div>
						</div>
					</div>
				</Transition.Child>
			</Transition>
		</>
	);
}
