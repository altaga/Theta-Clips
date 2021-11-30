import React from 'react'
import { post } from 'axios';
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { connect } from 'react-redux'
import { set_activetab_action } from '../redux/actions/syncActions/setActiveTabaction';
import { set_nft_action } from '../redux/actions/syncActions/setNFTaction';
import { set_ipfslink_action } from "../redux/actions/syncActions/updateIPFSaction"
import { abi } from '../contracts/nftContract';
import autoBind from 'react-autobind';
const Web3 = require('web3')

const streamers = {
  'Pokimane': '0xf2E92B90868aCcb8Ae7893D3DD9c067673951BeD',
  'Disguised Toast': '0xf2E92B90868aCcb8Ae7893D3DD9c067673951BeD',
  'Ryukahr': '0xbe02B664004830D1145f605921295037154d77bA',
  'Ninja': '0xbe02B664004830D1145f605921295037154d77bA',
  'Solo Renekton Only': '0xbe02B664004830D1145f605921295037154d77bA',
  'NASA Channel': '0xbe02B664004830D1145f605921295037154d77bA',
  'Tyler1': '0xbe02B664004830D1145f605921295037154d77bA',
  'Scarra': '0xbe02B664004830D1145f605921295037154d77bA',
}

class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      description: 'Example Description',
      external_url: 'https://main.d3h8pyav6x8msw.amplifyapp.com/',
      name: ' Example NFT',
      game: `Example Game`,
      players: `Example Players`,
      year: `Example Year`,
      teams: `NaN`,
      streamer: `Example Streamer`,
    }
    autoBind(this);
    this.unirest = require('unirest');
    this.web3 = new Web3(window.ethereum);
  }

  onFormSubmit(e) {
    this.fileUpload(this.state.file).then((response) => {
      console.log(response)
      const mint_contract = new this.web3.eth.Contract(abi(), this.props.my_contracturl.contracturl, { from: this.props.my_pubkey.pubkey });
      mint_contract.methods.setStreamer(this.state.streamer).send().on('transactionHash', (hash) => {
        console.log(hash)
      }).on('confirmation', () => {
        this.props.set_activetab_action(4)
        this.props.set_nft_action(response.data.metadata)
        this.props.set_ipfslink_action(response.data)
      })
    })
  }

  onFileChange(e) {
    console.log(e.target.files[0])
    this.setState({ file: e.target.files[0] })
  }

  fileUpload(file) {
    const url = this.props.url;
    const formData = new FormData();
    formData.append('nft', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'name': this.state.name,
        'external_url': this.state.external_url,
        'description': this.state.description.replace('"', "'"),
        'game': this.state.game,
        'players': this.state.players,
        'year': this.state.year,
        'teams': this.state.teams,
      }
    }
    return post(url, formData, config)
  }

  render() {
    return (
      <div className="flexbox-style3" style={{ marginTop: "-100px" }}>
        <form>
          <p />
          <FormGroup>
            <Label for="">NFT Name</Label>
            <Input type="text" name="text" placeholder="Super NFT Name" onChange={(event) => {
              this.setState({ name: event.target.value })
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="">Description</Label>
            <Input type="text" name="text" placeholder="Super NFT Description" onChange={(event) => {
              this.setState({ description: event.target.value })
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="">Game Name</Label>
            <Input type="text" name="text" placeholder="Mortal Street Fighter X" onChange={(event) => {
              this.setState({ game: event.target.value })
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="">Date</Label>
            <Input type="date" name="text" placeholder="03/21/1969" onChange={(event) => {
              this.setState({ year: event.target.value })
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="">Streamer</Label>
            <Input defaultValue={"Select Streamer"} type="select" name="text" placeholder="Diago" onChange={(event) => {
              console.log(event.target.value)
              console.log(streamers[event.target.value])
              this.setState({ 
                players: event.target.value,
                streamer: streamers[event.target.value]
              })
            }}>
              <option disabled value={"Select Streamer"}>Select Streamer</option>
              {Object.keys(streamers).map((key, index) => {
                return <option key={index} value={key}>{key}</option>
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="">Game Url</Label>
            <Input type="text" name="text" placeholder="http://example.com" onChange={(event) => {
              this.setState({ external_url: event.target.value })
            }} />
          </FormGroup>
          <p />
          <FormGroup>
            <Label for="">NFT Video</Label>
            <p />
            <Input type="file" onChange={this.onFileChange} />
            <p />
            <Button id="upload2" style={{ width: "200px", borderRadius: "25px", fontSize: "1.5rem", background: ` #d209c3` }} color="primary" type="submit" onClick={() => {
              document.getElementById("upload2").innerHTML = "Uploading..."
              document.getElementById("upload2").disabled = true
              this.onFormSubmit()
            }}>Upload</Button>
          </FormGroup>
          <p />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps =
{
  set_activetab_action,
  set_nft_action,
  set_ipfslink_action
}

const mapStateToProps = (state) => {
    return {
        my_pubkey: state.my_pubkey,
        my_contracturl: state.my_contracturl,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleReactFileUpload);