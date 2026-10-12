document.addEventListener("click", event => {
    const reset = event.target.closest("[data-readiness-reset]");
    if (!reset) return;

    // finalizer clears the saved readiness state first. Reloading then rebuilds
    // script-base's private in-memory readinessState from the now-empty storage,
    // preventing old answers from reappearing on the next click.
    window.setTimeout(() => window.location.reload(), 40);
});
