import React from 'react'
import { connect } from 'react-redux'
import *as actions from '../actions/index'
import FormComponent from '../components/form/fromComponent'
class FormContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <FormComponent {...this.props} />
        )
    }
}
const mapStateToProps = (state) => {
    return {

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addStateLed: (payload) => {
            dispatch(actions.assStateLed(payload))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)
