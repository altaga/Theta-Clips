import '../assets/main.css';
import { Component } from 'react';
import autoBind from 'react-autobind';
import Header from '../components/header';
import { abi } from '../contracts/nftContract';
import { Button, Card, CardBody, CardImg, CardSubtitle, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import thetaIcon from '../assets/theta-token.svg';
const Web3 = require('web3')
const dataweb3 = new Web3("https://eth-rpc-api-testnet.thetatoken.org/rpc");

function sortByArtistA(array) {
  return array.sort(function (a, b) {
    if (JSON.parse(a["Data"]).attributes[0].artist > JSON.parse(b["Data"]).attributes[0].artist) {
      return 1;
    }
    if (JSON.parse(a["Data"]).attributes[0].artist < JSON.parse(b["Data"]).attributes[0].artist) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
}

function sortByArtistD(array) {
  return array.sort(function (a, b) {
    if (JSON.parse(a["Data"]).attributes[0].artist < JSON.parse(b["Data"]).attributes[0].artist) {
      return 1;
    }
    if (JSON.parse(a["Data"]).attributes[0].artist > JSON.parse(b["Data"]).attributes[0].artist) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
}

function sortArraysA(arrays, comparator = (a, b) => (a < b) ? -1 : (a > b) ? 1 : 0) {
  let arrayKeys = Object.keys(arrays);
  let sortableArray = Object.values(arrays)[0];
  let indexes = Object.keys(sortableArray);
  let sortedIndexes = indexes.sort((a, b) => comparator(sortableArray[a], sortableArray[b]));

  let sortByIndexes = (array, sortedIndexes) => sortedIndexes.map(sortedIndex => array[sortedIndex]);

  if (Array.isArray(arrays)) {
    return arrayKeys.map(arrayIndex => sortByIndexes(arrays[arrayIndex], sortedIndexes));
  } else {
    let sortedArrays = {};
    arrayKeys.forEach((arrayKey) => {
      sortedArrays[arrayKey] = sortByIndexes(arrays[arrayKey], sortedIndexes);
    });
    return sortedArrays;
  }
}

function sortArraysD(arrays, comparator = (a, b) => (a > b) ? -1 : (a < b) ? 1 : 0) {
  let arrayKeys = Object.keys(arrays);
  let sortableArray = Object.values(arrays)[0];
  let indexes = Object.keys(sortableArray);
  let sortedIndexes = indexes.sort((a, b) => comparator(sortableArray[a], sortableArray[b]));

  let sortByIndexes = (array, sortedIndexes) => sortedIndexes.map(sortedIndex => array[sortedIndex]);

  if (Array.isArray(arrays)) {
    return arrayKeys.map(arrayIndex => sortByIndexes(arrays[arrayIndex], sortedIndexes));
  } else {
    let sortedArrays = {};
    arrayKeys.forEach((arrayKey) => {
      sortedArrays[arrayKey] = sortByIndexes(arrays[arrayKey], sortedIndexes);
    });
    return sortedArrays;
  }
}

function parse(array) {
  try {
    let temp = JSON.parse(array).attributes[0].artist;
    return temp
  }
  catch (e) {
    console.log(array);
    return "error";
  }
}

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      artist: {},
      prices: [],
      status: [],
    }
    autoBind(this);
    this.unirest = require('unirest');
  }

  async componentDidMount() {
    this.unirest('GET', 'https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/arcade-FullDB')
      .end((res) => {
        if (res.error) throw new Error(res.error);
        if (res.body.length > 0) {
          let temp = this.state.artist;
          let temp2 = res.body;
          let temp3 = []
          for (let i = 0; i < res.body.length; i++) {
            if (temp[res.body[i]["PubKey"]] === undefined) {
              temp[res.body[i]["PubKey"]] = 0;
            }
            else {
              temp[res.body[i]["PubKey"]]++;
            }
            temp2[i]["Counter"] = temp[res.body[i]["PubKey"]]
            temp3.push("0")
          }
          this.setState({
            elements: temp2,
            prices: temp3
          }, () => {
            for (let i = 0; i < this.state.elements.length; i++) {
              this.updatePrice(this.state.elements[i]["Contract"], i)
            }
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

  render() {
    return (
      <div className="App">
        <Header />
        <div className="body-style2" id="body-style" style={{ overflowX: "hidden" }}>
          <Row style={{ paddingLeft: "1vw", paddingTop: "1vh" }}>
            <Col xs="3" style={{ fontSize: "1.5rem", position: "fixed", paddingTop: "5.5px" }}>
              <Card style={{ backgroundColor: "#00c6c6" }}>
                <div id="price-div" onClick={() => {
                  document.getElementById("price-div2").hidden = !document.getElementById("price-div2").hidden;
                }}>
                  Price
                  <br />
                </div>
                <div id="price-div2">
                  <div>
                    <div style={{ paddingTop: "1vh", paddingBottom: "1vh" }}>
                      <Button style={{ width: "200px", borderRadius: "25px", fontSize: "1.3rem", background: ` #d209c3` }} onClick={() => {
                        let temp1 = this.state.elements;
                        let temp2 = this.state.prices;
                        let temp3 = sortArraysA([temp2, temp1]);
                        this.setState({
                          elements: temp3[1],
                          prices: temp3[0]
                        });
                      }}>
                        Low to High
                      </Button>
                    </div>
                    <div style={{ paddingTop: "1vh", paddingBottom: "2vh" }}>
                      <Button style={{ width: "200px", borderRadius: "25px", fontSize: "1.3rem", background: ` #d209c3` }} onClick={() => {
                        let temp1 = this.state.elements;
                        let temp2 = this.state.prices;
                        let temp3 = sortArraysD([temp2, temp1]);
                        this.setState({
                          elements: temp3[1],
                          prices: temp3[0]
                        });
                      }}>
                        High to Low
                      </Button>
                    </div>
                  </div>
                  <br />
                </div>
              </Card>
              <br />
              <Card style={{ backgroundColor: "#00c6c6" }}>
                <div id="artist-div" onClick={() => {
                  document.getElementById("artist-div2").hidden = !document.getElementById("artist-div2").hidden;
                }}>
                  Streamer
                  <br />
                </div>
                <div id="artist-div2">
                  <div style={{ paddingTop: "1vh", paddingBottom: "1vh" }}>
                    <Button style={{ width: "200px", borderRadius: "25px", fontSize: "1.3rem", background: ` #d209c3` }} onClick={() => {
                      this.setState({
                        elements: sortByArtistA(this.state.elements)
                      }, () => {
                        for (let i = 0; i < this.state.elements.length; i++) {
                          this.updatePrice(this.state.elements[i]["Contract"], i)
                        }
                      });
                    }}>
                      A to Z
                    </Button>
                  </div>
                  <div style={{ paddingTop: "1vh", paddingBottom: "2vh" }}>
                    <Button style={{ width: "200px", borderRadius: "25px", fontSize: "1.3rem", background: ` #d209c3` }} onClick={() => {
                      this.setState({
                        elements: sortByArtistD(this.state.elements)
                      }, () => {
                        for (let i = 0; i < this.state.elements.length; i++) {
                          this.updatePrice(this.state.elements[i]["Contract"], i)
                        }
                      });
                    }}>
                      Z to A
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
            <Col style={{ paddingLeft: "25vw" }}>
              <Row>
                {
                  this.state.elements.map((element, index) => {
                    return (
                      <Card key={index + "element"} style={{ width: "16vw", height: "40vh", margin: "6px", backgroundColor: "#00c6c6" }}>
                        <div style={{ opacity: "100%", textAlign: "center", paddingTop: "10px" }} >
                          <video width="200px" src={element.Url} />
                        </div>
                        <CardBody>
                          <CardSubtitle style={{ paddingBottom: "6px" }} tag="h5" className="mb-2 text-muted">{parse(element.Data)}</CardSubtitle>
                          <CardSubtitle style={{ paddingBottom: "6px" }} tag="h3" className="mb-2 text-muted">
                            <div className="flexbox-style" style={{ color: "white" }}>
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
                          <div style={{ fontSize: "1rem" }}>
                            {JSON.parse(element.Data).attributes[0].game}
                          </div>
                          <div style={{ position: "absolute", bottom: "5px" }}>
                            <Button style={{ width: "200px", borderRadius: "25px", fontSize: "1.3rem", background: ` #d209c3` }} onClick={() => {
                              window.open(`/nft/${element.PubKey}?id=${element.Counter}`, "_blank");
                            }}>Open NFT</Button>
                          </div>
                        </CardBody>
                      </Card>
                    );
                  })
                }
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Gallery;