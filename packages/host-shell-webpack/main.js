(async () => {
    const mfeManifest = await (await fetch("/mfe-manifest.json")).json();
    window.resolveRemote = (remoteId) => mfeManifest[remoteId]?.remoteEntry;

    const module = await import('mfe-1/App');
    module.mount(document.body);
})();
