import React, { Component } from 'react';
import { connect } from 'react-redux';

import { counter_down_action, counter_up_action } from "../redux/actions/syncActions/myActions"

class ModCounter extends Component {
    render() {
        return (
            <div>
                <button style={{ fontSize: "1.6rem", color: "black" }} className="btn btn-success" onClick={() => this.props.counter_up_action(1)}>
                    UP
                </button>
                {" "}
                <button style={{ fontSize: "1.6rem", color: "black" }} className="btn btn-danger" onClick={() => this.props.counter_down_action(1)}>
                    DOWN
                </button>
            </div>
        );
    }
}

const mapDispatchToProps =
{
    counter_down_action,
    counter_up_action
}

export default connect(null, mapDispatchToProps)(ModCounter); // connect(state, props)(mycomponent)