import React, { Component } from 'react'
import { Field, reduxForm } from "redux-form"

class StreamForm extends Component {
    renderError = ({ touched, error }) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
    renderInput = ({ input, label, meta }) => {
        ////input and meta are objects of properties for each "Field component" which we will need
        //console.log(input)
        //console.log(meta)
        const className = `field ${meta.error && meta.touched ? "error" : ""}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }
    onSubmit = values => {
        this.props.onSubmit(values)
    }
    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" label="Enter Title" component={this.renderInput} />
                <Field name="description" label="Enter Description" component={this.renderInput} />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = formValues => {
    const errors = {}
    if (!formValues.title) {
        errors.title = "u must enter a title"
    }
    if (!formValues.description) {
        errors.description = "u must enter a description"
    }
    return errors;
}

export default (reduxForm({
    form: "streamForm",
    validate
})(StreamForm))
