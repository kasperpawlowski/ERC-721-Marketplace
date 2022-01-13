import React, {useState, useEffect}  from 'react'
import {Link} from 'react-router-dom';
import {ethers} from 'ethers';
import axios from 'axios';
import contractArtifact from '../abi/ERC721.json';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

export default function Home(props) {
    const [metadata, setMetadata] = useState([]);

    useEffect(() => {
        if(!(props.counter > 0 && props.address && props.provider)) {
            return;
        }

        (async () => {
            const contract = new ethers.Contract(props.address, contractArtifact.abi, props.provider);
            const currentMetadata = [];
            for(let id=0; id<(props.counter >= 3 ? 3 : props.counter); id++) {
                const tokenURI = await contract.tokenURI(id);
                await axios.get(tokenURI).then(result => {
                    if(!result.data.success) {
                    return;
                    }
                    currentMetadata.push(result.data.metadata);
                }).catch(_ => console.log('Backend server unavailable: getmetadata'));
            }

            setMetadata(currentMetadata);
        })();
    }, [props.counter, props.address]);

    return (
        <div className="w-50 m-auto mt-4">
            <h1>Checkout our newest NFT collection</h1>
            <h3>{metadata[0]?.properties.name.description}</h3>
            <Button as={Link} to="/marketplace" variant="warning" className="mt-4" 
                    style={{borderWidth: "0.1rem", borderRadius: "0.25rem", borderColor: "#010100"}}>
                Explore
            </Button>
            <Carousel variant="dark" style={{marginTop: "15vh"}}>
                {metadata.map((data, index) => {
                    return (
                        <Carousel.Item key={index} interval={2000}>
                            <img
                            className="center-blockmax-vh-50" style={{marginBottom: "15vh"}}
                            src={data.properties.image.description}
                            alt={`${data.properties.name.description} | ${data.properties.description.description}`}
                            />
                            <Carousel.Caption>
                            <h5>{data.properties.name.description}</h5>
                            <p>{data.properties.description.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>
    )
}
