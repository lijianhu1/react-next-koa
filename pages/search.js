import Router, { withRouter } from "next/router";
import dynamic from "next/dynamic";
const Comp = dynamic(import("../components/Comp"));
function Search({ router, name, time }) {
  console.log(time);

  function handleLink() {
    Router.push({
      pathname: "/",
      query: {
        id: 1
      }
    });
  }
  return (
    <div>
      Search <button onClick={handleLink}>B {router.query.id}</button>
      <strong>{name}</strong>
      <span>{time}</span>
      <Comp />
    </div>
  );
}

Search.getInitialProps = async ctx => {
  const moment = await import("moment"); // 按需加载模块，异步加载模块

  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: "laoli",
        time: moment.default(Date.now() - 60 * 1000).fromNow() //default *必须
      });
    }, 1000);
  });
  return await promise;
};

export default withRouter(Search);
