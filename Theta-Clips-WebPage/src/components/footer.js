import React, { Component } from 'react';
import { Col, Input, Row, Button } from 'reactstrap';
//import { FaDiscord } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import logo from '../assets/logof.png';
import ipfs from '../assets/IPFS.png';
import solidity from '../assets/solidity.png';
import { connect } from 'react-redux';

class Footer extends Component {

    componentDidMount() {
        
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div id="footer-content" className="footer-style" style={{ overflowY: "hidden", overflowX: "hidden", marginTop:"-1vh" }}>
                <div id="footer-mover" style={{ backgroundColor: '#333' }}>
                </div>
                <br />
                <div id="footer-div1">
                    <Row style={{ fontSize: "1.2rem" }}>
                        <Col>
                            {""}
                        </Col>
                        <Col>
                            <img src={logo} alt="logos" style={{ width: "auto", height: "150px", paddingBottom: "2vh" }} />
                            <div className="flexbox-style">
                                <div>
                                    <Input style={{ borderRadius: "25px 0px 0px 25px", fontSize: "1.5rem", width: "30vw" }} type="email" placeholder="Subscribe and stay up to date" />
                                </div>
                                <div>
                                    <Button style={{ width: "12vw", borderRadius: "0px 25px 25px 0px", fontSize: "1.5rem", background: `#d209c3` }}>
                                        Subscribe
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            {""}
                        </Col>
                        <Col>
                            <div style={{ width: "30vw" }}>
                                <div>
                                    Follow Theta Clips!
                                </div>
                                <p />
                                <Row>
                                    <Col>
                                        <FaTwitter
                                            onClick={() => window.open("https://twitter.com/nft_ondemand", "_blank")}
                                            style={{ fontSize: "4rem", color: "#1DA1F2" }}
                                        />
                                    </Col>
                                    <Col>
                                        <FaInstagram
                                            onClick={() => window.open("https://www.instagram.com/nft_ondemand", "_blank")}
                                            style={{ fontSize: "4rem", color: "#cd486b" }}
                                        />
                                    </Col>
                                    <Col>
                                        <FaFacebook
                                            onClick={() => window.open("https://www.facebook.com/NFTonDemand-101718632295561", "_blank")}
                                            style={{ fontSize: "4rem", color: "#4267B2" }}
                                        />
                                    </Col>
                                    <Col>
                                        <FaYoutube
                                            onClick={() => window.open("https://www.youtube.com/channel/UC0Tu8Wk11Bkx092eusUKnow", "_blank")}
                                            style={{ fontSize: "4rem", color: "#FF0000" }}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col>
                            {""}
                        </Col>
                    </Row>
                </div>
                <hr />
                <div id="footer-div2" style={{ paddingBottom: "1vh" }}>
                    <Row>
                        <Col>
                            {""}
                        </Col>
                        <Col>
                            <div style={{ color: "white", fontWeight: "bolder", fontSize: "1.7rem", width: "40vw" }}>
                            Collect and trade great moments from your favourite creators.
                            </div>
                        </Col>
                        <Col>
                            {""}
                        </Col>
                        <Col>
                            <div style={{ color: "white", width: "40vw" }}>
                                <Row md="3">
                                    <Col>
                                        <div>
                                            <div style={{ fontSize: "1.3rem", fontWeight: "bolder" }}>
                                                Theta Clips
                                            </div>
                                            <Col>
                                                <a className="nostyle" href="/gallery">
                                                    Marketplace
                                                </a>
                                            </Col>
                                            <Col>
                                                <a className="nostyle" href="/">
                                                    Games
                                                </a>
                                            </Col>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div>
                                            <div style={{ fontSize: "2rem", fontWeight: "bolder" }}>
                                                Connect
                                            </div>
                                            <Col>
                                                <a className="nostyle" href="https://github.com/altaga/NFT-on-Demand" target="_blank" rel="noopener noreferrer">
                                                    FAQ's
                                                </a>
                                            </Col>
                                            <Col>
                                                <a className="nostyle" href="https://www.instagram.com/nft_ondemand" target="_blank" rel="noopener noreferrer">
                                                    Instagram
                                                </a>
                                            </Col>

                                            <Col>
                                                <a className="nostyle" href="https://twitter.com/nft_ondemand" target="_blank" rel="noopener noreferrer">
                                                    Twitter
                                                </a>
                                            </Col>

                                            <Col>
                                                <a className="nostyle" href="https://www.youtube.com/channel/UC0Tu8Wk11Bkx092eusUKnow" target="_blank" rel="noopener noreferrer">
                                                    YouTube
                                                </a>
                                            </Col>
                                            <Col>
                                                <a className="nostyle" href="mailto:nftondemand@yandex.com">
                                                    Contact
                                                </a>
                                            </Col>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div>
                                            <div style={{ fontSize: "2rem", fontWeight: "bolder" }}>
                                                My Profile
                                            </div>
                                            <Col>
                                                <a className="nostyle" href="/">
                                                    Profile
                                                </a>
                                            </Col>
                                            <Col>
                                                {
                                                    this.props.my_pubkey.pubkey !== "" &&
                                                    <a className="nostyle" href="/order-review">
                                                        My Orders
                                                    </a>
                                                }
                                            </Col>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col>
                            {""}
                        </Col>
                    </Row>
                </div>
                <hr />
                <div id="footer-div3" style={{ paddingBottom: "2vh" }}>
                    <Row>
                        <Col>
                            Build on <img alt="imagens" src={solidity} height="20px" /> powered by<img alt="imagsens" src={ipfs} height="20px" />
                        </Col>
                        <Col>
                            <div style={{ textAlign: "end" }}>
                                <div className="flexbox-style">
                                    <div style={{ paddingRight: "10px" }}>
                                        <a className="nostyle" href="/privacy" target="_blank">
                                            Privacy Policy
                                        </a>
                                    </div>
                                    <div>
                                        <a className="nostyle" href="/terms" target="_blank">
                                            Terms of Use
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        my_pubkey: state.my_pubkey
    }
}

export default connect(mapStateToProps, null)(Footer)