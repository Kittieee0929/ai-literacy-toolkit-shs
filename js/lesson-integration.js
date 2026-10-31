/* Keep the established site and its tools; replace only the module lesson player. */
(() => {
  'use strict';
  const player = window.AILiteracyPlayer;
  window.AIToolkitSimpleLessons = {
    ...player,
    render(options) {
      const data = window.AILiteracyLessons[options.number];
      if (!data) return;
      options.container.closest('#moduleModal').classList.add('simple-module');
      options.container.dataset.simpleLesson = 'true';
      options.container.classList.remove('is-slide-module');
      player.render({ ...options, data });
    }
  };
})();
