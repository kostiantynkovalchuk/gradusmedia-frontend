/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization configuration
  images: {
    // Allow images from these domains
    remotePatterns: [
      {
        // DALL-E images (OpenAI)
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        pathname: '/**',
      },
      {
        // Alternative DALL-E domain
        protocol: 'https',
        hostname: 'dalleprodsec.blob.core.windows.net',
        pathname: '/**',
      },
      {
        // Your backend/CDN (update with your actual domain)
        protocol: 'https',
        hostname: 'your-backend.render.com',
        pathname: '/**',
      },
      {
        // If you're using Cloudinary or similar
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        // If you're using AWS S3
        protocol: 'https',
        hostname: '*.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        // If you're using another CDN, add it here
        // protocol: 'https',
        // hostname: 'your-cdn-domain.com',
        // pathname: '/**',
      },
    ],
    
    // Image formats to support
    formats: ['image/avif', 'image/webp'],
    
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Image sizes for different layouts
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Disable static imports for better control
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  // Enable React strict mode for better error catching
  reactStrictMode: true,

  // Compress pages
  compress: true,

  // Generate sitemap and robots.txt
  // (These are handled by app/sitemap.ts and app/robots.ts)

  // Environment variables available to the browser
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://gradusmedia.org',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Headers for better security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache images
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
    ];
  },

  // Redirects (if needed)
  async redirects() {
    return [
      // Example: Redirect old URLs to new ones
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ];
  },

  // Rewrites (if needed for API proxy)
  async rewrites() {
    return [
      // Example: Proxy API requests to avoid CORS
      // {
      //   source: '/api/:path*',
      //   destination: 'https://your-backend.render.com/api/:path*',
      // },
    ];
  },
};

module.exports = nextConfig;
