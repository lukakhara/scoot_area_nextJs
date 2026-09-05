// next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';


const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts'); // ← must match your actual path exactly

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);