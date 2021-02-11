import React, { Component } from "react"
import { connect } from "react-redux"
import { signIn, signOut } from "../actions"

class GoogleAuth extends Component {

    componentDidMount() {
        window.gapi.load("client:auth2", () => {//here we load up the js code (client:auth2) which is related to the part of the library that we want to use.
            window.gapi.client.init({//initialize the google's API library
                clientId: "198485272680-u3s1pchqepf35rsbh9n2ehefrnp4j4kh.apps.googleusercontent.com",
                scope: "email"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()//get the object which contains all methods we will need
                this.onAuthChange(this.auth.isSignedIn.get())//get the status of the user whether he signed_In or signed_Out
                this.auth.isSignedIn.listen(this.onAuthChange)//listen(track) if the auth status is changed at some point in the future
            })
        })
    }
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In With Google
                </button>
            )
        }
    }
    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);