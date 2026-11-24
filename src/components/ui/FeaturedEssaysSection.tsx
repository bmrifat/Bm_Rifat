import React from "react";
import { Link } from "@/i18n/routing";
import { Post } from "@/lib/validators";
import { ArrowUpRight, Clock, Calendar } from "@/components/ui/Icons";

interface FeaturedEssaysSectionProps {
  posts: Post[];
  isBn?: boolean;
}

export const FeaturedEssaysSection: React.FC<FeaturedEssaysSectionProps> = ({
  posts,
  isBn = false,
}) => {
  const loc = isBn ? "bn" : "en";
  const featured = posts.slice(0, 3);

  return (
    <div className="space-y-3">
      {featured.map((post) => (
        <article
          key={post.slug}
          className="group relative -mx-3 sm:-mx-4 p-4 sm:p-4.5 rounded-xl bg-surface/40 hover:bg-surface hover:shadow-soft border border-border/60 hover:border-gold/50 hover:-translate-y-0.5 transition-all duration-200"
        >
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-muted/70">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" aria-hidden="true" />
                <span>{post.date}</span>
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" aria-hidden="true" />
                <span>{post.readingTime}</span>
              </span>
              <div className="ml-auto flex items-center gap-1.5 flex-wrap">
                {post.tags.slice(0, 2).map((t, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 rounded bg-surface-subtle border border-border/60 text-[10px] text-muted font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <h3 className="text-[15.5px] sm:text-[16.5px] font-medium font-serif text-text group-hover:text-accent transition-colors leading-snug">
              <Link
                href={`/writing/${post.slug}`}
                className="inline-flex items-baseline gap-1"
              >
                <span>{post.title[loc]}</span>
                <ArrowUpRight
                  className="w-3.5 h-3.5 text-muted/40 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all inline shrink-0 self-center"
                  aria-hidden="true"
                />
              </Link>
            </h3>

            <p className="text-[13.5px] sm:text-[14px] text-muted leading-relaxed line-clamp-2">
              {post.summary[loc]}
            </p>
          </div>
        </article>
      ))}

      <div className="pt-2 text-center sm:text-left">
        <Link
          href="/writing"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted hover:text-accent transition-colors group"
        >
          <span>{isBn ? "সবগুলো রচনা ও আর্কিটেকচার বিশ্লেষণ দেখুন" : "View all essays & case studies"}</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};
