import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Nav from "../components/Nav";

export default function NFT() {

    const router = useRouter();

    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [desc, setDesc] = useState();
    const [collection, setCollection] = useState([]);

    useEffect(() => {
        // setCollection([]);
        if(router.query.data) {
            console.log(router.query.data);
            const data = JSON.parse(router.query.data)
            setImage(data.nft.image)
            setName(data.nft.name)
            setDesc(data.nft.description)

            //Create a dummy collection of nfts
            collection.length = 0;
            for(let i = 1; i < 8; i++) {
                let nft = data.nft;
                nft.id = i;
                collection.push(nft);
            }
            console.log(collection.length)
        }
    });

    return <div className={styles.container}>
        <Nav />
        <div className="ml-[25px] mr-[25px]">
            <div className="mt-5 mb-6 text-2xl">{name}</div>
            <div className="flex ml-[45px] mr-[25px]">
                <Image
                src={image}
                width={300}
                height={300}
                alt="nft"
                ></Image>
                <div className="ml-[40px]">
                    <div className="mt-[20px] flex">
                        Issued By: 
                        <div className="border-groove border-[1px] ml-2 mr-2 -mt-2 bg-grey-light border-black h-[40px] w-[40px] rounded-[40px]">
                            <Image
                                src="/ey_logo.png"
                                width={25}
                                height={25}
                                className="float-left ml-2 mt-2"
                            />
                        </div>
                        EY Blockchain
                    </div>
                    <div className="mt-[20px] text-sm">
                        Description: {desc}
                    </div>
                    <div className="mt-[20px] text-sm">
                        Chain: Polygon
                    </div>
                    <div className="mt-[20px] text-sm">
                        About EY Blockchain Guild NFTs: The Blockchain Guild is designed to help you learn about some of the most innovative and important topics in the industry. Every Friday we host a session on a new Blockchain-related topic. These include emerging DeFi projects, important underlying technologies, and key considerations as the ecosystem evolves.
                    </div>
                </div>
            </div>
        </div>
        <div className="ml-[25px] mr-[25px] mt-[60px]">
            <div className="flex">
                <div className="mt-5 mb-6 text-2xl justify-start">EY Blockchain Guild Collection</div>  
                <button className="h-[36px] w-[125px] text-xs text-white bg-grey-medium ml-[20px] mt-[18px] rounded-[20px]">View Collection</button>
               
            </div>
            
            <div className="flex">
                {collection.map(nft => (
                    <Image key={nft.id} src={nft.image}
                    width={100}
                    height={100}
                    alt="nft"
                    className="ml-[45px]"/>
                ))}
            </div>
        </div>
    </div>
}