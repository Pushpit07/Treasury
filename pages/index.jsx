import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import UploadFileModal from "../components/UploadFileModal";
import DecryptFileModal from "../components/DecryptFileModal";

const Home = () => {
	const router = useRouter();
	const [isUploadFileModalOpen, setUploadFileModalOpen] = useState(false);
	const [isDecryptFileModalOpen, setDecryptFileModalOpen] = useState(false);

	useEffect(() => {
		if (router.query && "upload" in router.query) {
			setUploadFileModalOpen(true);
		} else if (router.query && "decrypt" in router.query) {
			setDecryptFileModalOpen(true);
		} else {
			setUploadFileModalOpen(false);
		}
	}, [router.query]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2 font-primary">
			<Head>
				<title>Treasury</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
				<div className="absolute top-0 left-0 w-full h-full">
					<Image src="/ocean.jpg" layout="fill" objectFit="cover" />
				</div>

				<div className="flex flex-col w-full text-primary-300 z-10">
					<div className="w-full flex justify-center items-center space-x-8">
						<div className="flex w-24 h-24 relative">
							<Image src="/safe.png" layout="fill" objectFit="contain" />
						</div>
						<h1 className="text-[85px] font-bold">Treasury</h1>
					</div>
					<p className="mt-6 text-6xl font-bold">Ocean of Encrypted Files</p>
					<p className="mt-20 text-xl font-bold text-white">Upload/Store/Share any file securely on IPFS</p>
					<div className="w-full flex justify-center space-x-10 mt-28">
						<button
							type="button"
							onClick={() => {
								router.push(`?upload`, undefined, { shallow: true });
							}}
							className="bg-primary-200 hover:bg-primary-100 transition duration-200 text-primary-300 px-10 py-2 rounded-full text-lg font-semibold shadow shadow-gray-500"
						>
							Upload a File
						</button>
						<button
							type="button"
							onClick={() => {
								router.push(`?decrypt`, undefined, { shallow: true });
							}}
							className="bg-primary-200 hover:bg-primary-100 transition duration-200 text-primary-300 px-10 py-2 rounded-full text-lg font-semibold shadow shadow-gray-500"
						>
							Decrypt a File
						</button>
					</div>
				</div>
			</main>

			<UploadFileModal isOpen={isUploadFileModalOpen} setOpen={setUploadFileModalOpen} />
			<DecryptFileModal isOpen={isDecryptFileModalOpen} setOpen={setDecryptFileModalOpen} />
		</div>
	);
};

export default Home;
