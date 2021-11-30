import React, { Component } from 'react';
import { connect } from 'react-redux';
import search_action from "../redux/actions/asyncActions/searchAction"

class SearchTool extends Component {
    componentDidMount(){
        this.props.search_action("Hello world") 
    }
    render() {
        return (
            <div>
                <div>
                {this.props.search.result.utc_datetime}
                </div>
                {" "}
                <button style={{ fontSize: "1.6rem", color: "black" }} className="btn btn-danger" onClick={() => this.props.search_action("Hello world")}>
                    Update Date
                </button>
            </div>
        );
    }
}

const mapDispatchToProps =
{
    search_action
}

const mapStateToProps = (state) => {
    return {
        search:state.search
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTool); // connect(state, props)(mycomponent)