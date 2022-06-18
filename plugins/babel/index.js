function RouteInterceptorBabelPlugin() {
  return {
    name: "route-interceptor-babel-plugin",

    visitor: {
      // replace location.href to $location.href
      AssignmentExpression(path) {
        const { node } = path;
        const { left } = node;
        if (
          left.type === "MemberExpression" &&
          left.object.name === "location" &&
          left.property.name === "href"
        ) {
          left.object.name = "$location";
        }
      },
      // replace location.replace to $location.replace
      CallExpression(path) {
        const { node } = path;
        const { callee } = node;
        if (
          callee.type === "MemberExpression" &&
          callee.object.name === "location" &&
          callee.property.name === "replace"
        ) {
          callee.object.name = "$location";
        }
      },
    },
  };
}

module.exports = RouteInterceptorBabelPlugin;
