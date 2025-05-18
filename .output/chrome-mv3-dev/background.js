var background = function() {
  "use strict";
  var _a, _b;
  function defineBackground(arg) {
    if (arg == null || typeof arg === "function") return { main: arg };
    return arg;
  }
  const browser$1 = ((_b = (_a = globalThis.browser) == null ? void 0 : _a.runtime) == null ? void 0 : _b.id) ? globalThis.browser : globalThis.chrome;
  const browser = browser$1;
  const definition = defineBackground(() => {
    console.log("Basebrain background script initialized", { id: browser.runtime.id });
    browser.action.onClicked.addListener(async (tab) => {
      if (tab.id) {
        await browser.tabs.sendMessage(tab.id, { action: "toggleSidebar" });
      }
    });
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "checkAuth") {
        checkAuthCookies().then(sendResponse);
        return true;
      }
      if (request.action === "saveMemory") {
        saveMemory(request.payload).then(sendResponse);
        return true;
      }
      if (request.action === "updateMemoryNotes") {
        updateMemoryNotes(request.memoryId, request.notes, request.workspaceId).then(sendResponse);
        return true;
      }
    });
    browser.runtime.onInstalled.addListener(() => {
      console.log("Basebrain extension installed");
    });
  });
  async function checkAuthCookies() {
    try {
      console.log("Background: Checking authentication...");
      const allCookies = await browser.cookies.getAll({
        url: "https://basebrain.ai"
      });
      console.log("Background: All cookies found for basebrain.ai:", allCookies.map((c) => ({
        name: c.name,
        domain: c.domain,
        path: c.path,
        value: c.value.substring(0, 20) + "..."
      })));
      let authSessionCookie = allCookies.find((c) => c.name === "auth_session");
      let workspaceIdCookie = allCookies.find((c) => c.name === "workspace_id");
      if (!authSessionCookie || !workspaceIdCookie) {
        const allCookiesAny = await browser.cookies.getAll({});
        const basebrainCookies = allCookiesAny.filter(
          (c) => c.domain.includes("basebrain.ai") || c.domain === ".basebrain.ai" || c.domain === "basebrain.ai"
        );
        console.log("Background: Basebrain cookies found:", basebrainCookies.map((c) => ({
          name: c.name,
          domain: c.domain
        })));
        const authFromAny = basebrainCookies.find((c) => c.name === "auth_session");
        const workspaceFromAny = basebrainCookies.find((c) => c.name === "workspace_id");
        if (authFromAny && !authSessionCookie) {
          authSessionCookie = authFromAny;
        }
        if (workspaceFromAny && !workspaceIdCookie) {
          workspaceIdCookie = workspaceFromAny;
        }
      }
      const authToken = (authSessionCookie == null ? void 0 : authSessionCookie.value) || null;
      const workspaceId = (workspaceIdCookie == null ? void 0 : workspaceIdCookie.value) || null;
      const result2 = {
        isAuthenticated: !!authToken,
        authToken,
        workspaceId
      };
      console.log("Background: Auth check result:", {
        isAuthenticated: result2.isAuthenticated,
        hasToken: !!result2.authToken,
        workspaceId: result2.workspaceId
      });
      return result2;
    } catch (error) {
      console.error("Background: Error checking auth:", error);
      return {
        isAuthenticated: false,
        authToken: null,
        workspaceId: null
      };
    }
  }
  async function saveMemory(payload) {
    var _a2, _b2, _c, _d, _e, _f;
    try {
      console.log("Background: Saving memory...");
      payload.contents = void 0;
      console.log("Background: Payload:", payload);
      const authInfo = await checkAuthCookies();
      if (!authInfo.isAuthenticated || !authInfo.authToken) {
        throw new Error("Not authenticated");
      }
      const url = "https://api.basebrain.ai/v1/memories";
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authInfo.authToken}`
      };
      const body = JSON.stringify(payload);
      console.log("Background: Request URL:", url);
      console.log("Background: Request headers:", headers);
      console.log("Background: Request body (truncated):", body.substring(0, 500) + "...");
      const response = await fetch(url, {
        method: "POST",
        headers,
        body
      });
      console.log("Background: Response status:", response.status);
      console.log("Background: Response headers:", Object.fromEntries(response.headers.entries()));
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Background: Error response body:", errorText);
        let errorData = {};
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          console.error("Background: Could not parse error response as JSON");
        }
        throw new Error(`Failed to save: ${response.status} ${response.statusText} - ${((_a2 = errorData.error) == null ? void 0 : _a2.detail) || errorData.detail || errorText}`);
      }
      const data = await response.json();
      console.log("Background: Memory saved successfully", data);
      console.log("Background: Full response data:", JSON.stringify(data, null, 2));
      console.log("Background: Data keys:", Object.keys(data));
      const memoryId = ((_b2 = data.result) == null ? void 0 : _b2.id) || data.id || data._id || data.memoryId || ((_c = data.memory) == null ? void 0 : _c.id) || ((_d = data.memory) == null ? void 0 : _d._id) || ((_e = data.data) == null ? void 0 : _e.id) || ((_f = data.data) == null ? void 0 : _f._id);
      console.log("Background: Extracted memory ID:", memoryId);
      if (!memoryId) {
        console.error("Background: No memory ID found in response");
        console.error("Background: Response structure:", JSON.stringify(data, null, 2));
      }
      return { success: true, memoryId };
    } catch (error) {
      console.error("Background: Error saving memory:", error);
      return { success: false, error: error.message };
    }
  }
  async function updateMemoryNotes(memoryId, notes, workspaceId) {
    var _a2;
    try {
      console.log("Background: Updating memory notes...");
      console.log("Background: Memory ID:", memoryId);
      console.log("Background: Workspace ID:", workspaceId);
      const authInfo = await checkAuthCookies();
      if (!authInfo.isAuthenticated || !authInfo.authToken) {
        throw new Error("Not authenticated");
      }
      const workspace = workspaceId || authInfo.workspaceId;
      if (!workspace) {
        throw new Error("Workspace ID not found");
      }
      const url = `https://api.basebrain.ai/v1/memories/${workspace}/${memoryId}`;
      console.log("Background: PATCH URL:", url);
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authInfo.authToken}`
        },
        body: JSON.stringify({ notes })
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to update notes: ${response.status} ${response.statusText} - ${((_a2 = errorData.error) == null ? void 0 : _a2.detail) || ""}`);
      }
      const data = await response.json();
      console.log("Background: Memory notes updated successfully", data);
      return { success: true };
    } catch (error) {
      console.error("Background: Error updating memory notes:", error);
      return { success: false, error: error.message };
    }
  }
  background;
  function initPlugins() {
  }
  var _MatchPattern = class {
    constructor(matchPattern) {
      if (matchPattern === "<all_urls>") {
        this.isAllUrls = true;
        this.protocolMatches = [..._MatchPattern.PROTOCOLS];
        this.hostnameMatch = "*";
        this.pathnameMatch = "*";
      } else {
        const groups = /(.*):\/\/(.*?)(\/.*)/.exec(matchPattern);
        if (groups == null)
          throw new InvalidMatchPattern(matchPattern, "Incorrect format");
        const [_, protocol, hostname, pathname] = groups;
        validateProtocol(matchPattern, protocol);
        validateHostname(matchPattern, hostname);
        this.protocolMatches = protocol === "*" ? ["http", "https"] : [protocol];
        this.hostnameMatch = hostname;
        this.pathnameMatch = pathname;
      }
    }
    includes(url) {
      if (this.isAllUrls)
        return true;
      const u = typeof url === "string" ? new URL(url) : url instanceof Location ? new URL(url.href) : url;
      return !!this.protocolMatches.find((protocol) => {
        if (protocol === "http")
          return this.isHttpMatch(u);
        if (protocol === "https")
          return this.isHttpsMatch(u);
        if (protocol === "file")
          return this.isFileMatch(u);
        if (protocol === "ftp")
          return this.isFtpMatch(u);
        if (protocol === "urn")
          return this.isUrnMatch(u);
      });
    }
    isHttpMatch(url) {
      return url.protocol === "http:" && this.isHostPathMatch(url);
    }
    isHttpsMatch(url) {
      return url.protocol === "https:" && this.isHostPathMatch(url);
    }
    isHostPathMatch(url) {
      if (!this.hostnameMatch || !this.pathnameMatch)
        return false;
      const hostnameMatchRegexs = [
        this.convertPatternToRegex(this.hostnameMatch),
        this.convertPatternToRegex(this.hostnameMatch.replace(/^\*\./, ""))
      ];
      const pathnameMatchRegex = this.convertPatternToRegex(this.pathnameMatch);
      return !!hostnameMatchRegexs.find((regex) => regex.test(url.hostname)) && pathnameMatchRegex.test(url.pathname);
    }
    isFileMatch(url) {
      throw Error("Not implemented: file:// pattern matching. Open a PR to add support");
    }
    isFtpMatch(url) {
      throw Error("Not implemented: ftp:// pattern matching. Open a PR to add support");
    }
    isUrnMatch(url) {
      throw Error("Not implemented: urn:// pattern matching. Open a PR to add support");
    }
    convertPatternToRegex(pattern) {
      const escaped = this.escapeForRegex(pattern);
      const starsReplaced = escaped.replace(/\\\*/g, ".*");
      return RegExp(`^${starsReplaced}$`);
    }
    escapeForRegex(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
  };
  var MatchPattern = _MatchPattern;
  MatchPattern.PROTOCOLS = ["http", "https", "file", "ftp", "urn"];
  var InvalidMatchPattern = class extends Error {
    constructor(matchPattern, reason) {
      super(`Invalid match pattern "${matchPattern}": ${reason}`);
    }
  };
  function validateProtocol(matchPattern, protocol) {
    if (!MatchPattern.PROTOCOLS.includes(protocol) && protocol !== "*")
      throw new InvalidMatchPattern(
        matchPattern,
        `${protocol} not a valid protocol (${MatchPattern.PROTOCOLS.join(", ")})`
      );
  }
  function validateHostname(matchPattern, hostname) {
    if (hostname.includes(":"))
      throw new InvalidMatchPattern(matchPattern, `Hostname cannot include a port`);
    if (hostname.includes("*") && hostname.length > 1 && !hostname.startsWith("*."))
      throw new InvalidMatchPattern(
        matchPattern,
        `If using a wildcard (*), it must go at the start of the hostname`
      );
  }
  function print(method, ...args) {
    if (typeof args[0] === "string") {
      const message = args.shift();
      method(`[wxt] ${message}`, ...args);
    } else {
      method("[wxt]", ...args);
    }
  }
  const logger = {
    debug: (...args) => print(console.debug, ...args),
    log: (...args) => print(console.log, ...args),
    warn: (...args) => print(console.warn, ...args),
    error: (...args) => print(console.error, ...args)
  };
  let ws;
  function getDevServerWebSocket() {
    if (ws == null) {
      const serverUrl = "http://localhost:3000";
      logger.debug("Connecting to dev server @", serverUrl);
      ws = new WebSocket(serverUrl, "vite-hmr");
      ws.addWxtEventListener = ws.addEventListener.bind(ws);
      ws.sendCustom = (event, payload) => ws == null ? void 0 : ws.send(JSON.stringify({ type: "custom", event, payload }));
      ws.addEventListener("open", () => {
        logger.debug("Connected to dev server");
      });
      ws.addEventListener("close", () => {
        logger.debug("Disconnected from dev server");
      });
      ws.addEventListener("error", (event) => {
        logger.error("Failed to connect to dev server", event);
      });
      ws.addEventListener("message", (e) => {
        try {
          const message = JSON.parse(e.data);
          if (message.type === "custom") {
            ws == null ? void 0 : ws.dispatchEvent(
              new CustomEvent(message.event, { detail: message.data })
            );
          }
        } catch (err) {
          logger.error("Failed to handle message", err);
        }
      });
    }
    return ws;
  }
  function keepServiceWorkerAlive() {
    setInterval(async () => {
      await browser.runtime.getPlatformInfo();
    }, 5e3);
  }
  function reloadContentScript(payload) {
    const manifest = browser.runtime.getManifest();
    if (manifest.manifest_version == 2) {
      void reloadContentScriptMv2();
    } else {
      void reloadContentScriptMv3(payload);
    }
  }
  async function reloadContentScriptMv3({
    registration,
    contentScript
  }) {
    if (registration === "runtime") {
      await reloadRuntimeContentScriptMv3(contentScript);
    } else {
      await reloadManifestContentScriptMv3(contentScript);
    }
  }
  async function reloadManifestContentScriptMv3(contentScript) {
    const id = `wxt:${contentScript.js[0]}`;
    logger.log("Reloading content script:", contentScript);
    const registered = await browser.scripting.getRegisteredContentScripts();
    logger.debug("Existing scripts:", registered);
    const existing = registered.find((cs) => cs.id === id);
    if (existing) {
      logger.debug("Updating content script", existing);
      await browser.scripting.updateContentScripts([{ ...contentScript, id }]);
    } else {
      logger.debug("Registering new content script...");
      await browser.scripting.registerContentScripts([{ ...contentScript, id }]);
    }
    await reloadTabsForContentScript(contentScript);
  }
  async function reloadRuntimeContentScriptMv3(contentScript) {
    logger.log("Reloading content script:", contentScript);
    const registered = await browser.scripting.getRegisteredContentScripts();
    logger.debug("Existing scripts:", registered);
    const matches = registered.filter((cs) => {
      var _a2, _b2;
      const hasJs = (_a2 = contentScript.js) == null ? void 0 : _a2.find((js) => {
        var _a3;
        return (_a3 = cs.js) == null ? void 0 : _a3.includes(js);
      });
      const hasCss = (_b2 = contentScript.css) == null ? void 0 : _b2.find((css) => {
        var _a3;
        return (_a3 = cs.css) == null ? void 0 : _a3.includes(css);
      });
      return hasJs || hasCss;
    });
    if (matches.length === 0) {
      logger.log(
        "Content script is not registered yet, nothing to reload",
        contentScript
      );
      return;
    }
    await browser.scripting.updateContentScripts(matches);
    await reloadTabsForContentScript(contentScript);
  }
  async function reloadTabsForContentScript(contentScript) {
    const allTabs = await browser.tabs.query({});
    const matchPatterns = contentScript.matches.map(
      (match) => new MatchPattern(match)
    );
    const matchingTabs = allTabs.filter((tab) => {
      const url = tab.url;
      if (!url) return false;
      return !!matchPatterns.find((pattern) => pattern.includes(url));
    });
    await Promise.all(
      matchingTabs.map(async (tab) => {
        try {
          await browser.tabs.reload(tab.id);
        } catch (err) {
          logger.warn("Failed to reload tab:", err);
        }
      })
    );
  }
  async function reloadContentScriptMv2(_payload) {
    throw Error("TODO: reloadContentScriptMv2");
  }
  {
    try {
      const ws2 = getDevServerWebSocket();
      ws2.addWxtEventListener("wxt:reload-extension", () => {
        browser.runtime.reload();
      });
      ws2.addWxtEventListener("wxt:reload-content-script", (event) => {
        reloadContentScript(event.detail);
      });
      if (true) {
        ws2.addEventListener(
          "open",
          () => ws2.sendCustom("wxt:background-initialized")
        );
        keepServiceWorkerAlive();
      }
    } catch (err) {
      logger.error("Failed to setup web socket connection with dev server", err);
    }
    browser.commands.onCommand.addListener((command) => {
      if (command === "wxt:reload-extension") {
        browser.runtime.reload();
      }
    });
  }
  let result;
  try {
    initPlugins();
    result = definition.main();
    if (result instanceof Promise) {
      console.warn(
        "The background's main() function return a promise, but it must be synchronous"
      );
    }
  } catch (err) {
    logger.error("The background crashed on startup!");
    throw err;
  }
  const result$1 = result;
  return result$1;
}();
background;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vbm9kZV9tb2R1bGVzL3d4dC9kaXN0L3V0aWxzL2RlZmluZS1iYWNrZ3JvdW5kLm1qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ad3h0LWRldi9icm93c2VyL3NyYy9pbmRleC5tanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvd3h0L2Rpc3QvYnJvd3Nlci5tanMiLCIuLi8uLi9zcmMvZW50cnlwb2ludHMvYmFja2dyb3VuZC9pbmRleC50cyIsIi4uLy4uL25vZGVfbW9kdWxlcy9Ad2ViZXh0LWNvcmUvbWF0Y2gtcGF0dGVybnMvbGliL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBkZWZpbmVCYWNrZ3JvdW5kKGFyZykge1xuICBpZiAoYXJnID09IG51bGwgfHwgdHlwZW9mIGFyZyA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4geyBtYWluOiBhcmcgfTtcbiAgcmV0dXJuIGFyZztcbn1cbiIsIi8vICNyZWdpb24gc25pcHBldFxuZXhwb3J0IGNvbnN0IGJyb3dzZXIgPSBnbG9iYWxUaGlzLmJyb3dzZXI/LnJ1bnRpbWU/LmlkXG4gID8gZ2xvYmFsVGhpcy5icm93c2VyXG4gIDogZ2xvYmFsVGhpcy5jaHJvbWU7XG4vLyAjZW5kcmVnaW9uIHNuaXBwZXRcbiIsImltcG9ydCB7IGJyb3dzZXIgYXMgX2Jyb3dzZXIgfSBmcm9tIFwiQHd4dC1kZXYvYnJvd3NlclwiO1xuZXhwb3J0IGNvbnN0IGJyb3dzZXIgPSBfYnJvd3NlcjtcbmV4cG9ydCB7fTtcbiIsImV4cG9ydCBkZWZhdWx0IGRlZmluZUJhY2tncm91bmQoKCkgPT4ge1xuICBjb25zb2xlLmxvZygnQmFzZWJyYWluIGJhY2tncm91bmQgc2NyaXB0IGluaXRpYWxpemVkJywgeyBpZDogYnJvd3Nlci5ydW50aW1lLmlkIH0pXG4gIFxuICAvLyBIYW5kbGUgZXh0ZW5zaW9uIGljb24gY2xpY2tcbiAgYnJvd3Nlci5hY3Rpb24ub25DbGlja2VkLmFkZExpc3RlbmVyKGFzeW5jICh0YWIpID0+IHtcbiAgICBpZiAodGFiLmlkKSB7XG4gICAgICAvLyBTZW5kIG1lc3NhZ2UgdG8gY29udGVudCBzY3JpcHQgdG8gdG9nZ2xlIHNpZGViYXJcbiAgICAgIGF3YWl0IGJyb3dzZXIudGFicy5zZW5kTWVzc2FnZSh0YWIuaWQsIHsgYWN0aW9uOiAndG9nZ2xlU2lkZWJhcicgfSlcbiAgICB9XG4gIH0pXG4gIFxuICAvLyBMaXN0ZW4gZm9yIG1lc3NhZ2VzIGZyb20gY29udGVudCBzY3JpcHRzXG4gIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlcXVlc3QuYWN0aW9uID09PSAnY2hlY2tBdXRoJykge1xuICAgICAgLy8gQ2hlY2sgY29va2llcyBpbiB0aGUgYmFja2dyb3VuZCBzY3JpcHQgd2hlcmUgd2UgaGF2ZSBwZXJtaXNzaW9uc1xuICAgICAgY2hlY2tBdXRoQ29va2llcygpLnRoZW4oc2VuZFJlc3BvbnNlKVxuICAgICAgcmV0dXJuIHRydWUgLy8gSW5kaWNhdGVzIHdlIHdpbGwgc2VuZCBhIHJlc3BvbnNlIGFzeW5jaHJvbm91c2x5XG4gICAgfVxuICAgIFxuICAgIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gJ3NhdmVNZW1vcnknKSB7XG4gICAgICAvLyBNYWtlIEFQSSBjYWxsIGZyb20gYmFja2dyb3VuZCBzY3JpcHQgdG8gYXZvaWQgQ09SUyBpc3N1ZXNcbiAgICAgIHNhdmVNZW1vcnkocmVxdWVzdC5wYXlsb2FkKS50aGVuKHNlbmRSZXNwb25zZSlcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIFxuICAgIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gJ3VwZGF0ZU1lbW9yeU5vdGVzJykge1xuICAgICAgLy8gVXBkYXRlIG1lbW9yeSB3aXRoIG5vdGVzXG4gICAgICB1cGRhdGVNZW1vcnlOb3RlcyhyZXF1ZXN0Lm1lbW9yeUlkLCByZXF1ZXN0Lm5vdGVzLCByZXF1ZXN0LndvcmtzcGFjZUlkKS50aGVuKHNlbmRSZXNwb25zZSlcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9KVxuICBcbiAgLy8gSGFuZGxlIGV4dGVuc2lvbiBpbnN0YWxsYXRpb25cbiAgYnJvd3Nlci5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnQmFzZWJyYWluIGV4dGVuc2lvbiBpbnN0YWxsZWQnKVxuICB9KVxufSlcblxuYXN5bmMgZnVuY3Rpb24gY2hlY2tBdXRoQ29va2llcygpIHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLmxvZygnQmFja2dyb3VuZDogQ2hlY2tpbmcgYXV0aGVudGljYXRpb24uLi4nKVxuICAgIFxuICAgIC8vIEdldCBhbGwgY29va2llcyBmb3IgYmFzZWJyYWluLmFpXG4gICAgY29uc3QgYWxsQ29va2llcyA9IGF3YWl0IGJyb3dzZXIuY29va2llcy5nZXRBbGwoe1xuICAgICAgdXJsOiAnaHR0cHM6Ly9iYXNlYnJhaW4uYWknXG4gICAgfSlcbiAgICBcbiAgICBjb25zb2xlLmxvZygnQmFja2dyb3VuZDogQWxsIGNvb2tpZXMgZm91bmQgZm9yIGJhc2VicmFpbi5haTonLCBhbGxDb29raWVzLm1hcChjID0+ICh7XG4gICAgICBuYW1lOiBjLm5hbWUsXG4gICAgICBkb21haW46IGMuZG9tYWluLFxuICAgICAgcGF0aDogYy5wYXRoLFxuICAgICAgdmFsdWU6IGMudmFsdWUuc3Vic3RyaW5nKDAsIDIwKSArICcuLi4nXG4gICAgfSkpKVxuICAgIFxuICAgIC8vIEZpbmQgc3BlY2lmaWMgY29va2llc1xuICAgIGxldCBhdXRoU2Vzc2lvbkNvb2tpZSA9IGFsbENvb2tpZXMuZmluZChjID0+IGMubmFtZSA9PT0gJ2F1dGhfc2Vzc2lvbicpXG4gICAgbGV0IHdvcmtzcGFjZUlkQ29va2llID0gYWxsQ29va2llcy5maW5kKGMgPT4gYy5uYW1lID09PSAnd29ya3NwYWNlX2lkJylcbiAgICBcbiAgICAvLyBJZiBub3QgZm91bmQsIHRyeSB3aXRob3V0IFVSTCBjb25zdHJhaW50ICBcbiAgICBpZiAoIWF1dGhTZXNzaW9uQ29va2llIHx8ICF3b3Jrc3BhY2VJZENvb2tpZSkge1xuICAgICAgY29uc3QgYWxsQ29va2llc0FueSA9IGF3YWl0IGJyb3dzZXIuY29va2llcy5nZXRBbGwoe30pXG4gICAgICBjb25zdCBiYXNlYnJhaW5Db29raWVzID0gYWxsQ29va2llc0FueS5maWx0ZXIoYyA9PiBcbiAgICAgICAgYy5kb21haW4uaW5jbHVkZXMoJ2Jhc2VicmFpbi5haScpIHx8IFxuICAgICAgICBjLmRvbWFpbiA9PT0gJy5iYXNlYnJhaW4uYWknIHx8XG4gICAgICAgIGMuZG9tYWluID09PSAnYmFzZWJyYWluLmFpJ1xuICAgICAgKVxuICAgICAgXG4gICAgICBjb25zb2xlLmxvZygnQmFja2dyb3VuZDogQmFzZWJyYWluIGNvb2tpZXMgZm91bmQ6JywgYmFzZWJyYWluQ29va2llcy5tYXAoYyA9PiAoe1xuICAgICAgICBuYW1lOiBjLm5hbWUsXG4gICAgICAgIGRvbWFpbjogYy5kb21haW5cbiAgICAgIH0pKSlcbiAgICAgIFxuICAgICAgY29uc3QgYXV0aEZyb21BbnkgPSBiYXNlYnJhaW5Db29raWVzLmZpbmQoYyA9PiBjLm5hbWUgPT09ICdhdXRoX3Nlc3Npb24nKVxuICAgICAgY29uc3Qgd29ya3NwYWNlRnJvbUFueSA9IGJhc2VicmFpbkNvb2tpZXMuZmluZChjID0+IGMubmFtZSA9PT0gJ3dvcmtzcGFjZV9pZCcpXG4gICAgICBcbiAgICAgIGlmIChhdXRoRnJvbUFueSAmJiAhYXV0aFNlc3Npb25Db29raWUpIHtcbiAgICAgICAgYXV0aFNlc3Npb25Db29raWUgPSBhdXRoRnJvbUFueVxuICAgICAgfVxuICAgICAgaWYgKHdvcmtzcGFjZUZyb21BbnkgJiYgIXdvcmtzcGFjZUlkQ29va2llKSB7XG4gICAgICAgIHdvcmtzcGFjZUlkQ29va2llID0gd29ya3NwYWNlRnJvbUFueVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBhdXRoVG9rZW4gPSBhdXRoU2Vzc2lvbkNvb2tpZT8udmFsdWUgfHwgbnVsbFxuICAgIGNvbnN0IHdvcmtzcGFjZUlkID0gd29ya3NwYWNlSWRDb29raWU/LnZhbHVlIHx8IG51bGxcbiAgICBcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBpc0F1dGhlbnRpY2F0ZWQ6ICEhYXV0aFRva2VuLFxuICAgICAgYXV0aFRva2VuLFxuICAgICAgd29ya3NwYWNlSWRcbiAgICB9XG4gICAgXG4gICAgY29uc29sZS5sb2coJ0JhY2tncm91bmQ6IEF1dGggY2hlY2sgcmVzdWx0OicsIHtcbiAgICAgIGlzQXV0aGVudGljYXRlZDogcmVzdWx0LmlzQXV0aGVudGljYXRlZCxcbiAgICAgIGhhc1Rva2VuOiAhIXJlc3VsdC5hdXRoVG9rZW4sXG4gICAgICB3b3Jrc3BhY2VJZDogcmVzdWx0LndvcmtzcGFjZUlkXG4gICAgfSlcbiAgICBcbiAgICByZXR1cm4gcmVzdWx0XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignQmFja2dyb3VuZDogRXJyb3IgY2hlY2tpbmcgYXV0aDonLCBlcnJvcilcbiAgICByZXR1cm4ge1xuICAgICAgaXNBdXRoZW50aWNhdGVkOiBmYWxzZSxcbiAgICAgIGF1dGhUb2tlbjogbnVsbCxcbiAgICAgIHdvcmtzcGFjZUlkOiBudWxsXG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNhdmVNZW1vcnkocGF5bG9hZDogYW55KSB7XG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2coJ0JhY2tncm91bmQ6IFNhdmluZyBtZW1vcnkuLi4nKVxuICAgIHBheWxvYWQuY29udGVudHMgPSB1bmRlZmluZWQ7XG4gICAgY29uc29sZS5sb2coJ0JhY2tncm91bmQ6IFBheWxvYWQ6JywgcGF5bG9hZClcbiAgICBcbiAgICAvLyBHZXQgYXV0aCBpbmZvIGluY2x1ZGluZyB0b2tlblxuICAgIGNvbnN0IGF1dGhJbmZvID0gYXdhaXQgY2hlY2tBdXRoQ29va2llcygpXG4gICAgXG4gICAgaWYgKCFhdXRoSW5mby5pc0F1dGhlbnRpY2F0ZWQgfHwgIWF1dGhJbmZvLmF1dGhUb2tlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgYXV0aGVudGljYXRlZCcpXG4gICAgfVxuICAgIFxuICAgIC8vIFByZXBhcmUgdGhlIHJlcXVlc3RcbiAgICBjb25zdCB1cmwgPSAnaHR0cHM6Ly9hcGkuYmFzZWJyYWluLmFpL3YxL21lbW9yaWVzJ1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7YXV0aEluZm8uYXV0aFRva2VufWBcbiAgICB9XG4gICAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpXG4gICAgXG4gICAgY29uc29sZS5sb2coJ0JhY2tncm91bmQ6IFJlcXVlc3QgVVJMOicsIHVybClcbiAgICBjb25zb2xlLmxvZygnQmFja2dyb3VuZDogUmVxdWVzdCBoZWFkZXJzOicsIGhlYWRlcnMpXG4gICAgY29uc29sZS5sb2coJ0JhY2tncm91bmQ6IFJlcXVlc3QgYm9keSAodHJ1bmNhdGVkKTonLCBib2R5LnN1YnN0cmluZygwLCA1MDApICsgJy4uLicpXG4gICAgXG4gICAgLy8gTWFrZSB0aGUgQVBJIHJlcXVlc3Qgd2l0aCBCZWFyZXIgdG9rZW5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzLFxuICAgICAgYm9keVxuICAgIH0pXG4gICAgXG4gICAgY29uc29sZS5sb2coJ0JhY2tncm91bmQ6IFJlc3BvbnNlIHN0YXR1czonLCByZXNwb25zZS5zdGF0dXMpXG4gICAgY29uc29sZS5sb2coJ0JhY2tncm91bmQ6IFJlc3BvbnNlIGhlYWRlcnM6JywgT2JqZWN0LmZyb21FbnRyaWVzKHJlc3BvbnNlLmhlYWRlcnMuZW50cmllcygpKSlcbiAgICBcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCBlcnJvclRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KClcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0JhY2tncm91bmQ6IEVycm9yIHJlc3BvbnNlIGJvZHk6JywgZXJyb3JUZXh0KVxuICAgICAgXG4gICAgICBsZXQgZXJyb3JEYXRhID0ge31cbiAgICAgIHRyeSB7XG4gICAgICAgIGVycm9yRGF0YSA9IEpTT04ucGFyc2UoZXJyb3JUZXh0KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdCYWNrZ3JvdW5kOiBDb3VsZCBub3QgcGFyc2UgZXJyb3IgcmVzcG9uc2UgYXMgSlNPTicpXG4gICAgICB9XG4gICAgICBcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHNhdmU6ICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9IC0gJHtlcnJvckRhdGEuZXJyb3I/LmRldGFpbCB8fCBlcnJvckRhdGEuZGV0YWlsIHx8IGVycm9yVGV4dH1gKVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgY29uc29sZS5sb2coJ0JhY2tncm91bmQ6IE1lbW9yeSBzYXZlZCBzdWNjZXNzZnVsbHknLCBkYXRhKVxuICAgIGNvbnNvbGUubG9nKCdCYWNrZ3JvdW5kOiBGdWxsIHJlc3BvbnNlIGRhdGE6JywgSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikpXG4gICAgY29uc29sZS5sb2coJ0JhY2tncm91bmQ6IERhdGEga2V5czonLCBPYmplY3Qua2V5cyhkYXRhKSlcbiAgICBcbiAgICAvLyBUcnkgdG8gZXh0cmFjdCBtZW1vcnkgSUQgZnJvbSBkaWZmZXJlbnQgcG9zc2libGUgbG9jYXRpb25zXG4gICAgY29uc3QgbWVtb3J5SWQgPSBkYXRhLnJlc3VsdD8uaWQgfHwgZGF0YS5pZCB8fCBkYXRhLl9pZCB8fCBkYXRhLm1lbW9yeUlkIHx8IGRhdGEubWVtb3J5Py5pZCB8fCBkYXRhLm1lbW9yeT8uX2lkIHx8IGRhdGEuZGF0YT8uaWQgfHwgZGF0YS5kYXRhPy5faWRcbiAgICBjb25zb2xlLmxvZygnQmFja2dyb3VuZDogRXh0cmFjdGVkIG1lbW9yeSBJRDonLCBtZW1vcnlJZClcbiAgICBcbiAgICBpZiAoIW1lbW9yeUlkKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdCYWNrZ3JvdW5kOiBObyBtZW1vcnkgSUQgZm91bmQgaW4gcmVzcG9uc2UnKVxuICAgICAgY29uc29sZS5lcnJvcignQmFja2dyb3VuZDogUmVzcG9uc2Ugc3RydWN0dXJlOicsIEpTT04uc3RyaW5naWZ5KGRhdGEsIG51bGwsIDIpKVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4geyBzdWNjZXNzOiB0cnVlLCBtZW1vcnlJZCB9XG4gICAgXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignQmFja2dyb3VuZDogRXJyb3Igc2F2aW5nIG1lbW9yeTonLCBlcnJvcilcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZU1lbW9yeU5vdGVzKG1lbW9yeUlkOiBzdHJpbmcsIG5vdGVzOiBzdHJpbmcsIHdvcmtzcGFjZUlkPzogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2coJ0JhY2tncm91bmQ6IFVwZGF0aW5nIG1lbW9yeSBub3Rlcy4uLicpXG4gICAgY29uc29sZS5sb2coJ0JhY2tncm91bmQ6IE1lbW9yeSBJRDonLCBtZW1vcnlJZClcbiAgICBjb25zb2xlLmxvZygnQmFja2dyb3VuZDogV29ya3NwYWNlIElEOicsIHdvcmtzcGFjZUlkKVxuICAgIFxuICAgIC8vIEdldCBhdXRoIGluZm8gaW5jbHVkaW5nIHRva2VuXG4gICAgY29uc3QgYXV0aEluZm8gPSBhd2FpdCBjaGVja0F1dGhDb29raWVzKClcbiAgICBcbiAgICBpZiAoIWF1dGhJbmZvLmlzQXV0aGVudGljYXRlZCB8fCAhYXV0aEluZm8uYXV0aFRva2VuKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhdXRoZW50aWNhdGVkJylcbiAgICB9XG4gICAgXG4gICAgLy8gVXNlIHdvcmtzcGFjZSBJRCBmcm9tIHBhcmFtZXRlciBvciBmcm9tIGF1dGggaW5mb1xuICAgIGNvbnN0IHdvcmtzcGFjZSA9IHdvcmtzcGFjZUlkIHx8IGF1dGhJbmZvLndvcmtzcGFjZUlkXG4gICAgXG4gICAgaWYgKCF3b3Jrc3BhY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV29ya3NwYWNlIElEIG5vdCBmb3VuZCcpXG4gICAgfVxuICAgIFxuICAgIC8vIE1ha2UgdGhlIFBBVENIIHJlcXVlc3Qgd2l0aCBCZWFyZXIgdG9rZW5cbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkuYmFzZWJyYWluLmFpL3YxL21lbW9yaWVzLyR7d29ya3NwYWNlfS8ke21lbW9yeUlkfWBcbiAgICBjb25zb2xlLmxvZygnQmFja2dyb3VuZDogUEFUQ0ggVVJMOicsIHVybClcbiAgICBcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHthdXRoSW5mby5hdXRoVG9rZW59YFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbm90ZXMgfSlcbiAgICB9KVxuICAgIFxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gdXBkYXRlIG5vdGVzOiAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS5zdGF0dXNUZXh0fSAtICR7ZXJyb3JEYXRhLmVycm9yPy5kZXRhaWwgfHwgJyd9YClcbiAgICB9XG4gICAgXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgIGNvbnNvbGUubG9nKCdCYWNrZ3JvdW5kOiBNZW1vcnkgbm90ZXMgdXBkYXRlZCBzdWNjZXNzZnVsbHknLCBkYXRhKVxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfVxuICAgIFxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0JhY2tncm91bmQ6IEVycm9yIHVwZGF0aW5nIG1lbW9yeSBub3RlczonLCBlcnJvcilcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfVxuICB9XG59IiwiLy8gc3JjL2luZGV4LnRzXG52YXIgX01hdGNoUGF0dGVybiA9IGNsYXNzIHtcbiAgY29uc3RydWN0b3IobWF0Y2hQYXR0ZXJuKSB7XG4gICAgaWYgKG1hdGNoUGF0dGVybiA9PT0gXCI8YWxsX3VybHM+XCIpIHtcbiAgICAgIHRoaXMuaXNBbGxVcmxzID0gdHJ1ZTtcbiAgICAgIHRoaXMucHJvdG9jb2xNYXRjaGVzID0gWy4uLl9NYXRjaFBhdHRlcm4uUFJPVE9DT0xTXTtcbiAgICAgIHRoaXMuaG9zdG5hbWVNYXRjaCA9IFwiKlwiO1xuICAgICAgdGhpcy5wYXRobmFtZU1hdGNoID0gXCIqXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdyb3VwcyA9IC8oLiopOlxcL1xcLyguKj8pKFxcLy4qKS8uZXhlYyhtYXRjaFBhdHRlcm4pO1xuICAgICAgaWYgKGdyb3VwcyA9PSBudWxsKVxuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZE1hdGNoUGF0dGVybihtYXRjaFBhdHRlcm4sIFwiSW5jb3JyZWN0IGZvcm1hdFwiKTtcbiAgICAgIGNvbnN0IFtfLCBwcm90b2NvbCwgaG9zdG5hbWUsIHBhdGhuYW1lXSA9IGdyb3VwcztcbiAgICAgIHZhbGlkYXRlUHJvdG9jb2wobWF0Y2hQYXR0ZXJuLCBwcm90b2NvbCk7XG4gICAgICB2YWxpZGF0ZUhvc3RuYW1lKG1hdGNoUGF0dGVybiwgaG9zdG5hbWUpO1xuICAgICAgdmFsaWRhdGVQYXRobmFtZShtYXRjaFBhdHRlcm4sIHBhdGhuYW1lKTtcbiAgICAgIHRoaXMucHJvdG9jb2xNYXRjaGVzID0gcHJvdG9jb2wgPT09IFwiKlwiID8gW1wiaHR0cFwiLCBcImh0dHBzXCJdIDogW3Byb3RvY29sXTtcbiAgICAgIHRoaXMuaG9zdG5hbWVNYXRjaCA9IGhvc3RuYW1lO1xuICAgICAgdGhpcy5wYXRobmFtZU1hdGNoID0gcGF0aG5hbWU7XG4gICAgfVxuICB9XG4gIGluY2x1ZGVzKHVybCkge1xuICAgIGlmICh0aGlzLmlzQWxsVXJscylcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGNvbnN0IHUgPSB0eXBlb2YgdXJsID09PSBcInN0cmluZ1wiID8gbmV3IFVSTCh1cmwpIDogdXJsIGluc3RhbmNlb2YgTG9jYXRpb24gPyBuZXcgVVJMKHVybC5ocmVmKSA6IHVybDtcbiAgICByZXR1cm4gISF0aGlzLnByb3RvY29sTWF0Y2hlcy5maW5kKChwcm90b2NvbCkgPT4ge1xuICAgICAgaWYgKHByb3RvY29sID09PSBcImh0dHBcIilcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNIdHRwTWF0Y2godSk7XG4gICAgICBpZiAocHJvdG9jb2wgPT09IFwiaHR0cHNcIilcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNIdHRwc01hdGNoKHUpO1xuICAgICAgaWYgKHByb3RvY29sID09PSBcImZpbGVcIilcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNGaWxlTWF0Y2godSk7XG4gICAgICBpZiAocHJvdG9jb2wgPT09IFwiZnRwXCIpXG4gICAgICAgIHJldHVybiB0aGlzLmlzRnRwTWF0Y2godSk7XG4gICAgICBpZiAocHJvdG9jb2wgPT09IFwidXJuXCIpXG4gICAgICAgIHJldHVybiB0aGlzLmlzVXJuTWF0Y2godSk7XG4gICAgfSk7XG4gIH1cbiAgaXNIdHRwTWF0Y2godXJsKSB7XG4gICAgcmV0dXJuIHVybC5wcm90b2NvbCA9PT0gXCJodHRwOlwiICYmIHRoaXMuaXNIb3N0UGF0aE1hdGNoKHVybCk7XG4gIH1cbiAgaXNIdHRwc01hdGNoKHVybCkge1xuICAgIHJldHVybiB1cmwucHJvdG9jb2wgPT09IFwiaHR0cHM6XCIgJiYgdGhpcy5pc0hvc3RQYXRoTWF0Y2godXJsKTtcbiAgfVxuICBpc0hvc3RQYXRoTWF0Y2godXJsKSB7XG4gICAgaWYgKCF0aGlzLmhvc3RuYW1lTWF0Y2ggfHwgIXRoaXMucGF0aG5hbWVNYXRjaClcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBob3N0bmFtZU1hdGNoUmVnZXhzID0gW1xuICAgICAgdGhpcy5jb252ZXJ0UGF0dGVyblRvUmVnZXgodGhpcy5ob3N0bmFtZU1hdGNoKSxcbiAgICAgIHRoaXMuY29udmVydFBhdHRlcm5Ub1JlZ2V4KHRoaXMuaG9zdG5hbWVNYXRjaC5yZXBsYWNlKC9eXFwqXFwuLywgXCJcIikpXG4gICAgXTtcbiAgICBjb25zdCBwYXRobmFtZU1hdGNoUmVnZXggPSB0aGlzLmNvbnZlcnRQYXR0ZXJuVG9SZWdleCh0aGlzLnBhdGhuYW1lTWF0Y2gpO1xuICAgIHJldHVybiAhIWhvc3RuYW1lTWF0Y2hSZWdleHMuZmluZCgocmVnZXgpID0+IHJlZ2V4LnRlc3QodXJsLmhvc3RuYW1lKSkgJiYgcGF0aG5hbWVNYXRjaFJlZ2V4LnRlc3QodXJsLnBhdGhuYW1lKTtcbiAgfVxuICBpc0ZpbGVNYXRjaCh1cmwpIHtcbiAgICB0aHJvdyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZDogZmlsZTovLyBwYXR0ZXJuIG1hdGNoaW5nLiBPcGVuIGEgUFIgdG8gYWRkIHN1cHBvcnRcIik7XG4gIH1cbiAgaXNGdHBNYXRjaCh1cmwpIHtcbiAgICB0aHJvdyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZDogZnRwOi8vIHBhdHRlcm4gbWF0Y2hpbmcuIE9wZW4gYSBQUiB0byBhZGQgc3VwcG9ydFwiKTtcbiAgfVxuICBpc1Vybk1hdGNoKHVybCkge1xuICAgIHRocm93IEVycm9yKFwiTm90IGltcGxlbWVudGVkOiB1cm46Ly8gcGF0dGVybiBtYXRjaGluZy4gT3BlbiBhIFBSIHRvIGFkZCBzdXBwb3J0XCIpO1xuICB9XG4gIGNvbnZlcnRQYXR0ZXJuVG9SZWdleChwYXR0ZXJuKSB7XG4gICAgY29uc3QgZXNjYXBlZCA9IHRoaXMuZXNjYXBlRm9yUmVnZXgocGF0dGVybik7XG4gICAgY29uc3Qgc3RhcnNSZXBsYWNlZCA9IGVzY2FwZWQucmVwbGFjZSgvXFxcXFxcKi9nLCBcIi4qXCIpO1xuICAgIHJldHVybiBSZWdFeHAoYF4ke3N0YXJzUmVwbGFjZWR9JGApO1xuICB9XG4gIGVzY2FwZUZvclJlZ2V4KHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2csIFwiXFxcXCQmXCIpO1xuICB9XG59O1xudmFyIE1hdGNoUGF0dGVybiA9IF9NYXRjaFBhdHRlcm47XG5NYXRjaFBhdHRlcm4uUFJPVE9DT0xTID0gW1wiaHR0cFwiLCBcImh0dHBzXCIsIFwiZmlsZVwiLCBcImZ0cFwiLCBcInVyblwiXTtcbnZhciBJbnZhbGlkTWF0Y2hQYXR0ZXJuID0gY2xhc3MgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1hdGNoUGF0dGVybiwgcmVhc29uKSB7XG4gICAgc3VwZXIoYEludmFsaWQgbWF0Y2ggcGF0dGVybiBcIiR7bWF0Y2hQYXR0ZXJufVwiOiAke3JlYXNvbn1gKTtcbiAgfVxufTtcbmZ1bmN0aW9uIHZhbGlkYXRlUHJvdG9jb2wobWF0Y2hQYXR0ZXJuLCBwcm90b2NvbCkge1xuICBpZiAoIU1hdGNoUGF0dGVybi5QUk9UT0NPTFMuaW5jbHVkZXMocHJvdG9jb2wpICYmIHByb3RvY29sICE9PSBcIipcIilcbiAgICB0aHJvdyBuZXcgSW52YWxpZE1hdGNoUGF0dGVybihcbiAgICAgIG1hdGNoUGF0dGVybixcbiAgICAgIGAke3Byb3RvY29sfSBub3QgYSB2YWxpZCBwcm90b2NvbCAoJHtNYXRjaFBhdHRlcm4uUFJPVE9DT0xTLmpvaW4oXCIsIFwiKX0pYFxuICAgICk7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZUhvc3RuYW1lKG1hdGNoUGF0dGVybiwgaG9zdG5hbWUpIHtcbiAgaWYgKGhvc3RuYW1lLmluY2x1ZGVzKFwiOlwiKSlcbiAgICB0aHJvdyBuZXcgSW52YWxpZE1hdGNoUGF0dGVybihtYXRjaFBhdHRlcm4sIGBIb3N0bmFtZSBjYW5ub3QgaW5jbHVkZSBhIHBvcnRgKTtcbiAgaWYgKGhvc3RuYW1lLmluY2x1ZGVzKFwiKlwiKSAmJiBob3N0bmFtZS5sZW5ndGggPiAxICYmICFob3N0bmFtZS5zdGFydHNXaXRoKFwiKi5cIikpXG4gICAgdGhyb3cgbmV3IEludmFsaWRNYXRjaFBhdHRlcm4oXG4gICAgICBtYXRjaFBhdHRlcm4sXG4gICAgICBgSWYgdXNpbmcgYSB3aWxkY2FyZCAoKiksIGl0IG11c3QgZ28gYXQgdGhlIHN0YXJ0IG9mIHRoZSBob3N0bmFtZWBcbiAgICApO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVQYXRobmFtZShtYXRjaFBhdHRlcm4sIHBhdGhuYW1lKSB7XG4gIHJldHVybjtcbn1cbmV4cG9ydCB7XG4gIEludmFsaWRNYXRjaFBhdHRlcm4sXG4gIE1hdGNoUGF0dGVyblxufTtcbiJdLCJuYW1lcyI6WyJicm93c2VyIiwiX2Jyb3dzZXIiLCJyZXN1bHQiLCJfYSIsIl9iIl0sIm1hcHBpbmdzIjoiOzs7QUFBTyxXQUFTLGlCQUFpQixLQUFLO0FBQ3BDLFFBQUksT0FBTyxRQUFRLE9BQU8sUUFBUSxXQUFZLFFBQU8sRUFBRSxNQUFNLElBQUs7QUFDbEUsV0FBTztBQUFBLEVBQ1Q7QUNGTyxRQUFNQSxjQUFVLHNCQUFXLFlBQVgsbUJBQW9CLFlBQXBCLG1CQUE2QixNQUNoRCxX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O0FBQUEsUUFDQSxHQUFHLFFBQVEsMEJBQTBCLGFBQWEsVUFBVSxLQUFLLElBQUksQ0FBQztBQUFBLE1BQ3ZFO0FBQUEsRUFDTDtBQUNBLFdBQVMsaUJBQWlCLGNBQWMsVUFBVTtBQUNoRCxRQUFJLFNBQVMsU0FBUyxHQUFHO0FBQ3ZCLFlBQU0sSUFBSSxvQkFBb0IsY0FBYyxnQ0FBZ0M7QUFDOUUsUUFBSSxTQUFTLFNBQVMsR0FBRyxLQUFLLFNBQVMsU0FBUyxLQUFLLENBQUMsU0FBUyxXQUFXLElBQUk7QUFDNUUsWUFBTSxJQUFJO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxNQUNEO0FBQUEsRUFDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwxLDIsNF19
