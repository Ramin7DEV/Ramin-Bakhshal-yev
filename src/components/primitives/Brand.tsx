import { Fragment } from 'react';

// English product and technology names inside Azerbaijani text. The page language is "az", and in Azerbaijani the
// capital of "i" is "İ", so uppercase labels turn "iOS" into "İOS" and "GitHub" into "GİTHUB". Marking the name as
// English gives it the English capitals. Only names with an "i" in them matter, so only those are listed.
const NAMES =
  /(iOS|iPadOS|iPhone|iPad|Android|GitHub|LinkedIn|SwiftUI|React Native|Redux Toolkit|TypeScript|JavaScript|Figma|i18next|Edge Functions?|Rate limit|AI-first|commit-?\w*)/;

export function Brand({ children }: { children: string }) {
  return children.split(NAMES).map((part, i) =>
    // split() with a capture group puts every match at an odd index
    i % 2 ? (
      <span key={i} lang="en">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
