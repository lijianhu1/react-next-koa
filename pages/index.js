import Link from "next/link";
import { connect } from "react-redux";
import { add } from "../store/actions";
function Index({ count, addNum }) {
  return (
    <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
      <Link href={`/search`}>
        <a>A</a>
      </Link>
      <br />
      <Link href={`/count`}>
        <a>count</a>
      </Link>
      <p>{count}</p>
      <button
        onClick={() => {
          addNum(2);
        }}
      >
        add
      </button>
    </div>
  );
}
Index.getInitialProps = async ({ reduxStore }) => {
  reduxStore.dispatch(add(3));
  return {};
};
function mapStateToprops(state) {
  return {
    count: state.count
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addNum: num => dispatch(add(num))
  };
}
export default connect(mapStateToprops, mapDispatchToProps)(Index);
