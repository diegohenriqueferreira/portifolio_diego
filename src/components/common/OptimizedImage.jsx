function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  sizes,
  loading = "lazy",
  decoding = "async",
  fetchPriority = "auto",
  draggable = false
}) {
  const hasSource = typeof src === "string" && src.trim().length > 0;

  if (!hasSource) {
    return (
      <div
        className={`${className} bg-slate-900/45`}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      draggable={draggable}
    />
  );
}

export default OptimizedImage;
