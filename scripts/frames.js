(() => {
  const hero = document.querySelector('.hero-black-holes');
  if (!hero) return;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return;
  canvas.className = 'hero-frames';
  canvas.setAttribute('aria-hidden', 'true');
  hero.prepend(canvas);

  const frameCount = 181;
  const maxFPS = 200; // Playback rate while scrolling; limited by display refresh and frame readiness.
  const frameInterval = 1000 / maxFPS;
  let lastFrameTime = -Infinity;
  const frameURL = (index, size = activeSize) => new URL(
    `../images/black-hole-hero-${size}/frame-${String(index + 1).padStart(4, '0')}.webp`,
    document.baseURI,
  ).href;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let ready = new Map();
  let loading = new Set();
  let failed = new Set();
  let activeSize = 'large';
  let requestedSize = '';
  let generation = 0;
  let displayedBitmap = null;
  let displayedSize = '';

  function switchSize(size) {
    generation++;
    activeSize = size;
    // Keep the displayed image alive until its replacement has been drawn.
    for (const bitmap of ready.values()) {
      if (bitmap !== displayedBitmap) bitmap.close();
    }
    ready = new Map();
    loading = new Set();
    failed = new Set();
  }

  function syncSize() {
    const value = getComputedStyle(hero).getPropertyValue('--frame-size').trim();
    const size = ['small', 'medium', 'large'].includes(value) ? value : 'large';
    if (size !== requestedSize) {
      requestedSize = size;
      switchSize(size);
    }
  }
  const scrollIdleMs = 80; // Fallback for browsers without scrollend.
  let lastScrollTime = -Infinity;
  let lastScrollY = window.scrollY;
  let scrolling = false;
  let current = -1;
  let direction = 1;
  let pending = false;
  let lastDraw = '';
  const bufferAhead = 16;
  const bufferBehind = 6;
  const maxCachedFrames = 24;
  const maxConcurrentLoads = 3;

  // Wrap both playback and preloading across the first/last-frame boundary.
  const wrapFrame = index => ((index % frameCount) + frameCount) % frameCount;

  function wantedFrames() {
    // Buffer around the displayed frame, in the current scroll direction.
    const base = motion.matches || window.scrollY <= 1 ? 0 : Math.max(0, current);
    const indices = [base];
    if (!motion.matches) {
      for (let distance = 1; distance <= bufferAhead; distance++) {
        indices.push(base + distance * direction);
        if (distance <= bufferBehind) indices.push(base - distance * direction);
      }
    }
    return [...new Set(indices.map(wrapFrame))];
  }

  function requestUpdate() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(update);
  }

  async function load(index) {
    const loadGeneration = generation;
    const loadSize = activeSize;
    const pendingLoads = loading;
    pendingLoads.add(index);
    try {
      const image = new Image();
      image.src = frameURL(index, loadSize);
      await image.decode();
      // A bitmap remains ready to draw; it does not depend on CSS image painting.
      if (loadGeneration !== generation) return;
      const bitmap = await createImageBitmap(image);
      if (loadGeneration !== generation) {
        bitmap.close();
        return;
      }
      ready.set(index, bitmap);
      // Protect the displayed frame and the next frames in the current direction.
      const priorities = new Map(wantedFrames().map((key, rank) => [key, rank]));
      while (ready.size > maxCachedFrames) {
        const candidates = [...ready.keys()].filter(key => key !== current && key !== 0);
        const rank = key => priorities.get(key) ?? (frameCount + Math.abs(key - Math.max(0, current)));
        candidates.sort((a, b) => rank(b) - rank(a));
        const discard = candidates[0];
        ready.get(discard).close();
        ready.delete(discard);
      }
    } catch (error) {
      if (loadGeneration === generation) {
        if (loadSize !== 'large') {
          console.warn(`The ${loadSize} frame set is unavailable; using large frames.`, error);
          switchSize('large');
        } else {
          failed.add(index);
          console.warn(`Could not load ${frameURL(index, loadSize)}`, error);
        }
      }
    } finally {
      pendingLoads.delete(index);
      requestUpdate();
    }
  }

  function preload() {
    // Rebuild priorities on every scroll, so reversing immediately changes the buffer.
    for (const index of wantedFrames()) {
      if (loading.size >= maxConcurrentLoads) break;
      if (index < 0 || index >= frameCount || ready.has(index) || loading.has(index) || failed.has(index)) continue;
      load(index);
    }
  }

  function update() {
    pending = false;
    syncSize();
    const now = performance.now();
    if (now - lastScrollTime >= scrollIdleMs) scrolling = false;
    const rect = hero.getBoundingClientRect();
    const visible = rect.bottom > 0 && rect.top < window.innerHeight;
    const atTop = window.scrollY <= 1;
    if (atTop) direction = 1;
    const playing = scrolling && visible && !motion.matches && !atTop;
    preload();

    // Scroll activity controls play/pause; returning to the top resets the opening frame.
    let next = current < 0 || motion.matches || atTop ? 0 : current;
    if (current >= 0 && playing && now - lastFrameTime >= frameInterval) {
      next = wrapFrame(current + direction);
      // Bound the search so missing files cannot cause an endless loop.
      for (let skipped = 0; skipped < frameCount && failed.has(next); skipped++) {
        next = wrapFrame(next + direction);
      }
    }
    const selected = ready.has(next) ? next : current;
    if (playing) requestUpdate();
    if (selected < 0) return;
    const replacement = ready.get(selected);
    const bitmap = replacement || (selected === current ? displayedBitmap : null);
    const bitmapSize = replacement ? activeSize : displayedSize;
    if (!bitmap) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    const ratio = window.devicePixelRatio || 1;
    const pixelWidth = Math.round(width * ratio);
    const pixelHeight = Math.round(height * ratio);
    const drawKey = [bitmapSize, selected, pixelWidth, pixelHeight].join(':');
    // Finishing a prefetch must not repaint an unchanged visible frame.
    if (drawKey === lastDraw) return;
    // Resize and redraw in the same callback, never leaving an empty canvas.
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const areaWidth = width;
    const areaHeight = height;
    const scale = Math.max(areaWidth / bitmap.width, areaHeight / bitmap.height);
    const drawWidth = bitmap.width * scale;
    const drawHeight = bitmap.height * scale;
    const x = (areaWidth - drawWidth) / 2;
    const y = (areaHeight - drawHeight) / 2;
    context.fillStyle = '#000';
    context.fillRect(0, 0, width, height);
    context.drawImage(bitmap, x, y, drawWidth, drawHeight);
    if (displayedBitmap && displayedBitmap !== bitmap && ![...ready.values()].includes(displayedBitmap)) {
      displayedBitmap.close();
    }
    displayedBitmap = bitmap;
    displayedSize = bitmapSize;
    if (current !== selected) lastFrameTime = now;
    current = selected;
    lastDraw = drawKey;
  }

  function onScroll() {
    const position = window.scrollY;
    const delta = position - lastScrollY;
    lastScrollY = position;
    if (!delta) return;
    const now = performance.now();
    if (!scrolling || now - lastScrollTime >= scrollIdleMs) lastFrameTime = now;
    direction = Math.sign(delta);
    lastScrollTime = now;
    scrolling = true;
    requestUpdate();
  }

  function stopPlayback() {
    scrolling = false;
    lastScrollTime = -Infinity;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('scrollend', stopPlayback);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopPlayback();
  });
  window.addEventListener('resize', requestUpdate);
  window.addEventListener('pageshow', requestUpdate);
  motion.addEventListener('change', requestUpdate);
  new ResizeObserver(requestUpdate).observe(hero);
  requestUpdate();
})();
