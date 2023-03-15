import React from 'react'
import { connect } from 'react-redux'
import *as actions from '../actions/index'
import LoginComponent from '../components/login/loginComponent'
class LoginContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <LoginComponent {...this.props}/>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user:state.userState.user
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        login:(payload)=>{
            dispatch(actions.login(payload))
        },
        register:(payload)=>{
            dispatch(actions.register(payload))
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(LoginContainer)
