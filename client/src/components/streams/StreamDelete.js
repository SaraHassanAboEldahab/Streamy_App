import React, { useEffect } from 'react'
import Modal from '../Modal'
import history from "../../history"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { deleteStream, fetchStream } from "../../actions"

const StreamDelete = ({ match, deleteStream, stream, fetchStream }) => {

    useEffect(() => {
        fetchStream(match.params.id)
    }, [])
    const actions = (
        <>
            <button className="ui button negative"
                onClick={() => deleteStream(match.params.id)}>
                Delete
            </button>
            <Link to="/" className="ui button"> Cancel</Link>
        </>
    )
    return (
        <div>
            {stream ? <Modal
                title={`Delete Stream`}
                content={`Are You Sure You Want To Delete This Stream with title: ${stream.title}`}
                actions={actions}
                onDismiss={() => history.push("/")}
            />
                : null
            }
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}
export default connect(mapStateToProps, { deleteStream, fetchStream })(StreamDelete)
