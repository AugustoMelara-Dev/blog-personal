import { useState } from "react";
import type { FC } from "react";

type Item = {
  href: string;
  label: string;
};

export const MobileNav: FC<{ items: Item[]; pathname: string }> = ({ items, pathname }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Cerrar menu" : "Abrir menu"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-white text-ink-900 shadow-soft"
      >
        <span aria-hidden="true" className="text-xl leading-none">
          {open ? "×" : "☰"}
        </span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Cerrar menu"
            className="fixed inset-0 z-40 bg-ink-900/10"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-nav-panel"
            className="absolute inset-x-4 top-20 z-50 rounded-3xl border border-brand-100 bg-white p-4 shadow-soft"
          >
            <nav className="flex flex-col gap-2">
              {items.map((item) => {
                const active =
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                      active ? "bg-brand-50 text-brand-800" : "text-ink-700"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileNav;
