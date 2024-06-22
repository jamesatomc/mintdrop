import { TransactionBlock } from "@mysten/sui.js";
import {
  ConnectButton, useWallet
} from '@suiet/wallet-kit';
import { useEffect, useState } from 'react';
import NftCard from 'src/components/NftCard';
import { SuiObjectLinkButton } from 'src/components/SuiObjectLinkButton';
import LoadingIndicator from 'src/components/common/LoadingIndicator';
// import { NFT_PACKAGE_ID } from 'src/config/constants';
import { getAssets } from 'src/suitterLib/client';
import { NFTType } from 'src/suitterLib/types';
import { moveCallMintNft } from "./../suitterLib/moveCall";

/**
 *Page component
 * @returns
 */
const Page = () => {
  const [nfts, setNfts] = useState<NFTType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    address,
    signAndExecuteTransactionBlock
  } = useWallet();

  //Create transaction object
  const tx = new TransactionBlock();

  /**
  * Method to obtain NFT
  */
  const getNfts = async () => {
    getAssets(address!, setNfts);
  }

  /**
  * Methods to mint NFTs
  */
  const mint = async() => {
    setIsLoading(true);
    // moveCallTransferNft
    moveCallMintNft({
      tx,
      name: "test",
      description: "test",
      url: "https://magenta-able-pheasant-388.mypinata.cloud/ipfs/QmQhKs9WeVy5MxbChEQJrX37Unb6dktZXrYZuy6uVofQwC/Logo.png"
    });

    try {
      // Sign & send transaction
      await signAndExecuteTransactionBlock({
        // @ts-ignore
        transactionBlock: tx,
      });

      alert("Mint Success!!");
      setIsLoading(false);
    } catch(err) {
      console.log("err:", err);
      alert("Mint fail...");
      setIsLoading(false);
    }
  }

  /**
  * 左列用のコンポーネント
  * @returns
  */
  const Navbar = () => (
      <div
          className="backdrop-blur-3xl flex justify-between items-center top-0 left-0 w-full z-10 h-20 px-4 text-white fixed nav">
          <div className="font-bold text-lg mb-4">KANARI</div>
          <div className="font-bold text-lg mb-4">
              <ConnectButton>
                  Connect Wallet
              </ConnectButton>
          </div>
      </div>
  )

    /**
     * Component for center column
     * @returns
     */
    const CenterPart = () => {
    return(
      <div className="w-3/4 p-4 border-slate-600 border-x-[0.5px] flex flex-col h-screen">
        <div className="font-bold text-lg mb-4 text-white">NFTs</div>
              <div className="overflow-auto flex-grow gap-1">
                  {
                      nfts.map((nft, index) => (
                          <>
                              <NftCard
                                  key={index}
                                  id={nft.data.objectId}
                                  name={nft.data.content.fields.name}
                                  description={nft.data.content.fields.description}
                                  url={nft.data.content.fields.url}
                                  setIsLoading={setIsLoading}
                                  signAndExecuteTransactionBlock={signAndExecuteTransactionBlock}
                              />
                          </>
                      ))
                  }
              </div>
      </div>
    )
    }

    const LeftPart = () => (
        <div className="rounded-lg div w-96 p-4 text-white">
            <div className="text-sm mb-4">
                <span className="flex items-center">
                  USER
                  <SuiObjectLinkButton id={address!} />
                </span>
            </div>
            <div className="text-sm mb-4">
                <span className="flex items-center">
                  <button
                      className="rounded-lg py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                      onClick={mint}
                  >
                    mint NFT
                  </button>
                </span>
            </div>
            <button
                onClick={getNfts}
            >
                get nfts
            </button>
        </div>
    )

  useEffect(() => {
    getNfts();
  },[])

  return (
    <main className="flex max-w-full bg-black justify-center space-y-24 space-x-10">
      <>
        {isLoading ? (
          <div className="flex items-center justify-center h-screen w-screen">
            <LoadingIndicator />
          </div>
        ) : (
            <>
                <Navbar />
                <LeftPart />
                <CenterPart />
            </>
        )}
      </>
    </main>
  )
}

export default Page;
