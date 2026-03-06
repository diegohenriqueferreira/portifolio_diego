import { useEffect, useMemo, useState } from "react";
import BlogFinderCard from "../components/cards/BlogFinderCard";
import OptimizedImage from "../components/common/OptimizedImage";
import SectionHeading from "../components/layout/SectionHeading";

const BLOGS_PER_PAGE = 6;
const INITIAL_BLOG_COUNT = 3;

const parseBlogDate = (value = "") => {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const inferCategory = (blog) => {
  if (blog.category) {
    return blog.category;
  }

  const text = `${blog.title || ""} ${blog.description || ""}`.toLowerCase();

  if (text.includes("django")) {
    return "Django";
  }

  if (text.includes("data structure") || text.includes("algorithm")) {
    return "DSA";
  }

  if (
    text.includes("machine learning") ||
    text.includes("probability") ||
    text.includes("principal component") ||
    text.includes("linear algebra")
  ) {
    return "Machine Learning";
  }

  return "General";
};

function BlogsSection({ blogs }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isExpanded, setIsExpanded] = useState(false);
  const [page, setPage] = useState(1);
  const [previewBlog, setPreviewBlog] = useState(null);

  const preparedBlogs = useMemo(
    () =>
      blogs.map((blog, index) => ({
        ...blog,
        category: inferCategory(blog),
        timestamp: parseBlogDate(blog.time),
        order: index
      })),
    [blogs]
  );

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(preparedBlogs.map((blog) => blog.category)));
    return ["All", ...uniqueCategories];
  }, [preparedBlogs]);

  const filteredBlogs = useMemo(() => {
    let items = [...preparedBlogs];

    if (activeCategory !== "All") {
      items = items.filter((blog) => blog.category === activeCategory);
    }

    const sorted = [...items];
    sorted.sort((a, b) => {
      return (b.timestamp || 0) - (a.timestamp || 0) || a.order - b.order;
    });

    return sorted;
  }, [preparedBlogs, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const startIndex = isExpanded ? (safePage - 1) * BLOGS_PER_PAGE : 0;
  const visibleBlogs = isExpanded
    ? filteredBlogs.slice(startIndex, startIndex + BLOGS_PER_PAGE)
    : filteredBlogs.slice(0, INITIAL_BLOG_COUNT);

  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  useEffect(() => {
    if (!previewBlog) {
      return undefined;
    }

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setPreviewBlog(null);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [previewBlog]);

  return (
    <>
      <section id="blogs" className="section-shell perf-section scroll-mt-24">
        <SectionHeading eyebrow="Blogs" />

        <div className="mb-6 space-y-3">
          <div className="text-center">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#dce8fa]">
              Categories
            </p>
            <div className="carousel-scroll flex justify-center gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition ${
                    activeCategory === category
                      ? "border-accent/70 bg-accent text-slate-950"
                      : "border-white/25 bg-white/[0.04] text-slate-200 hover:border-accent/55 hover:text-accent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

        </div>

        {visibleBlogs.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleBlogs.map((item) => (
              <BlogFinderCard key={item.id} item={item} onPreview={setPreviewBlog} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-6 text-sm text-slate-300">
            No blogs found in this category. Try selecting another category.
          </div>
        )}

        {!isExpanded && filteredBlogs.length > INITIAL_BLOG_COUNT ? (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => {
                setIsExpanded(true);
                setPage(1);
              }}
              className="rounded-full border border-accent/65 bg-white/[0.04] px-5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-accent transition hover:bg-accent hover:text-slate-950"
            >
              More Blogs
            </button>
          </div>
        ) : null}

        {isExpanded && totalPages > 1 ? (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={safePage === 1}
              className="rounded-full border border-white/30 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200 transition hover:border-accent/55 hover:text-accent disabled:cursor-not-allowed disabled:opacity-45"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`h-8 min-w-8 rounded-full border px-2 text-xs font-semibold transition ${
                  safePage === pageNumber
                    ? "border-accent/70 bg-accent text-slate-950"
                    : "border-white/25 bg-white/[0.04] text-slate-200 hover:border-accent/55 hover:text-accent"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={safePage === totalPages}
              className="rounded-full border border-white/30 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200 transition hover:border-accent/55 hover:text-accent disabled:cursor-not-allowed disabled:opacity-45"
            >
              Next
            </button>
          </div>
        ) : null}

        {isExpanded ? (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false);
                setPage(1);
              }}
              className="rounded-full border border-white/30 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-200 transition hover:border-accent/55 hover:text-accent"
            >
              Show Less
            </button>
          </div>
        ) : null}
      </section>

      {previewBlog ? (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-slate-950/90 p-3 pt-16 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${previewBlog.title} image preview`}
          onClick={() => setPreviewBlog(null)}
        >
          <div
            className="glass-surface relative w-full max-w-4xl overflow-hidden max-h-[88dvh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <OptimizedImage
              src={previewBlog.image}
              alt={previewBlog.title}
              className="max-h-[52dvh] w-full object-contain bg-slate-950/50 sm:max-h-[72vh]"
              width={1200}
              height={800}
              sizes="90vw"
              loading="eager"
              fetchPriority="high"
            />

            <div className="space-y-2 p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {previewBlog.time}
                </p>
                <span className="rounded-full border border-white/25 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#dce8fa]">
                  {previewBlog.category}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-ink">{previewBlog.title}</h3>
              <p className="text-sm text-slate-300">{previewBlog.description}</p>
              {previewBlog.website ? (
                <a
                  href={previewBlog.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-accent/60 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-accent transition hover:bg-accent hover:text-slate-950"
                >
                  Read Full Blog
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default BlogsSection;
