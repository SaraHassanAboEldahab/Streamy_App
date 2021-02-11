import React from 'react'
import ReactDOM from "react-dom"

const Modal = ({ title, content, actions, onDismiss }) => {
    return ReactDOM.createPortal(
        <div onClick={onDismiss} className="ui dimmer modals active visible">
            <div onClick={(e) => e.stopPropagation()} className="ui standard modal active visible">
                <div className="header">{title}</div>
                <div className="content">
                    <h3 style={{ color: "gray" }}>{content}</h3>
                </div>
                <div className="actions">
                    {actions}
                </div>
            </div>
        </div>,
        document.querySelector("#modal")//this modal component will be rendered as child directly of the div with id="modal" which in html file
    )
}

export default Modal
