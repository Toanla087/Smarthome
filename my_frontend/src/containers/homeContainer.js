import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import HomeComponent from "../components/home/homeComponent";
class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <HomeComponent {...this.props} />;
  }
}
const mapStateToProps = (state) => {
  console.log("user...", state.userState.user.data);
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addStateLed: (payload) => {
      dispatch(actions.assStateLed(payload));
    },
    createHome: (payload) => {
      dispatch(actions.add_home(payload));
    },
    deleteHome: (payload) => {
      dispatch(actions.delete_home(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
