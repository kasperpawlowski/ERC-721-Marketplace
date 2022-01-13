import React, {useState, useEffect}  from 'react'
import {ethers} from 'ethers';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactLoading from "react-loading";
import contractArtifact from '../abi/ERC721.json';

export default function Marketplace(props) {
    const [metadata, setMetadata] = useState([]);

    useEffect(async () => {
        if(!(props.counter > 0 && props.address && props.provider)) {
            return;
        }

        const contract = new ethers.Contract(props.address, contractArtifact.abi, props.provider);
        const currentMetadata = [];
        for(let id=0; id<props.counter; id++) {
            const owner = await contract.ownerOf(id);
            const tokenURI = await contract.tokenURI(id);
            await axios.get(tokenURI).then(result => {
                if(!result.data.success) {
                return;
                }
                currentMetadata.push({owner, ...result.data.metadata});
          }).catch(_ => console.log('Backend server unavailable: getmetadata'));
        }

        setMetadata(currentMetadata);
    }, [props.counter, props.address]);

    return (
        <div className="w-75 m-auto mt-4 mb-4">
            {metadata.length === 0 ? 
            <div className="d-flex justify-content-center align-items-center" style={{marginTop: "15vh"}} >
                <ReactLoading type="spin" color="#010100" height="10vh" width="10vh" />
            </div> : 
            <div>
                <h3 className="mb-4">
                    {`${metadata[0]?.properties.name.description} collection has ${props.counter} unique NFTs`}
                </h3>
                <Row xs={1} md={2} xl={4} className="g-4">
                {metadata.map((data, i) => (
                    <Col key={i} >
                    <Card bg="light" className="h-100">
                        <Card.Img variant="top" 
                                  style={{"height": "15vw", "objectFit": "cover"}} 
                                  src={data.properties.image.description} />

                        <Card.Body>
                            <Card.Title>
                                {data.properties.description.description}
                            </Card.Title>
                            <Card.Text>
                                {`Current owner: ${data.owner.slice(0,6)}...${data.owner.slice(-4)}`}
                            </Card.Text>                            
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
                </Row>
            </div>}
      </div>
    )
}
