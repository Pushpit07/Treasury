import { useContext } from "react";
import { useRouter } from "next/router";
import Modal from "../layout/Modal/Modal";
import StatusContext from "../store/status-context";

const DecryptedUrlModal = ({ isOpen, setOpen, decryptedIpfsUrl }) => {
	const router = useRouter();
	const [, , setSuccess] = useContext(StatusContext);

	const copyToClipboard = async (textToCopy) => {
		await navigator.clipboard.writeText(textToCopy);
		setSuccess((prevState) => ({
			...prevState,
			title: "Link Copied",
			message: "Link has been copied to clipboard",
			showSuccessBox: true,
		}));
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				image={
					<div className="mx-auto flex items-center relative justify-center text-[80px] text-primary-300">
						<i className="fa-solid fa-unlock-keyhole"></i>
					</div>
				}
				title={<div className="text-2xl font-semibold mt-4">Decrypted File Link</div>}
				content={
					<>
						<div className="w-full flex items-center justify-between flex-1 px-4 py-2 rounded-lg bg-zinc-200 mt-1 cursor-pointer">
							<a
								href={decryptedIpfsUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="h-full w-full truncate break-all md:text-base align-bottom text-sm font-secondary"
							>
								{decryptedIpfsUrl}
							</a>
							<button className="w-fit h-fit ml-4" onClick={() => copyToClipboard(decryptedIpfsUrl)}>
								<i className="far fa-clipboard text-primary-300"></i>
							</button>
						</div>

						<p className="mt-12 text-sm text-justify">Please click the box to open the decrypted file in a new tab</p>
					</>
				}
				onClose={() => {
					setOpen(false);
					router.push(`/`, undefined, { shallow: true });
				}}
			></Modal>
		</>
	);
};

export default DecryptedUrlModal;
