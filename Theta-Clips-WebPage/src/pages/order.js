import React, { Component } from 'react';
import { Button, Card, CardBody, CardImg, CardSubtitle, CardTitle, Col, Input, Label, Row } from 'reactstrap';
import '../assets/main.css';
import { connect } from 'react-redux';
import { set_contracturl_action } from "../redux/actions/syncActions/updateContractUrlaction"
import { set_pubkey_action } from "../redux/actions/syncActions/updatePublicKeyaction"
import { set_activetab_action } from '../redux/actions/syncActions/setActiveTabaction';
import autoBind from 'react-autobind';
import Header from '../components/header';
import { abi } from '../contracts/nftContract';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import thetaIcon from '../assets/theta-token.svg';
const Web3 = require('web3')
const dataweb3 = new Web3("https://eth-rpc-api-testnet.thetatoken.org/rpc");

const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
            artist: {},
            prices: [],
            selectedArtist: "",
            status: [],
            generalOrders: {},
            description: ""
        }
        autoBind(this);
        this.unirest = require('unirest');
    }

    async componentDidMount() {
        this.props.set_activetab_action(0);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.my_pubkey.pubkey !== "" && JSON.stringify(prevProps.my_pubkey.pubkey) !== JSON.stringify(this.props.my_pubkey.pubkey)) {
            this.unirest('GET', 'https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/getFullDB')
                .end((res) => {
                    if (res.error) throw new Error(res.error);
                    if (res.body.length > 0) {
                        const elements = res.body;
                        let temp = {};
                        let temp2 = [];
                        for (let i = 0; i < elements.length; i++) {
                            if (temp[elements[i]["PubKey"]] === undefined) {
                                temp[elements[i]["PubKey"]] = [];
                                temp2.push(elements[i])
                            }
                        }
                        for (let i = 0; i < temp2.length; i++) {
                            this.getOrdersStatus(temp2[i].PubKey)
                        }
                        this.setState({
                            elements: temp2
                        }, () => {
                            for (let i = 0; i < this.state.elements.length; i++) {
                                this.updatePrice(this.state.elements[i]["Contract"], i)
                            }
                        });
                    }
                });
        }
    }

    async getOrdersStatus(pub) {
        let temp = this.state.generalOrders
        this.unirest('GET', 'https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/getExtraData')
            .headers({
                'pubkey': pub,
                'id': 1000000
            })
            .end((res) => {
                if (res.error) throw new Error(res.error);
                if (res.body.order === undefined) {
                    temp[pub] = {
                        "order": [],
                        "state": "0"
                    }
                    this.setState({
                        generalOrders: temp
                    })
                }
                else {
                    temp[pub] = res.body
                    this.setState({
                        generalOrders: temp
                    })
                }
            });
    }

    async getOneArtist() {
        this.unirest('GET', 'https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/getDB')
            .headers({
                'pubkey': this.state.selectedArtist
            })
            .end((res) => {
                if (res.error) throw new Error(res.error);
                if (res.body.length > 0) {
                    let temp = [];
                    for (let i = 0; i < res.body.length; i++) {
                        temp.push("0");
                    }
                    this.setState({
                        elements: res.body,
                        prices: temp
                    }, () => {
                        for (let i = 0; i < res.body.length; i++) {
                            this.updatePrice(res.body[i]["Contract"], i)
                        }
                        this.props.set_activetab_action(1);
                    });
                }
            });
    }

    updatePrice(contract, id) {
        const mint_contract = new dataweb3.eth.Contract(abi(), contract);
        mint_contract.methods.flag().call().then(status => {
            let temp = this.state.status;
            temp[id] = status;
            this.setState({
                status: temp
            });
        });
        mint_contract.methods.price().call().then(price => {
            let temp = this.state.prices;
            temp[id] = parseFloat(dataweb3.utils.fromWei(price, 'ether'));
            this.setState({
                prices: temp
            });
        });
    }

    setOrder() {
        this.unirest('GET', 'https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/getExtraData')
            .headers({
                'pubkey': this.state.selectedArtist,
                'id': 1000000
            })
            .end((res) => {
                if (res.error) throw new Error(res.error);
                let temp = JSON.parse(res.body.order);
                temp.push({
                    "pubkey": this.props.my_pubkey.pubkey,
                    "description": this.state.description
                })
                this.unirest('GET', 'https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/pubExtraDataDB')
                    .headers({
                        'pubkey': this.state.selectedArtist,
                        'id': '1000000',
                        'state': this.state.generalOrders[this.state.selectedArtist].state,
                        'order': JSON.stringify(temp)
                    })
                    .end((res) => {
                        if (res.error) throw new Error(res.error);
                        this.props.set_activetab_action(3);
                    });
            });
    }

    render() {
        return (
            <div className="App">
                <Header />
                <div className="body-style3" style={{ fontSize: "1.5rem" }} id="body-style">
                    <div style={{ padding: "20px" }}>
                        {
                            this.props.my_activetab.activetab === 0 &&
                            <div style={{ overflowY: "hidden", height: "100%" }}>
                                <div style={{ textAlign: "left", paddingLeft: "2vw" }}>
                                    <h3>Place your order from:</h3>
                                </div>
                                <div className="flexbox-style2">
                                    {
                                        this.state.elements.map((element, index) => {
                                            return (
                                                <Col style={{ width: "20vw" }}>
                                                    <Card key={index + "element"} style={{ margin: "6px" }}>
                                                        <div style={{ opacity: "100%", textAlign: "center", paddingTop: "10px" }} >
                                                            <CardImg style={{ width: "150px", height:"150px", borderRadius: "10px", border: "1px solid #bbb" }} top src={element.Url} alt="Card image cap" />
                                                        </div>
                                                        <CardBody>
                                                            <CardSubtitle style={{ paddingBottom: "6px" }} tag="h5" className="mb-2 text-muted">{JSON.parse(element.Data).attributes[0].artist}</CardSubtitle>
                                                            <CardSubtitle style={{ paddingBottom: "6px" }} tag="h5" className="mb-2 text-muted">
                                                                <div className="flexbox-style">
                                                                    <div>
                                                                        {"Price:"}
                                                                        <>&nbsp;</>
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            this.state.prices[index] === "0" ?
                                                                                "....."
                                                                                :
                                                                                this.state.prices[index]
                                                                        }
                                                                    </div>
                                                                    <>&nbsp;</>
                                                                    <img src={thetaIcon} style={{width:"24px", border:"1px solid black"}} />
                                                                    {
                                                                        !this.state.status[index] &&
                                                                        <div style={{ color: "red" }}>
                                                                            <>&nbsp;</>
                                                                            Sold
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </CardSubtitle>
                                                            <Button style={{ width: "200px", borderRadius: "25px", fontSize: "1.3rem", background: ` #d209c3` }} onClick={() => {
                                                                window.open(`/artist/${element.PubKey}`, "_blank");
                                                            }}>Open Gallery</Button>
                                                            <div style={{ height: "1vh" }} />
                                                            {
                                                                typeof (this.state.generalOrders[element.PubKey]) !== "undefined" &&
                                                                <Button disabled={!parseInt(this.state.generalOrders[element.PubKey].state)} style={{ width: "200px", borderRadius: "25px", fontSize: "1.3rem", background: ` #d209c3` }} onClick={() => {
                                                                    this.setState({
                                                                        selectedArtist: element.PubKey
                                                                    }, () => {
                                                                        this.getOneArtist();
                                                                    });
                                                                }}>Select Artist</Button>
                                                            }
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        }
                        {
                            (this.props.my_activetab.activetab === 1 && this.state.elements.length > 0) &&
                            <div>
                                <Row>
                                    <Col xs="3">
                                        <div style={{ textAlign: "left", paddingLeft: "2vw" }}>
                                            <h3>Artist Review</h3>
                                            <div style={{ opacity: "100%", textAlign: "center", paddingTop: "10px" }} >
                                                <h1>{JSON.parse(this.state.elements[0].Data).attributes[0].artist}</h1>
                                                <p />
                                                <CardImg style={{ width: "50%", borderRadius: "10px", border: "1px solid #bbb" }} top src={this.state.elements[0].Url} alt="Card image cap" />
                                            </div>
                                        </div>
                                        <br />
                                        <Card>
                                            Avg Price:
                                            <div style={{ textAlign: "center", paddingTop: "10px" }} >
                                                {arrAvg(this.state.prices)}
                                                <>&nbsp;</>
                                                <img src={thetaIcon} style={{width:"24px", border:"1px solid black"}} />
                                            </div>
                                        </Card>
                                        <br />
                                        <Button
                                            onClick={() => {
                                                this.props.set_activetab_action(2);
                                            }}
                                            style={{ width: "200px", borderRadius: "25px", fontSize: "1.5rem", background: ` #d209c3` }}>
                                            Order NOW
                                        </Button>
                                    </Col>
                                    <Col xs="9">
                                        <div style={{ textAlign: "left", paddingLeft: "2vw" }}>
                                            <h3>Description:</h3>
                                        </div>
                                        <div style={{ textAlign: "left", paddingLeft: "2vw" }}>
                                            <div>This great Mexican artist is ready to read your NFT proposal.</div>
                                        </div>
                                        <br />
                                        <div style={{ textAlign: "left", paddingLeft: "2vw" }}>
                                            <h3>Gallery:</h3>
                                        </div>
                                        <Row md="5">
                                            {
                                                this.state.elements.map((item, index) => {
                                                    return (
                                                        <Col key={"element" + index} style={{ margin: "10px" }}>
                                                            <Card style={{ width: "15vw", height: "34vh" }}>
                                                                <div style={{ opacity: "100%", textAlign: "center", paddingTop: "10px" }} >
                                                                    <CardImg style={{ width: "110px", height:"110px", borderRadius: "10px", border: "1px solid #bbb" }} top src={item.Url} alt="Card image cap" />
                                                                </div>
                                                                <CardBody>
                                                                    <CardTitle tag="h5">{JSON.parse(item.Data).name}</CardTitle>
                                                                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                                                                        <div className="flexbox-style">
                                                                            <div>
                                                                                {"Price:"}
                                                                                <>&nbsp;</>
                                                                            </div>
                                                                            <div>
                                                                                {
                                                                                    this.state.prices[index] === "0" ?
                                                                                        "....."
                                                                                        :
                                                                                        this.state.prices[index]
                                                                                }
                                                                            </div>
                                                                            <>&nbsp;</>
                                                                            <img src={thetaIcon} style={{width:"24px", border:"1px solid black"}} />
                                                                            {
                                                                                !this.state.status[index] &&
                                                                                <div style={{ color: "red" }}>
                                                                                    <>&nbsp;</>
                                                                                    Sold
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </CardSubtitle>
                                                                    <Button style={{ width: "200px", borderRadius: "25px", fontSize: "1.5rem", background: ` #d209c3` }} onClick={() => {
                                                                        window.open(`/nft/${item.PubKey}?id=${index}`, "_blank");
                                                                    }}>Open NFT</Button>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        }
                        {
                            (this.props.my_activetab.activetab === 2 && this.state.elements.length > 0) &&
                            <div style={{ paddingTop: "2vh" }}>
                                <Row>
                                    <Col xs="3">
                                        <div style={{ textAlign: "left", paddingLeft: "2vw" }}>
                                            <div style={{ opacity: "100%", textAlign: "center", paddingTop: "10px" }} >
                                                <h1>Artist</h1>
                                                <h3>{JSON.parse(this.state.elements[0].Data).attributes[0].artist}</h3>
                                                <p />
                                                <CardImg style={{ width: "50%", borderRadius: "10px", border: "1px solid #bbb" }} top src={this.state.elements[0].Url} alt="Card image cap" />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs="9">
                                        <Label for="exampleText">Describe how do you want your NFT from this artist!</Label>
                                        <Input onChange={(event) => {
                                            this.setState({
                                                description: event.target.value
                                            })
                                        }} style={{ height: "50vh" }} type="textarea" name="text" id="exampleText" />
                                        <br />
                                        <Button
                                            onClick={() => {
                                                this.setOrder();
                                            }}
                                            style={{ width: "200px", borderRadius: "25px", fontSize: "1.5rem", background: ` #d209c3` }}>
                                            Order NOW
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        }
                        {
                            this.props.my_activetab.activetab === 3 &&
                            <div style={{ paddingTop: "25vh" }}>
                                <Row md="1">
                                    <Col><div>
                                        Your order has been sent to the artist.
                                    </div>
                                    </Col>
                                    <br />
                                    <br />
                                    <Col><Button
                                        onClick={() => window.open(`/order-review`)}
                                        style={{ width: "200px", borderRadius: "25px", fontSize: "1.5rem", background: ` #d209c3` }}>
                                        Check Your Status Here
                                    </Button>
                                    </Col>
                                </Row>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps =
{
    set_contracturl_action,
    set_pubkey_action,
    set_activetab_action
}

const mapStateToProps = (state) => {
    return {
        my_contracturl: state.my_contracturl,
        my_pubkey: state.my_pubkey,
        my_ipfslink: state.my_ipfslink,
        my_activetab: state.my_activetab,
        my_nft: state.my_nft
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);