import type { VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  framework: 'vite',
  ignoreCommand:
    "git diff HEAD^ HEAD --quiet -- . ':(exclude)**/*.md' ':(exclude).gitignore'",
  outputDirectory: 'dist',
  headers: [
    {
      source: '/v1/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
