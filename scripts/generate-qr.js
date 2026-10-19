import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';

const TARGET_URL = 'https://gustocoffee.uz/#menu';
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

async function generateQRCodes() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // 1. Generate High-Res PNG (1200x1200px, Error Correction H = 30%)
  const pngPath = path.join(PUBLIC_DIR, 'qr-menu.png');
  await QRCode.toFile(pngPath, TARGET_URL, {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 1200,
    margin: 2,
    color: {
      dark: '#13100D', // Gusto deep espresso
      light: '#FFFFFF', // Crisp white background for maximum contrast & camera scanning
    },
  });
  console.log(`Generated PNG QR Code: ${pngPath}`);

  // 2. Generate Brand Dark/Gold PNG QR Code for dark displays
  const pngDarkPath = path.join(PUBLIC_DIR, 'qr-menu-dark.png');
  await QRCode.toFile(pngDarkPath, TARGET_URL, {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 1200,
    margin: 2,
    color: {
      dark: '#C59853', // Gusto Gold
      light: '#0C0A08', // Deep Black
    },
  });
  console.log(`Generated Dark PNG QR Code: ${pngDarkPath}`);

  // 3. Generate Vector SVG QR Code (Infinite resolution for printing houses)
  const svgPath = path.join(PUBLIC_DIR, 'qr-menu.svg');
  const svgString = await QRCode.toString(TARGET_URL, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    color: {
      dark: '#13100D',
      light: '#FFFFFF',
    },
  });
  fs.writeFileSync(svgPath, svgString, 'utf-8');
  console.log(`Generated Vector SVG QR Code: ${svgPath}`);

  console.log(`Target URL encoded: ${TARGET_URL}`);
}

generateQRCodes().catch((err) => {
  console.error('Failed to generate QR codes:', err);
  process.exit(1);
});
