import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { fetchStream, editStream } from "../../actions"
import StreamForm from "./StreamForm"

const StreamEdit = ({ match, fetchStream, stream, editStream }) => {
    useEffect(() => {
        fetchStream(match.params.id)
    }, [])

    const onSubmit = (values) => {
        editStream(match.params.id, values)
    }
    return (
        <div>
            {stream ?
                (<div>
                    <h3>Edit Stream</h3>
                    <StreamForm
                        onSubmit={onSubmit}
                        initialValues={{ title: stream.title, description: stream.description }}
                    />
                </div>
                ) : "Loading..."}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit)