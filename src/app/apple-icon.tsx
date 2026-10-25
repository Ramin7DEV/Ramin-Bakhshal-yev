import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Home-screen icon: the same monogram as icon.svg. Image routes cannot read CSS tokens, so the values are literal.
export default function AppleIcon() {
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
          fontSize: 74,
          fontWeight: 700,
          fontFamily: 'monospace',
        }}
      >
        RB
        <div style={{ position: 'absolute', top: 30, right: 30, width: 24, height: 24, borderRadius: 12, background: '#FF4A1C' }} />
      </div>
    ),
    size,
  );
}
