/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/widget",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://imunisinos.com.br https://www.imunisinos.com.br",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
