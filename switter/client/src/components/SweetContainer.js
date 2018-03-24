import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Sweet from "./Sweet";
import { handleLikeSweet, handleUnlikeSweet } from "../reducer/sweets";

const mapStateToProps = ({ sweets, users }, ownProps) => {
  const sweet = sweets[ownProps.sweetId];
  const hasLiked = sweet.likedByIds.indexOf(users.ownInfo._id) > -1;
  return { sweet, hasLiked, uid: users.ownInfo._id };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleLikeSweet,
      handleUnlikeSweet
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Sweet);
