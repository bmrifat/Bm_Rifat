import React from "react";
import { setRequestLocale } from "next-intl/server";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Card } from "@/components/ui/Card";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";

export default async function DevComponentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-12 md:py-16">
      <SectionContainer spaced={false}>
        <div className="mb-10 pb-6 border-b border-border">
          <div className="text-xs font-mono text-primary uppercase font-bold">
            Development Only
          </div>
          <h1 className="text-3xl font-display font-bold text-text mt-1">
            Design System & Component Library
          </h1>
          <p className="text-sm text-muted">
            Interactive preview of all design system tokens, primitives, badges, and layout widgets.
          </p>
        </div>

        {/* 1. BUTTONS */}
        <section className="my-10 space-y-4">
          <h2 className="text-lg font-bold text-text">Buttons & Variants</h2>
          <div className="flex flex-wrap items-center gap-4 p-6 rounded-2xl border border-border bg-surface">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        {/* 2. STATUS BADGES */}
        <section className="my-10 space-y-4">
          <h2 className="text-lg font-bold text-text">Status Badges</h2>
          <div className="flex flex-wrap items-center gap-4 p-6 rounded-2xl border border-border bg-surface">
            <StatusBadge status="live" />
            <StatusBadge status="building" />
            <StatusBadge status="planned" />
            <StatusBadge status="archived" />
          </div>
        </section>

        {/* 3. SWITCHES & TOGGLES */}
        <section className="my-10 space-y-4">
          <h2 className="text-lg font-bold text-text">Toggles & Controls</h2>
          <div className="flex items-center gap-6 p-6 rounded-2xl border border-border bg-surface">
            <ThemeToggle />
            <LanguageSwitch />
          </div>
        </section>

        {/* 4. CARDS */}
        <section className="my-10 space-y-4">
          <h2 className="text-lg font-bold text-text">Cards & Elevation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card hoverable>
              <h3 className="font-bold text-text">Hoverable Card</h3>
              <p className="text-sm text-muted mt-2">
                Elevates on hover with subtle border highlight and shadow expansion.
              </p>
            </Card>
            <Card>
              <h3 className="font-bold text-text">Static Surface Card</h3>
              <p className="text-sm text-muted mt-2">
                Standard container for non-interactive content blocks.
              </p>
            </Card>
          </div>
        </section>

        {/* 5. ARCHITECTURE DIAGRAMS */}
        <section className="my-10 space-y-4">
          <h2 className="text-lg font-bold text-text">Architecture Visualizer</h2>
          <ArchitectureDiagram type="shasthosathi" />
          <div className="pt-6">
            <ArchitectureDiagram type="docclinic" />
          </div>
        </section>
      </SectionContainer>
    </div>
  );
}
