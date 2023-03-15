import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import HouseComponent from "../components/house/houseComponent";
class HouseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getTemperature();
  }

  render() {
    return <HouseComponent {...this.props} />;
  }
}
const mapStateToProps = (state) => {
  return {
    tempstate: state.tempstate.listState,
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTemperature: () => {
      dispatch(actions.getTemperature());
    },
    addStateLed: (payload) => {
      dispatch(actions.assStateLed(payload));
    },
    addStateDoor: (payload) => {
      dispatch(actions.addStateDoor(payload));
    },
    updateAir: (payload) => {
      dispatch(actions.updateAir(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HouseContainer);
