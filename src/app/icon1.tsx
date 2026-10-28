import { ImageResponse } from 'next/og';

// PNG favicons next to icon.svg. Google asks for a favicon whose side is a multiple of 48px and shows it in search
// results; 48 and 192 cover that and the Android home screen. Image routes cannot read CSS tokens, so the colours
// repeat the ink, bone and hot values of src/styles/tokens.css.
const SIZES = [48, 192] as const;

export function generateImageMetadata() {
  return SIZES.map((side) => ({
    id: String(side),
    size: { width: side, height: side },
    contentType: 'image/png',
  }));
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const side = Number(await id);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: '#11100E',
          color: '#EBE7DD',
          fontSize: Math.round(side * 0.42),
          fontWeight: 700,
          fontFamily: 'monospace',
          borderRadius: Math.round(side * 0.22),
        }}
      >
        RB
        <div
          style={{
            position: 'absolute',
            top: Math.round(side * 0.16),
            right: Math.round(side * 0.16),
            width: Math.round(side * 0.14),
            height: Math.round(side * 0.14),
            borderRadius: side,
            background: '#FF4A1C',
          }}
        />
      </div>
    ),
    { width: side, height: side },
  );
}
