# Dynamic Module Federation example

This project contains :
- `packages/shell-host-vite`: a fully-dynamic shell (vanilla), based on Vite module federation. Vite config knows neither the names nor the URLs of the modules.
- `packages/shell-host-webpack`: another semi-dynamic shell (vanilla), based on Webpack module federation. Webpack config knows the module names, but not the URLs.
- `packages/remote-mfe-1`: a microfrontends (React), a Vite remote module.

The `shell-host-*` displays the `remote-mfe-1` using [module federation](https://webpack.js.org/concepts/module-federation/).

## Usage

### Run the Vite shell (fully-dynamic)
```bash
yarn dev:shell-vite
```

### Run the Webpack shell (demi-dynamic)
```bash
yarn dev:shell-webpack
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

### Host
- [`packages/host-shell-*/public/mfe-manifest.json`](./packages/host-shell-webpack/public/mfe-manifest.json): where modules remote entries are declared.
    ```json
    {
        "mfe-1": {
            "remoteEntry": "/mfe-1-v1/assets/remoteEntry.js"
        }
    }
    ```

#### Vite host (fully-dynamic)

- [`packages/host-shell-vite/src/main.js`](./packages/host-shell-vite/src/main.js): where `mfe-manifest.json` is fetched and `mfe-1` is mounted using module's `mount()` logic.

- [`packages/host-shell-vite/src/module-loader.js`](./packages/host-shell-vite/src/module-loader.js): where a remote module can by dynamically imported/loaded.


#### Webpack host (demi-dynamic)

- [`packages/host-shell-webpack/main.js`](./packages/host-shell-webpack/main.js): where `mfe-manifest.json` is fetched and `mfe-1` is mounted using module's `mount()` logic.

- [`packages/host-shell-webpack/webpack.config.js`](./packages/host-shell-webpack/webpack.config.js): where the host is configured to import module using [promise-based-dynamic-remotes](https://webpack.js.org/concepts/module-federation/#promise-based-dynamic-remotes).


### React MFE

- [`packages/remote-mfe-1/src/mfe.jsx`](./packages/remote-mfe-1/src/mfe.jsx): where the mounting logic `mount()` is defined, allowing the host to mount any module without needing to know the specific technology used (React, Svelte, Vue, or any other).

- [`packages/remote-mfe-1/vite.config.js`](./ackages/remote-mfe-1/vite.config.js): where `mfe-1` is configured to be a module.
