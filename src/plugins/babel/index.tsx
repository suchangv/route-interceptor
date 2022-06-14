// @ts-nocheck
import { PluginObj } from "@babel/core";

export function RouteInterceptorBabelPlugin(): PluginObj {
  return {
    name: "route-interceptor-babel-plugin",

    visitor: {
      // replace location.href to _location.href
      AssignmentExpression(path) {
        const { node } = path;
        const { left } = node;
        if (
          left.type === "MemberExpression" &&
          left.object.name === "location" &&
          left.property.name === "href"
        ) {
          left.object.name = "_location";
        }
      },
      // replace location.replace to _location.replace
      CallExpression(path) {
        const { node } = path;
        const { callee } = node;
        if (callee.type === "MemberExpression" && callee.object.name === "location") {
          callee.object.name = "_location";
        }
      },
    },
  };
}

export default RouteInterceptorBabelPlugin;