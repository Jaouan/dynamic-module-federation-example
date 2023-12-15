import { importRemote } from "./module-loader";

(async () => {
    const mfeManifest = await (await fetch("/mfe-manifest.json")).json();

    // For this example, we take the first module in the manifest.
    const [moduleName, moduleConfig] = Object.entries(mfeManifest).shift();

    const module = (await importRemote(moduleName, moduleConfig.remoteEntry));
    module.mount(document.body)
})();
