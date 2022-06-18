/* eslint-disable no-restricted-globals */
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { create } from "@suchangv/route-interceptor";

const interceptor = create({
  way: ["a", "hash", "history", "window.open", "location"],
  intercept: (path) => {
    // return path.replace("/bbb", "/ccc");
    return false;
  },
});

interceptor.start();

const Component = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>We have three pages, AAA, BBB and CCC</div>
      <div>When jump BBB, will intercept to CCC</div>
      <a href="/aaa">
        <button>Refresh to AAA</button>
      </a>
      <div>
        <h2>Anchor Tag</h2>
        <a href="/bbb">go BBB</a>
        <br />
        <a href="/bbb" target="_blank">
          go BBB with _blank
        </a>
      </div>
      <div>
        <h2>window.open</h2>
        <button onClick={() => window.open("/bbb")}>open BBB</button>
        <br />
        <button onClick={() => window.open("/bbb", "_self")}>
          open BBB with _self
        </button>
      </div>
      <div>
        <h2>history</h2>
        <button onClick={() => navigate("/bbb")}>navigate('/bbb')</button>
        <br />
        <button onClick={() => navigate("/bbb", { replace: true })}>
          {`navigate("/bbb", { replace: true })`}
        </button>
      </div>
      <div>
        <h1>location</h1>
        <button onClick={() => (location.href = "/bbb")}>
          {`location.href = '/bbb'`}
        </button>
        <br />
        <button onClick={() => location.replace("/bbb")}>
          {`location.replace("/bbb")`}
        </button>
      </div>
      <Routes>
        <Route path="/aaa" element={<h1>AAA</h1>} />
        <Route path="/bbb" element={<h1>BBB</h1>} />
        <Route path="/ccc" element={<h1>CCC</h1>} />
      </Routes>
    </div>
  );
};

export const App = () => (
  <BrowserRouter>
    <Component />
  </BrowserRouter>
);

// import { useState } from "react";
// import {
//   BrowserRouter,
//   HashRouter,
//   Routes,
//   Route,
//   Link,
// } from "react-router-dom";
// import { create } from "@suchangv/route-interceptor";

// const interceptor = create({
//   way: ["a", "hash", "history", "window.open", "location"],
//   intercept: (path) => {
//     console.log(path);
//     return path + "2";
//   },
// });

// interceptor.start();

// const Component = () => {
//   return (
//     <>
//       <div>
//         <Link to="/">首页</Link>
//         <Link to="/about">关于</Link>
//         <Link to="/help">帮助</Link>
//       </div>
//       <div>
//         <Routes>
//           <Route path="/" element={"首页"} />
//           <Route path="/2" element={"首页2"} />
//           <Route path="/about" element={"关于"} />
//           <Route path="/about2" element={"关于2"} />
//           <Route path="/help" element={"帮助"} />
//           <Route path="/help2" element={"帮助2"} />
//         </Routes>
//       </div>
//     </>
//   );
// };

// export const App = () => {
//   const [routerType, setRouterType] = useState<"history" | "hash">("history");

//   return (
//     <>
//       <div>Current Router Type: {routerType}</div>
//       <button
//         onClick={() =>
//           setRouterType((type) => (type === "history" ? "hash" : "history"))
//         }
//       >
//         Change Router type
//       </button>
//       {routerType === "history" && (
//         <BrowserRouter>
//           <Component />
//         </BrowserRouter>
//       )}
//       {routerType === "hash" && (
//         <HashRouter>
//           <Component />
//         </HashRouter>
//       )}
//     </>
//   );
// };
