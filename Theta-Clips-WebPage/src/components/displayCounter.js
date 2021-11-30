import {Component} from "react"
import {connect} from "react-redux"

class DisCounter extends Component {

    render() {
        return (
            <div>
                Counter state {this.props.my_counter.counter}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        my_counter:state.my_counter
    }
}

export default connect(mapStateToProps,null)(DisCounter) // connect(state, props)(mycomponent)
