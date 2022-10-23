import { useState, useContext } from "react";
import { useRouter } from "next/router";
import SimpleCrypto from "simple-crypto-js";
import Modal from "../layout/Modal/Modal";
import LoadingContext from "../store/loading-context";
import RequiredAsterisk from "../layout/RequiredAsterisk";
import DecryptedUrlModal from "./DecryptedUrlModal";
import StatusContext from "../store/status-context";
import { sleep } from "../utils/sleep";

const DecryptFileModal = ({ isOpen, setOpen }) => {
	const router = useRouter();
	const [, setLoading] = useContext(LoadingContext);
	const [, , , setError] = useContext(StatusContext);

	const projectSecret = "a4b5979b366827c955d8caf53ba30234";
	const simpleCrypto = new SimpleCrypto(projectSecret);

	const [fileSecret, setFileSecret] = useState("");
	const [encryptionCode, setEncryptionCode] = useState("");
	const [isDecryptedUrlModalOpen, setDecryptedUrlModalOpen] = useState(false);
	const [decryptedIpfsUrl, setDecryptedIpfsUrl] = useState("");

	function isValidHttpUrl(decipheredText) {
		let url;
		try {
			url = new URL(decipheredText);
		} catch (_) {
			return false;
		}
		return url.protocol === "http:" || url.protocol === "https:";
	}

	return (
		<>
			<Modal
				isOpen={isOpen}
				image={
					<div className="mx-auto flex items-center relative justify-center text-[80px] text-primary-300">
						<i className="fa-solid fa-unlock-keyhole"></i>
					</div>
				}
				title={<div className="text-2xl font-semibold mt-4">Decrypt File</div>}
				content={
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							setLoading(true);
							await sleep(1000);
							try {
								const decipheredText = simpleCrypto.decrypt(fileSecret);
								if (decipheredText.slice(-encryptionCode.length) === encryptionCode) {
									const _ipfsUrl = decipheredText.substring(0, decipheredText.length - encryptionCode.length);
									if (isValidHttpUrl(_ipfsUrl)) {
										setDecryptedIpfsUrl(_ipfsUrl);
										setOpen(false);
										setDecryptedUrlModalOpen(true);
									} else {
										setLoading(false);
										setError((prevState) => ({
											...prevState,
											title: "Invalid File Secret or Encryption Code",
											message: "We couldn't find a matching file. Please check the file secret and encryption code.",
											showErrorBox: true,
										}));
										return;
									}
								} else {
									setLoading(false);
									setError((prevState) => ({
										...prevState,
										title: "Invalid File Secret or Encryption Code",
										message: "We couldn't find a matching file. Please check the file secret and encryption code.",
										showErrorBox: true,
									}));
									return;
								}
							} catch (error) {
								setLoading(false);
								setError((prevState) => ({
									...prevState,
									title: "Invalid File Secret or Encryption Code",
									message: "We couldn't find a matching file. Please check the file secret and encryption code.",
									showErrorBox: true,
								}));
							}
							setLoading(false);
						}}
						className="flex flex-col justify-start items-start"
					>
						<p className="text-zinc-600 text-sm font-semibold mt-6">
							File Secret
							<RequiredAsterisk />
						</p>
						<input
							type={"text"}
							value={fileSecret}
							onChange={(e) => {
								setFileSecret(e.target.value);
							}}
							className="w-full px-2 py-2 mt-1 border-2 border-[#777777] rounded-md shadow-sm outline-none focus:border-primary-300"
							required
						></input>

						<p className="text-zinc-600 text-sm font-semibold mt-6">
							Encryption Code
							<RequiredAsterisk />
						</p>
						<input
							type={"text"}
							value={encryptionCode}
							onChange={(e) => {
								setEncryptionCode(e.target.value);
							}}
							className="w-full px-2 py-2 mt-1 border-2 border-[#777777] rounded-md shadow-sm outline-none focus:border-primary-300"
							required
						></input>

						<div className="w-full flex justify-center items-center mt-10">
							<button
								type="submit"
								className="py-3 px-8 bg-primary-400 hover:bg-primary-300 transition duration-500 text-white text-sm rounded-full cursor-pointer"
							>
								Decrypt
							</button>
						</div>
					</form>
				}
				onClose={() => {
					setOpen(false);
					router.push(`/`, undefined, { shallow: true });
				}}
			></Modal>

			<DecryptedUrlModal isOpen={isDecryptedUrlModalOpen} setOpen={setDecryptedUrlModalOpen} decryptedIpfsUrl={decryptedIpfsUrl} />
		</>
	);
};

export default DecryptFileModal;
