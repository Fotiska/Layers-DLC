async function initWebGPU() {
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();
    return device;
}

(async () => {
    const device = await initWebGPU();
})();
