import React, { useState } from 'react';
import { Modal } from './Modal';

const PHASES = [
  {
    phase: 'PHASE 01',
    title: 'Bench calibration (synthetic samples)',
    detail: 'Controlled dye/blood-substitute volumes across local maternity pad brands to build lookup tables.',
    status: 'PLANNED',
  },
  {
    phase: 'PHASE 02',
    title: 'Lab validation vs weighing + alkaline hematin test',
    detail: 'Blinded comparison against calibrated gravimetric mass and gold-standard alkaline hematin assay.',
    status: 'PLANNED',
  },
  {
    phase: 'PHASE 03',
    title: 'Hospital pilot (with ethics approval)',
    detail: 'Prospective observational evaluation alongside standard labour-room care after institutional ethics clearance.',
    status: 'FUTURE',
  },
];

export const ValidationSection: React.FC = () => {
  const [methodologyOpen, setMethodologyOpen] = useState(false);

  return (
    <section
      id="validation"
      className="py-16 sm:py-20 border-b border-[#CFCAC0]"
      aria-labelledby="validation-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#525855] mb-3">
          10 — PROOF, IN PROGRESS
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <h2
              id="validation-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] font-normal text-[#141716]"
            >
              Before claims, <span className="italic">measurements.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#525855] max-w-xl leading-relaxed">
              We publish zero accuracy numbers today because bench validation has not been executed
              yet. Every milestone below is tracked openly.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMethodologyOpen(true)}
            className="min-h-[44px] px-5 border border-[#141716] bg-[#F4F2EC] hover:bg-[#141716] hover:text-[#F4F2EC] text-[#141716] font-mono text-xs font-semibold tracking-[0.08em] uppercase transition-colors self-start lg:self-end cursor-pointer"
          >
            Methodology
          </button>
        </div>

        {/* 3-phase milestone track */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#CFCAC0]">
          {PHASES.map((item) => (
            <div
              key={item.phase}
              className="p-6 border-r border-b border-[#CFCAC0] bg-[#F4F2EC] flex flex-col justify-between gap-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#525855]">
                    {item.phase}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 border border-[#CFCAC0] bg-[#EAE6DC] text-[#141716]">
                    {item.status}
                  </span>
                </div>
                <h3 className="font-serif text-xl leading-snug text-[#141716] font-normal">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm text-[#525855] leading-relaxed">{item.detail}</p>
              </div>
              <p className="font-mono text-[11px] text-[#525855] pt-3 border-t border-[#CFCAC0]">
                DATA PUBLISHED: PENDING
              </p>
            </div>
          ))}
        </div>

        {/* Pre-registered protocol — fixed before data exists */}
        <div className="mt-8 border border-[#CFCAC0] bg-[#F4F2EC] overflow-x-auto">
          <div className="px-4 sm:px-6 py-3 border-b border-[#CFCAC0] bg-[#EAE6DC] flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs tracking-[0.1em] uppercase text-[#141716]">
              THE PRE-REGISTERED PROTOCOL — FIXED BEFORE ANY DATA EXISTS
            </span>
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#B81D24]">
              Status: Fixed · Not yet run
            </span>
          </div>
          <dl className="divide-y divide-[#CFCAC0] min-w-[560px]">
            {[
              ['Specimens', 'Synthetic blood simulant first, then goat/sheep blood in the VIT lab only. Maternity cotton pads across locally available brands. Period blood is never used — it is only ~36% blood and does not clot like postpartum loss.'],
              ['Volumes', '25–250 mL per pad in 25 mL steps, dispensed by volume and confirmed by weight.'],
              ['Capture matrix', 'Three phones including a 2 GB RAM budget device · daylight and dim room · flat and tilted captures · flash pair on every sample.'],
              ['Ground truth', 'Gravimetric weighing is primary (soaked minus dry mass). Alkaline hematin assay cross-checks a subset.'],
              ['Bias controls', 'Blinded operator who never sees the dispensed volume · results split by physical pad, never by photo · leave-one-phone-out analysis · nurse visual estimates recorded as the human baseline.'],
              ['Pre-registered metrics', 'Sensitivity at true 500 mL — headline target ≥90%. Kill rule, fixed now: below 85%, the word "amount" leaves the pitch. Range coverage and mean absolute error reported alongside.'],
            ].map(([term, def]) => (
              <div key={term} className="py-3.5 px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-12 gap-2">
                <dt className="sm:col-span-3 font-mono text-xs uppercase tracking-[0.06em] text-[#525855]">
                  {term}
                </dt>
                <dd className="sm:col-span-9 text-sm text-[#141716] leading-relaxed">{def}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The calibration card — a physical artifact judges can hold */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 border border-[#141716] bg-[#F4F2EC]">
          <div className="p-6 sm:p-8">
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#525855] mb-2">
              THE OTHER HALF OF THE METHOD
            </p>
            <h3 className="font-serif text-2xl font-normal text-[#141716] leading-snug">
              The calibration card is a physical artifact — print it and check us.
            </h3>
            <p className="mt-3 text-sm text-[#525855] leading-relaxed">
              Every measurement stands on this card: corner fiducials for scale, a greyscale ramp
              for white balance, a true-millimetre ruler to catch print scaling. Print at 100%,
              laminate matte, and verify the ruler before trusting a single reading.
            </p>
            <a
              href="/src/assets/calibration-card.svg"
              download="aurapph-calibration-card-v1.svg"
              className="mt-5 inline-flex min-h-[44px] px-5 items-center border border-[#141716] bg-[#141716] text-[#F4F2EC] hover:bg-[#B81D24] hover:border-[#B81D24] font-mono text-xs font-semibold tracking-[0.08em] uppercase transition-colors"
            >
              Download the card (SVG · 100 × 70 mm)
            </a>
          </div>
          <div className="bg-[#EAE6DC] border-t md:border-t-0 md:border-l border-[#141716] flex items-center justify-center p-6">
            <img
              src="/src/assets/calibration-card.svg"
              alt="AuraPPH calibration card v1 — corner fiducials, greyscale ramp and millimetre ruler"
              className="w-full max-w-[420px] h-auto border border-[#CFCAC0]"
            />
          </div>
        </div>

        {/* Visibly EMPTY results panel */}
        <div
          data-testid="validation-empty-results"
          className="mt-8 border border-dashed border-[#141716] bg-[#EAE6DC] p-8 sm:p-10 text-center"
        >
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#525855] mb-3">
            VALIDATION RESULTS LEDGER — EMPTY
          </p>
          <p className="font-serif text-xl sm:text-2xl text-[#141716] max-w-2xl mx-auto leading-snug">
            No results yet. Bench tests are scheduled before the January 2027 demo — numbers will be
            published here only after they exist.
          </p>
          <p className="mt-4 font-mono text-[11px] tracking-[0.08em] uppercase text-[#525855]">
            SENSITIVITY AT 500 mL: — · MEAN ABSOLUTE ERROR: — · N = 0
          </p>
        </div>
      </div>

      {/* Methodology Modal */}
      <Modal
        open={methodologyOpen}
        onClose={() => setMethodologyOpen(false)}
        eyebrow="BENCH & LAB VALIDATION PROTOCOL"
        title="Planned validation methodology"
      >
        <p className="text-sm text-[#525855] leading-relaxed mb-5">
          All numbers will be collected on standardized hardware before any clinical claims are made.
          The study design prioritizes detecting PPH onset at the 500 mL threshold.
        </p>

        <dl className="divide-y divide-[#CFCAC0] border-t border-b border-[#CFCAC0]">
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2">
            <dt className="sm:col-span-4 font-mono text-xs uppercase tracking-[0.06em] text-[#525855]">
              Test specimens
            </dt>
            <dd className="sm:col-span-8 text-sm text-[#141716]">
              Known fluid volumes applied to real, locally procured maternity pads across multiple
              absorption profiles and ambient lighting setups.
            </dd>
          </div>
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2">
            <dt className="sm:col-span-4 font-mono text-xs uppercase tracking-[0.06em] text-[#525855]">
              Primary ground truth
            </dt>
            <dd className="sm:col-span-8 text-sm text-[#141716]">
              Calibrated precision scale weighing (dry pad subtracted from soaked pad mass, converted
              with density factor).
            </dd>
          </div>
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2">
            <dt className="sm:col-span-4 font-mono text-xs uppercase tracking-[0.06em] text-[#525855]">
              Secondary assay
            </dt>
            <dd className="sm:col-span-8 text-sm text-[#141716]">
              Alkaline hematin spectrophotometric laboratory test performed on a random subset of
              pads to cross-check gravimetric measurements.
            </dd>
          </div>
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2">
            <dt className="sm:col-span-4 font-mono text-xs uppercase tracking-[0.06em] text-[#525855]">
              Bias control
            </dt>
            <dd className="sm:col-span-8 text-sm text-[#141716]">
              Blinded operator capturing flash/no-flash pairs without visibility into dispensed
              ground-truth volume.
            </dd>
          </div>
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2">
            <dt className="sm:col-span-4 font-mono text-xs uppercase tracking-[0.06em] text-[#525855]">
              Headline metric
            </dt>
            <dd className="sm:col-span-8 text-sm font-semibold text-[#141716]">
              Sensitivity at the 500 mL PPH diagnostic threshold, alongside bounded-range coverage
              rate.
            </dd>
          </div>
        </dl>
      </Modal>
    </section>
  );
};
