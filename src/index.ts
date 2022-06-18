export type Way = "a" | "window.open" | "history" | "hash" | "location";

export type Intercept = (url: string) => string | false;

export type InterceptorInstance = {
  start: () => void;
};

const originWindowOpen = window.open;

let isStarted = false;

export function create({
  way = [],
  intercept = () => false,
}: {
  way: Way[];
  intercept: Intercept;
}): InterceptorInstance {
  const start = () => {
    if (isStarted) {
      return;
    }
    isStarted = true;

    if (way.includes("a")) {
      _a(intercept);
    }
    if (way.includes("window.open")) {
      _windowOpen(intercept);
    }
    if (way.includes("history")) {
      _history(intercept);
    }
    if (way.includes("hash")) {
      _hash(intercept);
    }
    if (way.includes("location")) {
      window.$location = getFakeLocation(intercept);
    }
  };

  return {
    start,
  };
}

/**
 * intercept all Anchor tag
 */
function _a(intercept: Intercept) {
  // Mouse Event path polyfill
  if (!("path" in Event.prototype))
    Object.defineProperty(Event.prototype, "path", {
      get: function () {
        const path = [];
        let currentElem = this.target;
        while (currentElem) {
          path.push(currentElem);
          currentElem = currentElem.parentElement;
        }
        if (path.indexOf(window) === -1 && path.indexOf(document) === -1) path.push(document);
        if (path.indexOf(window) === -1) path.push(window);
        return path;
      },
    });

  document.addEventListener("click", function (event) {
    const path: HTMLElement[] | undefined = (event as any).path;
    if (path === undefined) return;

    if (event.defaultPrevented) {
      return;
    }

    for (const item of path) {
      if (item instanceof HTMLAnchorElement) {
        const to = intercept(item.href);
        if (to === false) {
          return;
        }

        event.preventDefault();
        return originWindowOpen.call(window, to, item.target);
      }
    }
  });
}

/**
 * intercept window.open
 */
function _windowOpen(intercept: Intercept) {
  window.open = (url?: string | URL, target?: string, features?: string): WindowProxy | null => {
    const path = url?.toString();
    if (path === undefined) {
      return null;
    }

    const to = intercept(path);
    if (to === false) {
      return null;
    }

    return originWindowOpen(to, target, features);
  };
}

/**
 * intercept history pushState & replaceState
 */
function _history(intercept: Intercept) {
  ["pushState", "replaceState"].forEach((funcName) => {
    const funcNameWithType = funcName as "pushState" | "replaceState";

    const originFunc = history[funcNameWithType];

    history[funcNameWithType] = (data: any, unused: string, url?: string | URL | null) => {
      if (url === undefined || url === null) {
        return;
      }

      const to = intercept(url.toString());
      if (to === false) {
        return;
      }

      return originFunc.call(history, data, unused, to);
    };
  });
}

let _nextHash = "";
/**
 * intercept hashchange
 */
function _hash(intercept: Intercept) {
  window.addEventListener("hashchange", function (event) {
    const url = new URL(event.newURL);
    const { hash } = url;

    if (hash === _nextHash) {
      _nextHash = "";
      return;
    }

    const to = intercept(hash.slice(1));

    if (to === false) {
      return;
    }

    _nextHash = `#${to}`;

    this.location.hash = _nextHash;
  });
}

/**
 * get fake location object
 */
function getFakeLocation(intercept: Intercept): Pick<Location, "href" | "replace"> {
  return {
    set href(value: string) {
      const to = intercept(value);
      if (to === false) {
        return;
      }
      location.href = to;
    },
    replace: (url: string | URL) => {
      const to = intercept(url.toString());
      if (to === false) {
        return;
      }
      location.replace(to);
    },
  };
}
