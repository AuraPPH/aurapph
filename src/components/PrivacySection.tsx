import React, { useState } from 'react';
import { Modal } from './Modal';

const STACK_ITEMS = [
  { name: 'Kotlin', detail: 'Native Android codebase' },
  { name: 'Camera2', detail: 'Controlled flash / no-flash pair' },
  { name: 'OpenCV', detail: 'Deterministic optical & area math' },
  { name: 'Room / SQLite', detail: 'Local clinical ledger only' },
  { name: 'Pre-recorded audio', detail: 'Hindi · Gujarati · English' },
];

export const PrivacySection: React.FC = () => {
  const [manifestOpen, setManifestOpen] = useState(false);

  return (
    <section
      id="privacy"
      className="dark-section py-16 sm:py-24 bg-[#0F1B1C] text-[#F4F2EC] border-b border-[#263638]"
      aria-labelledby="privacy-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#A6B4B2] mb-3">
          08 — PRIVACY &amp; ENGINEERING
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <h2
              id="privacy-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[46px] leading-[1.08] font-normal text-[#F4F2EC]"
            >
              Zero AI. Zero servers. <span className="italic">Zero internet.</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#EAE6DC] leading-relaxed max-w-2xl">
              Pad photos are processed entirely in volatile device memory and immediately discarded
              after computation. Only numeric ledger entries and alert timestamps remain on the
              phone. The release APK will request no{' '}
              <code className="font-mono text-sm px-1.5 py-0.5 border border-[#263638] bg-[#162628] text-[#F4F2EC]">
                INTERNET
              </code>{' '}
              permission — privacy by architecture, not by policy.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setManifestOpen(true)}
                className="min-h-[44px] px-5 border border-[#F4F2EC] bg-[#F4F2EC] text-[#0F1B1C] hover:bg-[#0F1B1C] hover:text-[#F4F2EC] font-mono text-xs font-semibold tracking-[0.08em] uppercase transition-colors cursor-pointer"
              >
                View target manifest
              </button>
              <span className="font-mono text-xs text-[#A6B4B2]">
                android.permission.INTERNET — OMITTED BY DESIGN
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 border border-[#263638]">
            <div className="px-4 py-3 border-b border-[#263638] bg-[#152426]">
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#A6B4B2]">
                TARGET ENGINEERING STACK
              </span>
            </div>
            <ul className="divide-y divide-[#263638]">
              {STACK_ITEMS.map((item) => (
                <li
                  key={item.name}
                  className="px-4 py-3.5 flex items-baseline justify-between gap-4"
                >
                  <span className="font-mono text-xs sm:text-sm font-medium text-[#F4F2EC]">
                    {item.name}
                  </span>
                  <span className="font-mono text-[11px] text-[#A6B4B2] text-right">
                    {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Target AndroidManifest.xml Modal */}
      <Modal
        open={manifestOpen}
        onClose={() => setManifestOpen(false)}
        eyebrow="ANDROID MANIFEST COMMITMENT"
        title="Target AndroidManifest.xml"
        dark
      >
        <div className="border border-[#263638] bg-[#091213] p-4 overflow-x-auto">
          <pre className="font-mono text-xs sm:text-[13px] leading-relaxed text-[#F4F2EC]">
            <code>
              {`<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="org.aurapph.field">

    <!-- Required hardware access -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.VIBRATE" />

    <!-- Explicitly excluded at build time -->\n`}
              <span className="line-through text-[#B81D24] bg-[#B81D24]/15 px-1">
                {`    <uses-permission android:name="android.permission.INTERNET" />`}
              </span>
              {`\n    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"
        tools:node="remove" />

    <application
        android:allowBackup="false"
        android:usesCleartextTraffic="false"
        android:label="AuraPPH" />
</manifest>`}
            </code>
          </pre>
        </div>
        <p className="mt-4 font-mono text-xs text-[#A6B4B2] leading-relaxed">
          Target manifest — design commitment. Replaced by the real manifest at APK release.
        </p>
      </Modal>
    </section>
  );
};
