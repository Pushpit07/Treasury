import { useState, useRef, useContext } from "react";
import Modal from "../layout/Modal/Modal";
import { useRouter } from "next/router";
import LoadingContext from "../store/loading-context";
import { create } from "ipfs-http-client";
import SimpleCrypto from "simple-crypto-js";
import CopyEncryptedFileSecretsModal from "./CopyEncryptedFileSecretsModal";
import { sleep } from "../utils/sleep";

const UploadFileModal = ({ isOpen, setOpen }) => {
	const router = useRouter();
	const [, setLoading] = useContext(LoadingContext);
	const [isCopyEncryptedFileSecretsModalOpen, setCopyEncryptedFileSecretsModalOpen] = useState(false);
	const [cipherText, setCipherText] = useState("");

	const projectId = "2GVDurmqXz7jZdSpsDpj5P33xoZ";
	const projectSecret = "a4b5979b366827c955d8caf53ba30234";
	const simpleCrypto = new SimpleCrypto(projectSecret);

	const auth = `Basic ` + Buffer.from(projectId + `:` + projectSecret).toString(`base64`);
	const ipfs = create({
		host: `ipfs.infura.io`,
		port: 5001,
		protocol: `https`,
		headers: {
			authorization: auth,
		},
	});

	const hiddenFileInput = useRef(null);
	const [fileChosenText, setFileChosenText] = useState("No file chosen");
	const [selectedFile, setSelectedFile] = useState("");
	const [encryptionCode, setEncryptionCode] = useState("");

	async function handleFileChange() {
		if (!document.getElementById("unlockableFile") || !window.FileReader) return;

		// GET THE FILE INPUT
		var filesInput = document.getElementById("unlockableFile");

		// VALIDATE OR CHECK IF ANY FILE IS SELECTED
		if (filesInput.files.length > 0) {
			setLoading(true);
			setFileChosenText("1 file selected");
			const _file = filesInput.files[0];
			const ipfsFile = await ipfs.add(_file);

			setSelectedFile({
				name: filesInput.files[0].name,
				size: filesInput.files[0].size,
				ipfsUrl: "https://treasury.infura-ipfs.io/ipfs/" + ipfsFile.path,
			});

			setLoading(false);
		} else {
			// TOTAL FILE COUNT
			setFileChosenText("No file chosen");
			setSelectedFile("");
		}
	}

	function handleFileClick() {
		hiddenFileInput.current.click();
	}

	function bytesToMegaBytes(bytes) {
		var converted = bytes / (1024 * 1024);
		return converted.toFixed(2);
	}

	return (
		<>
			<Modal
				isOpen={isOpen}
				image={
					<div className="mx-auto flex items-center relative justify-center text-[80px] text-primary-300">
						<i className="fa-solid fa-cloud-arrow-up"></i>
					</div>
				}
				title={<div className="text-2xl font-semibold mt-4">Upload File</div>}
				content={
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							const _cipherText = simpleCrypto.encrypt(selectedFile.ipfsUrl + encryptionCode);
							setCipherText(_cipherText);
							setOpen(false);
							setLoading(true);
							await sleep(1500);
							setLoading(false);
							setCopyEncryptedFileSecretsModalOpen(true);
						}}
						className="flex flex-col justify-start items-start"
					>
						<p className="text-zinc-600 text-sm font-semibold">Choose a file</p>
						<div className="flex items-center mt-2">
							<input
								type="button"
								className="bg-primary-200 hover:bg-primary-100 transition duration-200 text-sm py-2 px-8 rounded-full cursor-pointer"
								value="Choose File"
								onClick={handleFileClick}
							/>
							<span className="ml-2 text-sm">{fileChosenText}</span>
						</div>
						<input type="file" id="unlockableFile" name="unlockableFile" ref={hiddenFileInput} onChange={handleFileChange} className="hidden" />

						{selectedFile && (
							<div className="flex flex-col justify-start items-start text-zinc-600 text-sm">
								<p className="break-all mt-2">{selectedFile.name}</p>
								<p>({bytesToMegaBytes(selectedFile.size)}&nbsp;MB)</p>
								{/* <a href={selectedFile.ipfsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 text-start">
									<p className="break-all text-primary-300 hover:text-primary-400 underline">{selectedFile.ipfsUrl}</p>
								</a> */}
							</div>
						)}

						<p className="text-zinc-600 text-sm font-semibold mt-8">Enter a code to encrypt your file with</p>
						<input
							type={"text"}
							value={encryptionCode ?? ""}
							onChange={(e) => {
								setEncryptionCode(e.target.value);
							}}
							placeholder="Eg. M@$8"
							className="w-full px-2 py-2 mt-2 border-2 border-[#777777] rounded-md shadow-sm outline-none focus:border-primary-300"
							required
						></input>
						<p className="mt-1 text-xs text-start">
							You can use anything. Please make sure to keep it simple and note it down as it will be required to access the uploaded file.
						</p>

						<div className="w-full flex justify-center items-center mt-12">
							<button
								type="submit"
								className="py-3 px-8 bg-primary-400 hover:bg-primary-300 transition duration-500 text-white text-sm rounded-full cursor-pointer"
							>
								Encrypt file and Upload
							</button>
						</div>
					</form>
				}
				onClose={() => {
					setOpen(false);
					router.push(`/`, undefined, { shallow: true });
				}}
			></Modal>

			<CopyEncryptedFileSecretsModal
				isOpen={isCopyEncryptedFileSecretsModalOpen}
				setOpen={setCopyEncryptedFileSecretsModalOpen}
				cipherText={cipherText}
				encryptionCode={encryptionCode}
			/>
		</>
	);
};

export default UploadFileModal;
