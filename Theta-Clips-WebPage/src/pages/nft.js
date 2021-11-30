// Basic imports
import '../assets/main.css';
import '../assets/fontawesome.min.css'
import { Component } from 'react';
import autoBind from 'react-autobind';
import Header from '../components/header';
import { Button, Card, Col, Input, Row } from 'reactstrap';
import { Grid } from 'react-loading-icons';
import { set_pubkey_action } from "../redux/actions/syncActions/updatePublicKeyaction"
import { connect } from 'react-redux';
import { abi } from '../contracts/nftContract';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import thetaIcon from '../assets/theta-token.svg';
import logoETH from '../assets/logo-ether.png'
const Web3 = require('web3')
const dataweb3 = new Web3("https://eth-rpc-api-testnet.thetatoken.org/rpc");

function stringToLower(str) {
    return str.toLowerCase();
}

class Nft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: false,
            extra_info: false,
            price: "0",
            actualAddress: false,
            increaseState: false,
            bid: "0",
            contract: "",
            account: "",
            extraData: {},
            status: true,
            image_url: "",
            youtube: "",
            long: "",
            streamerAddress: "",
            flag2: false,
        }
        autoBind(this);
        this.unirest = require('unirest');
        this.web3 = new Web3(window.ethereum);
        this.url_params = new URLSearchParams(this.props.location.search)
    }

    async componentDidMount() {
        const pub = this.props.match.params.pub;
        this.unirest('GET', 'https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/arcade-GetDB')
            .headers({
                'pubkey': pub
            })
            .end((res) => {
                if (res.error) throw new Error(res.error);
                if (res.body.length > 0) {
                    let temp = JSON.parse(res.body[this.url_params.get('id')].Data);
                    temp["awsimage"] = res.body[this.url_params.get('id')].Url;
                    const mint_contract = new dataweb3.eth.Contract(abi(), res.body[this.url_params.get('id')].Contract);
                    this.setState({
                        data: temp,
                        extra_info: res.body[this.url_params.get('id')],
                        contract: res.body[this.url_params.get('id')].Contract
                    });
                    mint_contract.methods.price().call().then(price => {
                        this.setState({
                            price: price,
                            bid: price
                        });
                    });
                    mint_contract.methods.flag().call().then(status => {
                        this.setState({
                            status: status
                        });
                    });
                    mint_contract.methods.flag2().call().then(status => {
                        this.setState({
                            flag2: status
                        });
                    });
                    mint_contract.methods.actualAddress().call().then(actualAddress => {
                        this.setState({
                            actualAddress: actualAddress
                        });
                    });
                    mint_contract.methods.streamer().call().then(streamerAddress => {
                        console.log(streamerAddress);
                        this.setState({
                            streamerAddress: streamerAddress
                        });
                    });
                }
            });
        this.unirest('GET', 'https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/arcadeGetExtraData')
            .headers({
                'pubkey': pub,
                'id': this.url_params.get('id')
            })
            .end((res) => {
                if (res.error) throw new Error(res.error);
                if (this.state.extraData["extraData"] === undefined) {
                    this.setState({
                        extraData: res.body
                    });
                }
                else {
                    this.setState({
                        extraData: res.body,
                        image_url: res.body.extraData.image_url,
                        youtube: res.body.extraData.youtube,
                        long: res.body.extraData.long
                    });
                }
            });
    }

    async increaseBid() {
        if (this.props.my_pubkey.pubkey !== "") {
            const mint_contract = new this.web3.eth.Contract(abi(), this.state.contract, { from: this.props.my_pubkey.pubkey });
            mint_contract.methods.bidUp().send({ from: this.props.my_pubkey.pubkey, value: this.state.bid }).on('transactionHash', (hash) => {
            }).on('confirmation', (confirmationNumber, receipt) => {
                if (confirmationNumber === 1) {
                    window.location.reload();
                }
            })
        }
    }

    async sell() {
        if (this.props.my_pubkey.pubkey !== "") {
            const mint_contract = new this.web3.eth.Contract(abi(), this.state.contract, { from: this.props.my_pubkey.pubkey });
            mint_contract.methods.finish().send({ from: this.props.my_pubkey.pubkey }).on('transactionHash', (hash) => {
            }).on('confirmation', (confirmationNumber, receipt) => {
                if (confirmationNumber === 1) {
                    window.location.reload();
                }
            })
        }
    }

    updateDB() {
        this.unirest('GET', 'https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/arcadePubExtraDataDB')
            .headers({
                'image': this.state.image_url,
                'long': this.state.long,
                'youtube': this.state.youtube,
                'id': this.url_params.get('id'),
                'pubkey': this.props.match.params.pub
            })
            .end((res) => {
                if (res.error) throw new Error(res.error);
                window.location.reload();
            });
    }

    authorize() {

    }

    render() {
        return (
            <div className="App" style={{ overflowX: "hidden" }}>
                <Header />
                {
                    this.state.data ?
                        <div className="body-style2" id="body-style">
                            <div>
                                <Row>
                                    <Col xs={5}>
                                        <div style={{ opacity: "100%", textAlign: "center", paddingTop: "10vh" }} >
                                            <video width="80%" src={`${this.state.data["awsimage"]}`} controls />
                                        </div>
                                        <p />
                                        <div>
                                            {
                                                stringToLower(this.state.streamerAddress) === stringToLower(this.props.my_pubkey.pubkey) ?
                                                    <>
                                                        <Button style={{ width: "50%", height: "100%", borderRadius: "25px", fontSize: "1.5rem", background: ` #d209c3` }} onClick={() => this.authorize()}>
                                                            Authorize
                                                        </Button>
                                                    </>
                                                    :
                                                    <>
                                                    </>
                                            }
                                        </div>
                                    </Col>
                                    <Col xs={7}>
                                        <div style={{ textAlign: "start", paddingTop: "20px" }}>
                                            <Row>
                                                <Col style={{ fontWeight: "bold", fontSize: "2rem" }}>
                                                    {this.state.data.name}
                                                </Col>
                                                <Col style={{ fontWeight: "bold", fontSize: "2rem", textAlign: "center" }}>
                                                    Game: <a href={this.state.data.external_url} target="_blank" rel="noopener noreferrer">{this.state.data.attributes[0].game}</a>
                                                </Col>
                                            </Row>
                                            <br />
                                            <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                                                Details:
                                                <p style={{ fontWeight: "normal", fontSize: "1.2rem" }}>
                                                    {this.state.data.description}
                                                </p>
                                                <Row md={2} style={{ paddingTop: "5vh", textAlign: "center" }}>
                                                    <Col>
                                                        <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                                                            Streamer: {this.state.data.attributes[0].players}
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                                                            Year: {this.state.data.attributes[0].year}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <br />

                                        <div style={{ marginTop: "5vh", marginBottom: "2vh" }} className="myhr2" />
                                        <Row>
                                            <Col>
                                                <Card style={{ fontSize: "2rem", background: "#00c6c6" }}>
                                                    {
                                                        (this.state.actualAddress && this.state.actualAddress !== "0x0000000000000000000000000000000000000000") ?
                                                            <Row>
                                                                {
                                                                    !this.state.status ?
                                                                        <>
                                                                            <Col>
                                                                                {`Sold by: ${dataweb3.utils.fromWei(this.state.price, "ether")} `}
                                                                                <img src={thetaIcon} style={{ width: "24px", border: "1px solid black" }} />
                                                                            </Col>
                                                                            <Col style={{ fontSize: "1.2rem" }}>
                                                                                {`Sold to:`}
                                                                                <a href={`https://testnet-explorer.thetatoken.org/address/${this.state.actualAddress}`} target="_blank" rel="noopener noreferrer">
                                                                                    <div>
                                                                                        {`${this.state.actualAddress.substring(0, 21)}`}
                                                                                    </div>
                                                                                    <div>
                                                                                        {`${this.state.actualAddress.substring(21, 42)}`}
                                                                                    </div>
                                                                                </a>
                                                                            </Col>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <Col>
                                                                                {`Last Bid: ${dataweb3.utils.fromWei(this.state.price, "ether")} `}
                                                                                <img src={thetaIcon} style={{ width: "24px", border: "1px solid black" }} />
                                                                            </Col>
                                                                            <Col style={{ fontSize: "1.2rem" }}>
                                                                                {`Bid from:`}
                                                                                <a href={`https://testnet-explorer.thetatoken.org/address/${this.state.actualAddress}`} target="_blank" rel="noopener noreferrer">
                                                                                    <div>
                                                                                        {`${this.state.actualAddress.substring(0, 21)}`}
                                                                                    </div>
                                                                                    <div>
                                                                                        {`${this.state.actualAddress.substring(21, 42)}`}
                                                                                    </div>
                                                                                </a>
                                                                            </Col>
                                                                        </>
                                                                }
                                                            </Row> :
                                                            <Row>
                                                                <Col>
                                                                    {`Min Bid: ${dataweb3.utils.fromWei(this.state.price, "ether")} `}
                                                                    <img src={thetaIcon} style={{ width: "24px", border: "1px solid black" }} />
                                                                </Col>
                                                                <Col style={{ fontSize: "1.2rem" }}>
                                                                    {`Mint from:`}
                                                                    <a href={`https://testnet-explorer.thetatoken.org/address/${this.props.match.params.pub}`} target="_blank" rel="noopener noreferrer">
                                                                        <div>
                                                                            {`${this.props.match.params.pub.substring(0, 21)}`}
                                                                        </div>
                                                                        <div>
                                                                            {`${this.props.match.params.pub.substring(21, 42)}`}
                                                                        </div>
                                                                    </a>
                                                                </Col>
                                                            </Row>
                                                    }
                                                </Card>
                                            </Col>
                                        </Row>
                                        <div style={{ marginTop: "2vh", marginBottom: "5vh" }} className="myhr2" />
                                        <Row>
                                            <Col>
                                                <Button style={{ width: "50%", height: "100%", borderRadius: "25px", fontSize: "1.5rem", background: ` #d209c3` }} onClick={() => window.open(this.state.extra_info.Etherscan, "_blank")}>
                                                    <div style={{ fontSize: "0.8rem", fontWeight: "bolder" }}>
                                                        View on
                                                    </div>
                                                    <img src={logoETH} alt="logoeth" width="100%" />
                                                </Button>
                                            </Col>
                                            <Col>
                                                {
                                                    this.props.my_pubkey.pubkey !== "" &&
                                                    <>
                                                        {
                                                            this.props.my_pubkey.pubkey === this.props.match.params.pub ?
                                                                <>{this.state.status ?
                                                                    <Row>
                                                                        <Col>
                                                                            <Button id="sell-button" style={{ width: "50%", height: "100%", borderRadius: "25px", fontSize: "2rem", background: ` #d209c3` }} onClick={() => {
                                                                                if (this.state.actualAddress !== "0x0000000000000000000000000000000000000000") {
                                                                                    document.getElementById("sell-button").disabled = true;
                                                                                    document.getElementById("sell-button").innerHTML = "Selling...";
                                                                                    this.sell();
                                                                                }
                                                                            }}>
                                                                                Sell
                                                                            </Button>
                                                                        </Col>
                                                                    </Row> :
                                                                    <Row>
                                                                        <Col>
                                                                            <Button disabled id="sell-button" style={{ width: "200px", borderRadius: "25px", fontSize: "2rem", background: ` #d209c3` }} >
                                                                                Sold
                                                                            </Button>
                                                                        </Col>
                                                                    </Row>
                                                                }
                                                                </> :
                                                                <>
                                                                    {
                                                                        this.state.status ?
                                                                            <Row style={{ paddingRight: "50px", paddingTop: "20px" }}>
                                                                                <Col>
                                                                                    <div className="flexbox-style">
                                                                                        <Input type="number" value={dataweb3.utils.fromWei(this.state.bid, "ether")} onChange={(event) => {
                                                                                            try {
                                                                                                if (parseFloat(event.target.value) > parseFloat(dataweb3.utils.fromWei(this.state.price, "ether"))) {
                                                                                                    this.setState({
                                                                                                        increaseState: true
                                                                                                    })
                                                                                                }
                                                                                                else {
                                                                                                    this.setState({
                                                                                                        increaseState: false
                                                                                                    })
                                                                                                }
                                                                                                this.setState({
                                                                                                    bid: dataweb3.utils.toWei(event.target.value, "ether")
                                                                                                })
                                                                                            }
                                                                                            catch (e) {
                                                                                            }
                                                                                        }} />
                                                                                        <div>
                                                                                            &nbsp;
                                                                                        </div>
                                                                                        <img src={thetaIcon} style={{ width: "24px", border: "1px solid black" }} />
                                                                                    </div>
                                                                                </Col>
                                                                                <Col>
                                                                                    <Button id="bid-button" disabled={!this.state.increaseState} style={{ width: "200px", borderRadius: "25px", fontSize: "1.5rem", background: ` #d209c3` }} onClick={() => {
                                                                                        this.setState({
                                                                                            increaseState: false
                                                                                        })
                                                                                        document.getElementById("bid-button").innerHTML = "Bidding...";
                                                                                        this.increaseBid()
                                                                                    }}>
                                                                                        Increase Bid
                                                                                    </Button>
                                                                                </Col>
                                                                            </Row> :
                                                                            <Row>
                                                                                <Col>
                                                                                    <Button id="sell-button" style={{ borderRadius: "25px", fontSize: "2rem", background: ` #d209c3` }} >
                                                                                        Order NFT ( coming soon)
                                                                                    </Button>
                                                                                </Col>
                                                                            </Row>
                                                                    }
                                                                </>
                                                        }
                                                    </>
                                                }
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            {
                                this.props.my_pubkey.pubkey === this.props.match.params.pub ?
                                    <>
                                        <div style={{ marginTop: "4vh" }} className="myhr2" />
                                        <div style={{ marginTop: "4vh", marginBottom: "4vh" }}>
                                            <div style={{ fontSize: "2rem", fontWeight: "bolder" }}>
                                                Collectible Details
                                            </div>
                                        </div>
                                        {
                                            (this.state.extraData["extraData"] !== undefined) ?
                                                <>
                                                    {
                                                        this.state.extraData.extraData.youtube !== "" ?
                                                            <div style={{ marginTop: "4vh", marginBottom: "4vh" }}>
                                                                <div style={{ fontSize: "2rem", fontWeight: "bolder" }}>
                                                                    <iframe
                                                                        width="853"
                                                                        height="480"
                                                                        src={`https://www.youtube.com/embed/${this.state.extraData.extraData.youtube.replace("https://www.youtube.com/watch?v=", "")}`}
                                                                        frameBorder="0"
                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                        allowFullScreen
                                                                        title="Embedded youtube"
                                                                    />
                                                                </div>
                                                            </div>
                                                            :
                                                            <Row md="1" style={{ padding: "1vh 0vh 1vh 0vh", width: "50vw", margin: "auto" }}>
                                                                <Col style={{ padding: "20px" }}>
                                                                    <Row>
                                                                        <Col>
                                                                            <div style={{ width: "90%", paddingLeft: "5%" }} className="flexbox-style">
                                                                                <Input id="yt1" style={{ borderRadius: "25px 0px 0px 25px", fontSize: "1.5rem" }} type="text" placeholder="YT Link" onChange={() => {
                                                                                    this.setState({
                                                                                        youtube: document.getElementById("yt1").value
                                                                                    })
                                                                                }} />
                                                                                <Button onClick={() => this.updateDB()} style={{ width: "200px", borderRadius: "0px 25px 25px 0px", fontSize: "1.5rem", background: ` #d209c3` }}>Upload</Button>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                    }
                                                    {
                                                        this.state.extraData.extraData.image !== "" ?
                                                            <div style={{ marginTop: "4vh", marginBottom: "4vh" }}>
                                                                <Row>
                                                                    <Col>
                                                                        <div style={{ width: "100%", height: "auto" }}>
                                                                            <img width="80%" src={this.state.extraData.extraData.image} alt="imagesa" />
                                                                        </div>
                                                                    </Col>
                                                                    <Col>
                                                                        <div style={{ textAlign: "start", fontWeight: "bold", fontSize: "2rem", paddingBottom: "4vh" }}>
                                                                            {this.state.data.name}
                                                                        </div>
                                                                        <div style={{ textAlign: "start", fontWeight: "normal", fontSize: "1rem", paddingRight: "10vw" }}>
                                                                            {
                                                                                this.state.extraData.extraData.long
                                                                            }
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </div> :
                                                            <Row md="1" style={{ padding: "1vh 0vh 1vh 0vh", width: "50vw", margin: "auto" }}>
                                                                <Col style={{ padding: "20px" }}>
                                                                    <Row>
                                                                        <Col>
                                                                            <div style={{ width: "90%", paddingLeft: "5%" }} className="flexbox-style">
                                                                                <Input id="img1" style={{ borderRadius: "25px 0px 0px 25px", fontSize: "1.5rem" }} type="text" placeholder="Image" onChange={() => {
                                                                                    this.setState({
                                                                                        image_url: document.getElementById("img1").value
                                                                                    })
                                                                                }} />
                                                                                <Button onClick={() => this.updateDB()} style={{ width: "200px", borderRadius: "0px 25px 25px 0px", fontSize: "1.5rem", background: ` #d209c3` }}>Upload</Button>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                    }
                                                </>
                                                :
                                                <Row md="1" style={{ padding: "0vh 0vh 4vh 0vh", width: "50vw", margin: "auto" }}>
                                                    <Col style={{ padding: "20px" }}>
                                                        <Row>
                                                            <Col>
                                                                <div style={{ width: "90%", paddingLeft: "5%" }} className="flexbox-style">
                                                                    <Input id="yt1" style={{ borderRadius: "25px 0px 0px 25px", fontSize: "1.5rem" }} type="text" placeholder="YT Link" onChange={() => {
                                                                        this.setState({
                                                                            youtube: document.getElementById("yt1").value
                                                                        })
                                                                    }} />
                                                                    <Button onClick={() => this.updateDB()} style={{ width: "200px", borderRadius: "0px 25px 25px 0px", fontSize: "1.5rem", background: ` #d209c3` }}>Upload</Button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col style={{ padding: "20px" }}>
                                                        <Row>
                                                            <Col>
                                                                <div style={{ width: "90%", paddingLeft: "5%" }} className="flexbox-style">
                                                                    <Input id="img1" style={{ borderRadius: "25px 0px 0px 25px", fontSize: "1.5rem" }} type="text" placeholder="Image" onChange={() => {
                                                                        this.setState({
                                                                            image_url: document.getElementById("img1").value
                                                                        })
                                                                    }} />
                                                                    <Button onClick={() => this.updateDB()} style={{ width: "200px", borderRadius: "0px 25px 25px 0px", fontSize: "1.5rem", background: ` #d209c3` }}>Upload</Button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                        }
                                    </>
                                    :
                                    <>
                                        {
                                            (this.state.extraData["extraData"] !== undefined) &&
                                            <>
                                                <div style={{ marginTop: "4vh" }} className="myhr2" />
                                                <div style={{ marginTop: "4vh", marginBottom: "4vh" }}>
                                                    <div style={{ fontSize: "2rem", fontWeight: "bolder" }}>
                                                        Collectible Details
                                                    </div>
                                                </div>
                                                {
                                                    this.state.extraData.extraData.youtube !== "" &&
                                                    <div style={{ marginTop: "4vh", marginBottom: "4vh" }}>
                                                        <div style={{ fontSize: "2rem", fontWeight: "bolder" }}>
                                                            <iframe
                                                                width="853"
                                                                height="480"
                                                                src={`https://www.youtube.com/embed/${this.state.extraData.extraData.youtube.replace("https://www.youtube.com/watch?v=", "")}`}
                                                                frameBorder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                                title="Embedded youtube"
                                                            />
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    this.state.extraData.extraData.image !== "" &&
                                                    <div style={{ marginTop: "4vh", marginBottom: "4vh" }}>
                                                        <Row>
                                                            <Col>
                                                                <div style={{ width: "100%", height: "auto" }}>
                                                                    <img width="80%" src={this.state.extraData.extraData.image} alt="imagesa" />
                                                                </div>
                                                            </Col>
                                                            <Col>
                                                                <div style={{ textAlign: "start", fontWeight: "bold", fontSize: "2rem", paddingBottom: "4vh" }}>
                                                                    {this.state.data.name}
                                                                </div>
                                                                <div style={{ textAlign: "start", fontWeight: "normal", fontSize: "1rem", paddingRight: "10vw" }}>
                                                                    {
                                                                        this.state.extraData.extraData.long
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                }
                                            </>
                                        }
                                    </>
                            }
                        </div>
                        :
                        <>
                            <div className="body-style">
                                <div style={{ paddingTop: "25vh" }}>
                                    <Grid fill="black" />
                                </div>
                            </div>
                        </>
                }
            </div>
        );
    }
}

const mapDispatchToProps =
{
    set_pubkey_action,
}

const mapStateToProps = (state) => {
    return {
        my_pubkey: state.my_pubkey,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nft);