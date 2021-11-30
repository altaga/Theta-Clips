import React, { Component } from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import Header from '../components/header';
import { set_pubkey_action } from "../redux/actions/syncActions/updatePublicKeyaction"
import { Card, CardBody, CardTitle } from 'reactstrap';

class OrderRev extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: "",
            data: [],
        };
        autoBind(this);
        this.unirest = require('unirest');
    }
    async componentDidMount() {
        setTimeout(() => {
            if (this.props.my_pubkey.pubkey === "") {

            }
        }, 1000);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.my_pubkey.pubkey !== "" && JSON.stringify(prevProps.my_pubkey.pubkey) !== JSON.stringify(this.props.my_pubkey.pubkey)) {
            this.unirest('GET', 'https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/getOrders')
                .headers({
                    'pubkey': this.props.my_pubkey.pubkey
                })
                .end((res) => {
                    if (res.error) throw new Error(res.error);
                    this.setState({
                        data: res.body.data,
                        artist: parseInt(res.body.artist)
                    });
                });
        }
    }

    render() {
        return (
            <div className="App">
                <Header />
                <div className="body-style3" style={{ fontSize: "1.5rem" }} id="body-style">
                    {
                        this.state.artist !== "" &&
                        <>
                            {
                                this.state.artist === 1 ?
                                    <div style={{}}>
                                        <h1>Pending Orders</h1>
                                        <div style={{ paddingLeft: "10vw" }}>
                                            {
                                                this.state.data.map((item, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <Card style={{ width: "80vw", paddingBottom: "4vh" }}>
                                                                <CardTitle>
                                                                    <h5>PubKey:</h5>
                                                                    <h3>{item.pubkey}</h3>
                                                                </CardTitle>
                                                                <CardBody>
                                                                    <h5>Description:</h5>
                                                                    <h3>{item.description}</h3>
                                                                </CardBody>
                                                            </Card>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        {
                                            this.state.data > 0 &&
                                            <h1>My Orders</h1>
                                        }
                                        <div style={{ paddingLeft: "10vw" }}>
                                            {
                                                this.state.data > 0 ?
                                                    <>
                                                        {
                                                            this.state.data.map((item, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <Card style={{ width: "80vw", paddingBottom: "4vh" }}>
                                                                            <CardTitle>
                                                                                <h5>PubKey:</h5>
                                                                                <h3>{item.pubkey}</h3>
                                                                            </CardTitle>
                                                                            <CardBody>
                                                                                <h5>Description:</h5>
                                                                                <h3>{item.description}</h3>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                    :
                                                    <h1 style={{ paddingRight: "10vw" }}>No Orders</h1>
                                            }
                                        </div>
                                    </div>
                            }
                        </>
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps =
{
    set_pubkey_action
}

const mapStateToProps = (state) => {
    return {
        my_pubkey: state.my_pubkey
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderRev);