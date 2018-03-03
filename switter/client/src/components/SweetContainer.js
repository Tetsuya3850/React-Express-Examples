import { connect } from "react-redux";
import Sweet from "./Sweet";
import { handleLikeSweet, handleUnlikeSweet } from "../redux/sweets";

const mapStateToProps = ({ sweets, users }, ownProps) => {
  const sweet = sweets[ownProps.sweetId];
  const hasLiked = users.likedSweetIds.indexOf(ownProps.sweetId) > -1;
  return { sweet, hasLiked };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLikeSweet: sweetId => {
      dispatch(handleLikeSweet(sweetId));
    },
    handleUnlikeSweet: sweetId => {
      dispatch(handleUnlikeSweet(sweetId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sweet);
