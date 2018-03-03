import { connect } from "react-redux";
import Sweet from "./Sweet";

const mapStateToProps = ({ sweets }, ownProps) => {
  const sweet = sweets[ownProps.sweetId];
  return { sweet };
};

export default connect(mapStateToProps, null)(Sweet);
