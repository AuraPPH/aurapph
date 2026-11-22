import React from 'react';

const CONFOUNDERS = [
  {
    scenario: 'Amniotic fluid / urine dilution',
    effect: 'Stain looks paler and larger than the blood it carries',
    safeguard: 'OPTICS blood-signal index separates blood from clear fluids; the range widens and the ledger flags dilution',
  },
  {
    scenario: 'Dark clots sitting on the pad',
    effect: 'Area reads high while liquid penetration reads low',
    safeguard: 'Clots are counted in area, flagged in the ledger entry, and never silently converted to liquid volume',
  },
  {
    scenario: 'Folded or bunched pad',
    effect: 'True stain area is hidden inside the fold',
    safeguard: 'Capture quality check rejects the photo — retake flat. No estimate is produced',
  },
  {
    scenario: 'Boggy uterus, minimal pad staining',
    effect: 'Serious internal bleeding with almost nothing on the pad',
    safeguard: 'NOT CAPTURED by any photo. Vitals + uterine examination override the ledger and escalate regardless of the range',
  },
  {
    scenario: 'Blood pooling off-pad (sheet / drape / floor)',
    effect: 'Real loss that never reaches the photographed pad',
    safeguard: 'Not measured. The referral summary records it as unmeasured loss so the receiving facility is told',
  },
  {
    scenario: 'Calibration card missing or covered',
    effect: 'No scale, no white balance — any number would be invented',
    safeguard: 'GREY — Cannot Assess. The app refuses to estimate and asks for a retake with the card in frame',
  },
];

const CAPTURE_FAILURES = ['GLARE', 'MOTION BLUR', 'CARD MISSING', 'CARD COVERED', 'PAD FOLDED', 'TOO DARK'];

export const ScopeSection: React.FC = () => {
  return (
    <section
      id="scope"
      className="py-16 sm:py-20 border-b border-[#CFCAC0] bg-[#EAE6DC]"
      aria-labelledby="scope-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <p className="font-mono text-xs tracking-[0.14em] uppercase text-[#525855] mb-3">
          06 — SCOPE &amp; LIMITS
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <h2
            id="scope-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] font-normal text-[#141716] max-w-2xl"
          >
            What AuraPPH measures — <span className="italic">and what it cannot.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#525855] max-w-md leading-relaxed">
            A photograph of one pad is not a mother&apos;s total blood loss. This boundary is the
            design — stated before the judges have to ask.
          </p>
        </div>

        {/* Captured / Not captured / Always clinical */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#CFCAC0] mb-8">
          <div className="p-6 sm:p-8 border-r border-b border-[#CFCAC0] bg-[#F4F2EC]">
            <p className="font-mono text-[11px] font-semibold tracking-[0.12em] uppercase text-[#141716] mb-4">
              Captured
            </p>
            <ul className="space-y-2.5 text-sm text-[#525855] leading-relaxed">
              <li>Blood absorbed in the photographed pad — stain area, colour signal, penetration</li>
              <li>Every pad after it, added to one cumulative session ledger</li>
              <li>Vitals you enter — pulse, blood pressure, shock index</li>
              <li>Capture quality itself: glare, blur, card visibility</li>
            </ul>
          </div>
          <div className="p-6 sm:p-8 border-r border-b border-[#CFCAC0] bg-[#F4F2EC]">
            <p className="font-mono text-[11px] font-semibold tracking-[0.12em] uppercase text-[#B81D24] mb-4">
              Not captured
            </p>
            <ul className="space-y-2.5 text-sm text-[#525855] leading-relaxed">
              <li>Blood on bedding, drapes, the floor, or clothing</li>
              <li>Concealed bleeding — a boggy uterus with a near-clean pad</li>
              <li>Clots retained inside the uterus or vagina</li>
              <li>Loss before the first photographed pad</li>
            </ul>
          </div>
          <div className="p-6 sm:p-8 border-r border-b border-[#CFCAC0] bg-[#141716]">
            <p className="font-mono text-[11px] font-semibold tracking-[0.12em] uppercase text-[#F4F2EC] mb-4">
              Always clinical
            </p>
            <ul className="space-y-2.5 text-sm text-[#EAE6DC] leading-relaxed">
              <li>Uterine tone, ongoing bleeding rate, and shock signs outrank any photo</li>
              <li>A low range never clears a mother — there is no green state</li>
              <li>When in doubt, the E-MOTIVE bundle starts on clinical suspicion alone</li>
            </ul>
          </div>
        </div>

        {/* Confounder matrix */}
        <div className="border border-[#CFCAC0] bg-[#F4F2EC] overflow-x-auto mb-8">
          <div className="px-4 sm:px-6 py-3 border-b border-[#CFCAC0] bg-[#EAE6DC] flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs tracking-[0.1em] uppercase text-[#141716]">
              CONFOUNDERS &amp; FAILURE MODES — HOW EACH ONE IS HANDLED
            </span>
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#525855]">
              SPEC V0.1
            </span>
          </div>
          <table className="w-full border-collapse text-left min-w-[640px]">
            <thead>
              <tr className="border-b border-[#CFCAC0]">
                <th className="py-3 px-4 sm:px-6 font-mono text-[11px] tracking-[0.1em] uppercase text-[#525855] font-medium w-[24%]">
                  Scenario
                </th>
                <th className="py-3 px-4 sm:px-6 font-mono text-[11px] tracking-[0.1em] uppercase text-[#525855] font-medium w-[30%]">
                  What it does to the photo
                </th>
                <th className="py-3 px-4 sm:px-6 font-mono text-[11px] tracking-[0.1em] uppercase text-[#525855] font-medium">
                  TRIVENI safeguard
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CFCAC0]">
              {CONFOUNDERS.map((row) => (
                <tr key={row.scenario}>
                  <td className="py-3.5 px-4 sm:px-6 text-sm font-medium text-[#141716]">
                    {row.scenario}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-sm text-[#525855] leading-relaxed">
                    {row.effect}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-sm text-[#141716] leading-relaxed">
                    {row.safeguard}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Capture failure strip */}
        <div className="border border-[#141716] bg-[#F4F2EC] px-4 sm:px-6 py-4 mb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-[11px] font-semibold tracking-[0.12em] uppercase text-[#141716]">
              When the image cannot be trusted:
            </span>
            {CAPTURE_FAILURES.map((f) => (
              <span
                key={f}
                className="font-mono text-[10px] tracking-[0.08em] uppercase px-2 py-1 border border-[#CFCAC0] bg-[#EAE6DC] text-[#525855]"
              >
                {f}
              </span>
            ))}
            <span className="font-mono text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B81D24]">
              → GREY · No estimate — retake
            </span>
          </div>
          <p className="mt-2.5 text-sm text-[#525855] leading-relaxed">
            Capture rejection is a technical state, not a fifth clinical state — and retaking a
            photograph must never delay assessment or treatment when bleeding is a concern.
          </p>
        </div>

        {/* PHC deployment realities */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#CFCAC0]">
          <div className="p-6 border-r border-b border-[#CFCAC0] bg-[#F4F2EC]">
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#525855] mb-2">
              FIELD 01 — THE CARD
            </p>
            <h3 className="font-serif text-xl font-normal text-[#141716] mb-2">
              Printed anywhere, cleaned between mothers
            </h3>
            <p className="text-sm text-[#525855] leading-relaxed">
              The calibration card prints on ordinary A4 cardstock at any local shop for under ₹5,
              is laminated once, and is wiped with 0.5% sodium hypochlorite or an alcohol swab
              between patients.
            </p>
          </div>
          <div className="p-6 border-r border-b border-[#CFCAC0] bg-[#F4F2EC]">
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#525855] mb-2">
              FIELD 02 — THE PADS
            </p>
            <h3 className="font-serif text-xl font-normal text-[#141716] mb-2">
              Calibrated per pad type
            </h3>
            <p className="text-sm text-[#525855] leading-relaxed">
              Government-supply and commercial maternity pads absorb differently. The pad type is
              selected in-app, and each type carries its own bench calibration table — no
              one-size-fits-all constant.
            </p>
          </div>
          <div className="p-6 border-r border-b border-[#CFCAC0] bg-[#F4F2EC]">
            <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#525855] mb-2">
              FIELD 03 — THE HANDOFF
            </p>
            <h3 className="font-serif text-xl font-normal text-[#141716] mb-2">
              A referral summary that travels offline
            </h3>
            <div className="border border-[#CFCAC0] bg-[#EAE6DC] px-3.5 py-3 font-mono text-[11px] leading-relaxed text-[#141716]">
              REFERRAL — 14:05
              <br />
              CUMULATIVE: 530–680 ML · RED
              <br />
              PADS: 4 · VITALS: HR 112, SBP 88
              <br />
              GIVEN: MASSAGE · OXYTOCIN · TXA 13:52
              <br />
              UNMEASURED: POOLING ON SHEET — NOTED
            </div>
            <p className="mt-3 text-sm text-[#525855] leading-relaxed">
              When a mother is referred to a higher facility, the ledger becomes a plain-text
              summary — readable on paper, no network needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
