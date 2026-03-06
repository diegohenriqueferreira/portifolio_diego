import { useRef } from "react";

function CarouselTrack({
  items,
  renderItem,
  ariaLabel,
  itemClassName = "w-[85%] shrink-0 snap-start sm:w-[58%] lg:w-[35%]"
}) {
  const trackRef = useRef(null);
  const touchStartXRef = useRef(null);

  const moveCarousel = (direction) => {
    const element = trackRef.current;

    if (!element) {
      return;
    }

    const distance = element.clientWidth * 0.82;
    element.scrollBy({
      left: direction * distance,
      behavior: "smooth"
    });
  };

  const handleTouchStart = (event) => {
    touchStartXRef.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartXRef.current === null) {
      return;
    }

    const delta = touchStartXRef.current - event.changedTouches[0].clientX;
    if (Math.abs(delta) > 45) {
      moveCarousel(delta > 0 ? 1 : -1);
    }

    touchStartXRef.current = null;
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => moveCarousel(-1)}
        className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 rounded-full border border-white/30 bg-slate-900/60 text-lg font-bold text-ink backdrop-blur-md transition hover:border-accent/60 hover:bg-slate-800/80 lg:grid lg:place-items-center"
        aria-label="Scroll left"
      >
        &lt;
      </button>

      <div
        ref={trackRef}
        className="carousel-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label={ariaLabel}
      >
        {items.map((item, index) => (
          <div key={`${item.id || "item"}-${index}`} className={itemClassName}>
            {renderItem(item)}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => moveCarousel(1)}
        className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 rounded-full border border-white/30 bg-slate-900/60 text-lg font-bold text-ink backdrop-blur-md transition hover:border-accent/60 hover:bg-slate-800/80 lg:grid lg:place-items-center"
        aria-label="Scroll right"
      >
        &gt;
      </button>
    </div>
  );
}

export default CarouselTrack;
