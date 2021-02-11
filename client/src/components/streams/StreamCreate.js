import React, { Component } from 'react'
import { connect } from "react-redux"
import { createStream } from "../../actions"
import StreamForm from "./StreamForm"

class StreamCreate extends Component {

    onSubmit = (values) => {
        this.props.createStream(values)
    }
    render() {
        return (
            <div>
                <h3>Create Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}

export default connect(null, { createStream })(StreamCreate)