# Dynamic Module Federation example

This project contains :
- `packages/shell-host`: the shell (vanilla), webpack modules host.
- `packages/remote-mfe-1`: a microfrontends (React), vite remote module.

The `shell-host` displays the `remote-mfe-1` using [module federation](https://webpack.js.org/concepts/module-federation/).

## Usage

### Run the shell
```bash
yarn dev:shell
```

### Run the microfrontend
```bash
yarn dev:mfe
```

### Build everything
```bash
yarn build
```

## Key files

- [`packages/host-shell/public/mfe-manifest.json`](./packages/host-shell/public/mfe-manifest.json): where remote entries are declared.
    ```json
    {
        "mfe-1": {
            "remoteEntry": "/mfe-1-v1/assets/remoteEntry.js"
        }
    }
    ```

- [`packages/host-shell/main.js`](./packages/host-shell/main.js): where `mfe-manifest.json` is fetched and `mfe-1` is mounted using module's `mount()` logic.

- [`packages/remote-mfe-1/src/mfe.jsx`](./packages/remote-mfe-1/src/mfe.jsx): where the mounting logic `mount()` is defined, allowing the host to mount any module without needing to know the specific technology used (React, Svelte, Vue, or any other).

- [`packages/host-shell/webpack.config.js`](./packages/host-shell/webpack.config.js): where the host is configured to import module using [promise-based-dynamic-remotes](https://webpack.js.org/concepts/module-federation/#promise-based-dynamic-remotes).

- [`packages/remote-mfe-1/vite.config.js`](./ackages/remote-mfe-1/vite.config.js): where `mfe-1` is configured to be a module.
