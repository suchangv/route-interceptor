import { useState } from "react";
import { BrowserRouter, HashRouter, Routes, Route, Link } from "react-router-dom";
import { create } from "@suchangv/route-interceptor";

const interceptor = create({
  way: ["a", "hash", "history", "window.open", "location"],
  intercept: (path) => {
    console.log(path);
    return path + "2";
  },
});

interceptor.start();

const Component = () => {
  return (
    <>
      <div>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Link to="/help">帮助</Link>
      </div>
      <div>
        <Routes>
          <Route path="/" element={"首页"} />
          <Route path="/2" element={"首页2"} />
          <Route path="/about" element={"关于"} />
          <Route path="/about2" element={"关于2"} />
          <Route path="/help" element={"帮助"} />
          <Route path="/help2" element={"帮助2"} />
        </Routes>
      </div>
    </>
  );
};

export const App = () => {
  const [routerType, setRouterType] = useState<"history" | "hash">("history");

  return (
    <>
      <div>Current Router Type: {routerType}</div>
      <button onClick={() => setRouterType((type) => (type === "history" ? "hash" : "history"))}>
        Change Router type
      </button>
      {routerType === "history" && (
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      )}
      {routerType === "hash" && (
        <HashRouter>
          <Component />
        </HashRouter>
      )}
    </>
  );
};
