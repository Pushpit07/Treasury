import { useContext } from "react";
import Modal from "../layout/Modal/Modal";
import { useRouter } from "next/router";
import StatusContext from "../store/status-context";

const CopyEncryptedFileSecrets = ({ isOpen, setOpen, cipherText, encryptionCode }) => {
	const router = useRouter();
	const [, , setSuccess] = useContext(StatusContext);

	const copyToClipboard = async (textToCopy) => {
		await navigator.clipboard.writeText(textToCopy);
		setSuccess((prevState) => ({
			...prevState,
			title: "Text Copied",
			message: "Selected text has been copied to clipboard",
			showSuccessBox: true,
		}));
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				image={
					<div className="mx-auto flex items-center relative justify-center text-[80px] text-primary-300">
						<i className="fa-solid fa-lock"></i>
					</div>
				}
				title={<div className="text-xl font-semibold mt-4">File Encrypted & Uploaded Securely</div>}
				content={
					<div className="flex flex-col justify-start items-start">
						<p className="text-zinc-600 text-sm font-semibold">File Secret</p>
						<div
							className="w-full flex items-center justify-between flex-1 px-4 py-2 rounded-lg bg-zinc-200 mt-1 cursor-pointer"
							onClick={() => copyToClipboard(cipherText)}
						>
							<span className="truncate break-all md:text-base align-bottom text-sm font-secondary">{cipherText}</span>
							<button className="w-fit h-fit ml-4">
								<i className="far fa-clipboard text-primary-300"></i>
							</button>
						</div>

						<p className="text-zinc-600 text-sm font-semibold mt-6">Encryption Code</p>
						<div
							className="w-full flex items-center justify-between flex-1 px-4 py-2 rounded-lg bg-zinc-200 mt-1 cursor-pointer"
							onClick={() => copyToClipboard(encryptionCode)}
						>
							<span className="truncate break-all md:text-base align-bottom text-sm font-secondary">{encryptionCode}</span>
							<button className="w-fit h-fit ml-4">
								<i className="far fa-clipboard text-primary-300"></i>
							</button>
						</div>

						<p className="mt-12 text-sm text-justify">
							<span className="font-semibold">Note:</span> Please make sure to{" "}
							<span className="text-primary-300">copy the file secret and encryption code</span>. You will not be able to view them again. They
							will be required to access the encrypted file.
						</p>
					</div>
				}
				onClose={() => {
					setOpen(false);
					router.push(`/`, undefined, { shallow: true });
				}}
			></Modal>
		</>
	);
};

export default CopyEncryptedFileSecrets;
