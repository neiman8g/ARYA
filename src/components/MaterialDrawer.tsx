"use client";

import { useEffect } from "react";
import Link from "next/link";

export type FabricType = "NobleFlex" | "NobleSoft" | "NobleDry";

const FABRIC_CONTENT: Record<
  FabricType,
  {
    heading: string;
    subheading: string;
    description: string;
    whyHeading: string;
    whyBody: string;
  }
> = {
  NobleFlex: {
    heading: "NobleFlex",
    subheading: "Arya's performance fabric",
    description:
      "NobleFlex is engineered for the body that moves. Four-way stretch in every direction, muscle compression that supports without restricting, and UV protection built into every fiber. Skin certified and free from the harmful dyes and chemicals found in standard synthetic fabrics.",
    whyHeading: "What most brands use instead",
    whyBody:
      "Conventional synthetic fabrics are made from virgin petroleum-based polymers that trap heat, cause skin irritation, and break down into microplastics with every wash. NobleFlex is engineered to a higher standard. Better for your skin. Better for your body. Better for the world you move in.",
  },
  NobleSoft: {
    heading: "NobleSoft",
    subheading: "Arya's natural performance blend",
    description:
      "NobleSoft is a natural fiber blend engineered to feel silk-like against your skin from the first wear. Naturally odor resistant so it stays fresh through every hour of your day. Thermoregulating so it works with your body temperature rather than against it. No synthetics touching your skin. Ever.",
    whyHeading: "What most brands use instead",
    whyBody:
      "Most performance tees are made from polyester, a petroleum-based plastic that traps odor, irritates skin, and never biodegrades. NobleSoft contains no petroleum-based synthetics against your skin. It is the natural alternative that performs better and feels better from the first wear.",
  },
  NobleDry: {
    heading: "NobleDry",
    subheading: "Arya's performance short fabric",
    description:
      "NobleDry is engineered for real movement. Quick-dry construction, four-way stretch, and durability that holds up to daily training. Lightweight enough for a run, structured enough for the table. Built to perform and built to last.",
    whyHeading: "What most brands use instead",
    whyBody:
      "Standard performance shorts are built from virgin synthetic fabrics that degrade quickly, pill after washing, and are made with chemical finishes that sit against your skin all day. NobleDry is engineered to a higher standard with no harmful chemical treatments and construction that outlasts the alternatives.",
  },
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  fabric: FabricType | null;
};

export default function MaterialDrawer({ isOpen, onClose, fabric }: Props) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!fabric) return null;

  const content = FABRIC_CONTENT[fabric];

  return (
    <>
      <div
        className="material-drawer-overlay"
        aria-hidden={!isOpen}
        onClick={onClose}
        data-open={isOpen}
      />
      <div
        className="material-drawer material-drawer-mobile"
        role="dialog"
        aria-modal="true"
        aria-label={`${content.heading} fabric information`}
        data-open={isOpen}
      >
        <div className="material-drawer-handle" aria-hidden />
        <div className="material-drawer-inner">
          <button
            type="button"
            className="material-drawer-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
          <div className="material-drawer-content">
            <h2 className="material-drawer-heading">{content.heading}</h2>
            <p className="material-drawer-subheading">{content.subheading}</p>
            <p className="material-drawer-desc">{content.description}</p>
            <h3 className="material-drawer-why-heading">{content.whyHeading}</h3>
            <p className="material-drawer-why-body">{content.whyBody}</p>
            <Link
              href="/arya-standard"
              className="material-drawer-link"
              onClick={onClose}
            >
              Learn more at The Arya Standard
            </Link>
          </div>
        </div>
      </div>
      <div
        className="material-drawer material-drawer-desktop"
        role="dialog"
        aria-modal="true"
        aria-label={`${content.heading} fabric information`}
        data-open={isOpen}
      >
        <div className="material-drawer-inner">
          <button
            type="button"
            className="material-drawer-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
          <div className="material-drawer-content">
            <h2 className="material-drawer-heading">{content.heading}</h2>
            <p className="material-drawer-subheading">{content.subheading}</p>
            <p className="material-drawer-desc">{content.description}</p>
            <h3 className="material-drawer-why-heading">{content.whyHeading}</h3>
            <p className="material-drawer-why-body">{content.whyBody}</p>
            <Link
              href="/arya-standard"
              className="material-drawer-link"
              onClick={onClose}
            >
              Learn more at The Arya Standard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
