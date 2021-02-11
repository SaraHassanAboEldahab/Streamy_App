import React, { useEffect, useRef } from 'react'
import flv from "flv.js"
import { connect } from "react-redux"
import { fetchStream } from "../../actions"

const StreamShow = ({ fetchStream, stream, match }) => {
    const ref = useRef()
    useEffect(() => {
        fetchStream(match.params.id)

        const player = flv.createPlayer({
            type: "flv",
            url: `http://localhost:8000/live/${match.params.id}.flv`
        });

        if (!player || !stream) {
            return;
        }
        player.attachMediaElement(ref.current)
        player.load()
        return () => {
            player.destroy()
        }
    }, [])

    return (
        <div>
            {stream ?
                <div>
                    <video ref={ref} style={{ width: "100%" }} controls />
                    <h1>{stream.title}</h1>
                    <h5>{stream.description}</h5>
                </div>
                : null
            }
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)
