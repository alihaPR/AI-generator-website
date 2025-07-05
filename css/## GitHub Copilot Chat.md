## GitHub Copilot Chat

- Extension Version: 0.28.5 (prod)
- VS Code: vscode/1.101.2
- OS: Windows

## Network

User Settings:
```json
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 116.203.156.19 (50 ms)
- DNS ipv6 Lookup: Error (40 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (1 ms)
- Electron fetch (configured): HTTP 403 (287 ms)
- Node.js https: Error (3421 ms): Error: Client network socket disconnected before secure TLS connection was established
    at TLSSocket.onConnectEnd (node:_tls_wrap:1732:19)
    at TLSSocket.emit (node:events:530:35)
    at TLSSocket.emit (node:domain:489:12)
    at endReadableNT (node:internal/streams/readable:1698:12)
    at processTicksAndRejections (node:internal/process/task_queues:90:21)
- Node.js fetch: Error (344 ms): TypeError: fetch failed
    at node:internal/deps/undici/undici:13510:13
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at cN._fetch (c:\Users\alireza\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:1039:7812)
    at c:\Users\alireza\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:1070:134
    at Xb.h (file:///c:/Program%20Files/Microsoft%20VS%20Code/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:120:41516)
  Error: Client network socket disconnected before secure TLS connection was established
      at TLSSocket.onConnectEnd (node:_tls_wrap:1732:19)
      at TLSSocket.emit (node:events:530:35)
      at TLSSocket.emit (node:domain:489:12)
      at endReadableNT (node:internal/streams/readable:1698:12)
      at processTicksAndRejections (node:internal/process/task_queues:90:21)
- Helix fetch: Error (570 ms): FetchError: Client network socket disconnected before secure TLS connection was established
    at VRt (c:\Users\alireza\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:330:29579)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at rqr (c:\Users\alireza\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:330:31605)
    at Rb.fetch (c:\Users\alireza\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:1040:2495)
    at c:\Users\alireza\.vscode\extensions\github.copilot-chat-0.28.5\dist\extension.js:1070:134
    at Xb.h (file:///c:/Program%20Files/Microsoft%20VS%20Code/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:120:41516)

Connecting to https://api.individual.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 116.202.105.195 (42 ms)
- DNS ipv6 Lookup: Error (38 ms): getaddrinfo ENOTFOUND api.individual.githubcopilot.com
- Proxy URL: None (14 ms)
- Electron fetch (configured): HTTP 200 (918 ms)
- Node.js https: HTTP 200 (847 ms)
- Node.js fetch: HTTP 200 (761 ms)
- Helix fetch: HTTP 200 (793 ms)

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).
