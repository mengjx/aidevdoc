/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // 如果部署在子路径，取消注释并设置 basePath
  // basePath: '',
};

export default nextConfig;
