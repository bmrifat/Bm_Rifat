import React from "react";
import clsx from "clsx";

interface ArchitectureDiagramProps {
  type: "shasthosathi" | "docclinic";
  className?: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  type,
  className,
}) => {
  if (type === "shasthosathi") {
    return (
      <div className={clsx("rounded-2xl border border-border bg-elevated/40 p-6 sm:p-8", className)}>
        <div className="flex items-center justify-between pb-4 border-b border-border/80 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Architecture Topology
          </span>
          <span className="text-xs text-muted">Multi-Model AI Fallback Cascade</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Step 1: Ingestion & Privacy */}
          <div className="rounded-xl border border-border bg-surface p-4 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-primary uppercase">Stage 01</div>
              <h5 className="font-semibold text-sm text-text mt-1">Client Ingestion</h5>
              <p className="text-xs text-muted mt-2">
                Mobile web client uploads lab photo or prescription. Client-side MIME check & size clamp.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-muted">
              MIME / EXIF Scrub
            </div>
          </div>

          {/* Step 2: Storage & Signing */}
          <div className="rounded-xl border border-border bg-surface p-4 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-primary uppercase">Stage 02</div>
              <h5 className="font-semibold text-sm text-text mt-1">Signed Storage</h5>
              <p className="text-xs text-muted mt-2">
                Cloudflare R2 signed URL with short expiration. Encrypted at rest, zero public bucket exposure.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-muted">
              Cloudflare R2 (TTL: 15m)
            </div>
          </div>

          {/* Step 3: Cascade Router */}
          <div className="rounded-xl border-2 border-primary/40 bg-surface p-4 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-[10px] font-bold text-primary uppercase">Stage 03</div>
              <h5 className="font-semibold text-sm text-text mt-1">Fallback Cascade</h5>
              <p className="text-xs text-muted mt-2">
                Primary: Gemini Flash (3.5s timeout) → Failover: Gemini Pro → Circuit Breaker trips after 3 timeouts.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
              Circuit Breaker: Active
            </div>
          </div>

          {/* Step 4: Medical Interceptor & TTS */}
          <div className="rounded-xl border border-border bg-surface p-4 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-primary uppercase">Stage 04</div>
              <h5 className="font-semibold text-sm text-text mt-1">Safety & Bengali Audio</h5>
              <p className="text-xs text-muted mt-2">
                Deterministic regex strips drug doses. Output parsed via Zod + streamed to Edge TTS Bengali audio.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-muted">
              Zod + Edge TTS
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DocClinic diagram
  return (
    <div className={clsx("rounded-2xl border border-border bg-elevated/40 p-6 sm:p-8", className)}>
      <div className="flex items-center justify-between pb-4 border-b border-border/80 mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          System Security & Multi-Tenancy
        </span>
        <span className="text-xs text-muted">Tenant-Scoped Isolation Architecture</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="text-[10px] font-bold text-primary uppercase">Layer 01: Client & Session</div>
          <h5 className="font-semibold text-sm text-text mt-1">Role-Based Access</h5>
          <p className="text-xs text-muted mt-2">
            JWT session encrypted in httpOnly, SameSite cookies. Server middleware verifies Doctor vs Receptionist boundaries.
          </p>
          <div className="mt-3 text-[11px] font-mono text-muted">
            RBAC Enforcement
          </div>
        </div>

        <div className="rounded-xl border-2 border-primary/40 bg-surface p-4 shadow-sm">
          <div className="text-[10px] font-bold text-primary uppercase">Layer 02: Query Interceptor</div>
          <h5 className="font-semibold text-sm text-text mt-1">Connection Tenant Guard</h5>
          <p className="text-xs text-muted mt-2">
            SQL connection pool wrapper injects <code className="text-primary font-mono text-[11px]">tenant_id</code> into every transaction context. Zero cross-tenant data leakage.
          </p>
          <div className="mt-3 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            Scoped Client Pool
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="text-[10px] font-bold text-primary uppercase">Layer 03: Queue & OCR</div>
          <h5 className="font-semibold text-sm text-text mt-1">Concurrency-Safe Engine</h5>
          <p className="text-xs text-muted mt-2">
            Pessimistic row locking on serial assignment prevents duplicate appointment numbers. Async Gemini OCR extracts prescription notes.
          </p>
          <div className="mt-3 text-[11px] font-mono text-muted">
            Atomic Serial Locking
          </div>
        </div>
      </div>
    </div>
  );
};
