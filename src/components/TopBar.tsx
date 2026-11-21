import React, { useState } from 'react';

const NAV_LINKS = [
  { href: '#problem', label: 'Problem' },
  { href: '#triveni', label: 'TRIVENI' },
  { href: '#simulator', label: 'Simulator' },
  { href: '#validation', label: 'Validation' },
  { href: '#team', label: 'Team' },
];

export const TopBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F4F2EC] border-b border-[#CFCAC0]">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
        {/* Zone 1: Wordmark + Pre-release pill badge */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 shrink">
          <a
            href="#top"
            className="font-mono text-xs sm:text-base font-semibold tracking-[0.14em] sm:tracking-[0.22em] text-[#141716] whitespace-nowrap shrink-0"
          >
            AURAPPH
          </a>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.06em] sm:tracking-[0.1em] uppercase px-2 sm:px-2.5 py-0.5 rounded-full border border-[#CFCAC0] bg-[#EAE6DC] text-[#141716] whitespace-nowrap shrink-0">
            v0.1 PRE-RELEASE
          </span>
        </div>

        {/* Zone 2: Nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 lg:gap-7"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#525855] hover:text-[#141716] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#141716]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary CTA + Mobile drawer toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <a
            href="#download"
            className="min-h-[44px] sm:min-h-[40px] px-2.5 sm:px-4 inline-flex items-center justify-center bg-[#141716] text-[#F4F2EC] hover:bg-[#B81D24] transition-colors font-mono text-[11px] sm:text-xs tracking-[0.04em] sm:tracking-[0.06em] whitespace-nowrap shrink-0"
          >
            APK Roadmap
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center border border-[#CFCAC0] text-[#141716] cursor-pointer shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {mobileMenuOpen ? (
                <path
                  d="M4 4L14 14M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              ) : (
                <path
                  d="M2 4.5H16M2 9H16M2 13.5H16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#CFCAC0] bg-[#EAE6DC] px-4 py-2"
        >
          <ul className="divide-y divide-[#CFCAC0]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block min-h-[44px] leading-[44px] font-mono text-xs tracking-[0.08em] uppercase text-[#141716]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
