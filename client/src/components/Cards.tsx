import {useEffect, useState} from "react";
import Card from "./Card";
import { ICardData, ICardItem } from '../types/index';
import { getContractWithProvider } from "../utils/contractHelper";
import { useRecoilState } from "recoil";
import { walletAddrAtom } from "../recoil/atom/walletAddr";

export default function Cards() {
    const [NftData, setNftData] = useState<ICardItem[]>([]);
    const [boolData, setBoolData] = useState<Boolean[]>([]);
    const [walletAddr, _] = useRecoilState(walletAddrAtom);

    const getBoolArray = async()=>{
        let contract = await getContractWithProvider();
        let ans = await contract.getStatus();
        setBoolData(ans);
    }
    
    useEffect(() => {
      getBoolArray();
    }, [walletAddr])
    

    useEffect(() => {
        const apiUrl =
          "https://teal-still-rat-339.mypinata.cloud/ipfs/QmdmpaEQpnWNXVUapTmVHPitmaaArJrDJqCZy75f7UZdnZ";
    
        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((responseData:ICardData) => {
            // Handle the JSON data here
            setNftData(responseData.data);
          })
          .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
          });
      }, []);

  return <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {NftData.map((item: ICardItem, i) => (
          // TODO:change i+1 to i after new images
          <Card key={i} item={item} index={i + 1} isSold={boolData ? boolData[i + 1] : false} />
        ))}
      </div>
}
