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
      "Four-way stretch in every direction, muscle compression that supports without restricting, and UV protection built into the fiber.",
    whyHeading: "In the collection",
    whyBody: "Used in the Noble Legging and Noble Sports Bra.",
  },
  NobleSoft: {
    heading: "NobleSoft",
    subheading: "Arya's natural performance blend",
    description:
      "A fiber blend with a silk-like hand from the first wear. Odor resistant. Thermoregulating.",
    whyHeading: "In the collection",
    whyBody: "Used in the Noble Tee.",
  },
  NobleDry: {
    heading: "NobleDry",
    subheading: "Arya's performance short fabric",
    description:
      "Quick-dry construction and four-way stretch.",
    whyHeading: "In the collection",
    whyBody: "Used in the Noble Short and Noble Pant.",
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
