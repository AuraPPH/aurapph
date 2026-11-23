import React from 'react';

interface DownloadAndTeamProps {
  onShowApkToast: () => void;
}

const TEAM_MEMBERS = [
  { initials: 'SH', name: 'Shagun', role: 'Team Member' },
  { initials: 'KK', name: 'Kislay Kumar', role: 'Team Member' },
  { initials: 'SS', name: 'Snehil Sahay', role: 'Team Member' },
  { initials: 'KS', name: 'Kartikey Singh', role: 'Team Lead' },
  { initials: 'DP', name: 'Dhyey Patel', role: 'Systems & Validation' },
];

const APK_SPECS = [
  { label: 'TARGET OS', value: 'Android 9+ (API 28)' },
  { label: 'MEMORY FLOOR', value: '~2 GB RAM budget phones' },
  { label: 'ACCOUNT / LOGIN', value: 'None required' },
  { label: 'INTERNET PERMISSION', value: 'None (100% offline)' },
  { label: 'COST', value: '₹0 · Free & open spec' },
];

export const DownloadAndTeam: React.FC<DownloadAndTeamProps> = ({ onShowApkToast }) => {
  return (
    <>
      {/* 11 — DOWNLOAD / APK ROADMAP */}
      <section
        id="download"
        className="py-14 sm:py-16 border-b border-[#CFCAC0]"
        aria-labelledby="download-heading"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#525855] mb-3">
            11 — APK ROADMAP
          </p>
          <h2
            id="download-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] font-normal text-[#141716] mb-8"
          >
            Release gated on bench validation.
          </h2>

          {/* APK Card — clicking the card or disabled button area triggers the honest status toast */}
          <div
            data-testid="apk-download-card"
            onClick={onShowApkToast}
            className="border border-[#141716] bg-[#EAE6DC] grid grid-cols-1 lg:grid-cols-12 cursor-pointer"
          >
            <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#CFCAC0] flex flex-col justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-mono text-xs font-semibold tracking-[0.12em] uppercase text-[#141716]">
                    AURAPPH ANDROID BUILD
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 border border-[#CFCAC0] bg-[#F4F2EC] text-[#525855]">
                    NOT AVAILABLE YET
                  </span>
                </div>
                <p className="font-mono text-lg sm:text-xl text-[#141716] font-medium">
                  aurapph — Android · Native Kotlin · Fully offline
                </p>
                <p className="mt-3 text-sm text-[#525855] leading-relaxed max-w-xl">
                  We will not distribute an uncalibrated build for clinical or field use. The signed
                  APK and printable calibration card PDF will unlock here after bench testing.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  aria-disabled="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowApkToast();
                  }}
                  className="min-h-[44px] px-6 border border-[#CFCAC0] bg-[#F4F2EC] text-[#525855] font-mono text-xs tracking-[0.08em] uppercase cursor-not-allowed"
                >
                  Download APK (Locked)
                </button>
                <span className="font-mono text-[11px] text-[#525855]">
                  CLICK TO CHECK RELEASE GATE
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F4F2EC] p-6 sm:p-8">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#525855] mb-4">
                TARGET DEVICE SPECIFICATION
              </p>
              <dl className="divide-y divide-[#CFCAC0] border-t border-b border-[#CFCAC0]">
                {APK_SPECS.map((spec) => (
                  <div
                    key={spec.label}
                    className="py-2.5 flex items-baseline justify-between gap-4"
                  >
                    <dt className="font-mono text-[11px] tracking-[0.06em] uppercase text-[#525855]">
                      {spec.label}
                    </dt>
                    <dd className="font-mono text-xs text-[#141716] text-right tabular-nums">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 12 — TEAM */}
      <section
        id="team"
        className="py-14 sm:py-16 border-b border-[#CFCAC0]"
        aria-labelledby="team-heading"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#525855] mb-3">
            12 — TEAM
          </p>
          <h2
            id="team-heading"
            className="font-serif text-3xl sm:text-4xl leading-[1.15] font-normal text-[#141716] mb-8"
          >
            Student engineering team.
          </h2>

          {/* 5 cells in a hairline grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-[#CFCAC0]">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="p-6 border-r border-b border-[#CFCAC0] bg-[#F4F2EC] flex flex-col gap-5"
              >
                <div
                  aria-hidden="true"
                  className="w-12 h-12 border border-[#141716] bg-[#EAE6DC] flex items-center justify-center font-mono text-sm font-semibold tracking-[0.08em] text-[#141716]"
                >
                  {member.initials}
                </div>
                <div>
                  <h3 className="text-base font-medium text-[#141716]">{member.name}</h3>
                  <p className="font-mono text-[11px] tracking-[0.06em] uppercase text-[#525855] mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Hackathon Banner Line */}
          <div className="mt-6 border border-[#CFCAC0] bg-[#EAE6DC] px-5 py-3.5">
            <p className="font-mono text-xs tracking-[0.08em] uppercase text-[#141716]">
              Health Hackathon 3.0 · VIT Bhopal × Johns Hopkins University · Jan 27–29, 2027
            </p>
          </div>
        </div>
      </section>

      {/* 12 — FOOTER */}
      <footer className="py-10 sm:py-12 bg-[#F4F2EC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#CFCAC0]">
            <div className="md:col-span-5">
              <p
                className="text-2xl sm:text-3xl font-medium text-[#141716]"
                style={{ fontFamily: 'var(--font-hindi)' }}
              >
                अंदाज़ा नहीं, माप।
              </p>
              <p className="font-mono text-xs tracking-[0.08em] uppercase text-[#525855] mt-2">
                Not a guess. A measurement.
              </p>
            </div>

            <div className="md:col-span-4">
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#525855] mb-3">
                PUBLISHED SOURCES
              </p>
              <ul className="space-y-1.5 text-sm text-[#141716]">
                <li>
                  <a
                    href="https://www.who.int/news-room/fact-sheets/detail/maternal-mortality"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 hover:text-[#B81D24]"
                  >
                    WHO fact sheet — maternal mortality
                  </a>
                </li>
                <li>
                  <a
                    href="https://doi.org/10.1056/NEJMoa2303966"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 hover:text-[#B81D24]"
                  >
                    E-MOTIVE trial, NEJM 2023
                  </a>
                </li>
                <li>SRS 2020–22 MMR bulletin</li>
              </ul>
            </div>

            <div className="md:col-span-3 md:text-right">
              <a
                href="#top"
                className="inline-flex items-center justify-center min-h-[44px] px-4 border border-[#141716] font-mono text-xs tracking-[0.08em] uppercase text-[#141716] hover:bg-[#141716] hover:text-[#F4F2EC] transition-colors"
              >
                Back to top ↑
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="font-mono text-xs text-[#525855]">
              Student research prototype. Not a certified medical device. Does not replace clinical
              judgement.
            </p>
            <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#525855] shrink-0">
              AURAPPH · SPEC v0.1
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
