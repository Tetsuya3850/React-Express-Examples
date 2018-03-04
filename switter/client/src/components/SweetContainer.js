import { connect } from "react-redux";
import Sweet from "./Sweet";
import { handleLikeSweet, handleUnlikeSweet } from "../redux/sweets";

const mapStateToProps = ({ sweets, users }, ownProps) => {
  const sweet = sweets[ownProps.sweetId];
  const hasLiked = sweet.likedByIds.indexOf(users.ownInfo._id) > -1;
  return { sweet, hasLiked, uid: users.ownInfo._id };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLikeSweet: (sweetId, uid) => {
      dispatch(handleLikeSweet(sweetId, uid));
    },
    handleUnlikeSweet: (sweetId, uid) => {
      dispatch(handleUnlikeSweet(sweetId, uid));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sweet);
