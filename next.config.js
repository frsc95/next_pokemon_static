/** @type {import('next').NextConfig} */

// declaramos dominios de donde se permitiran imagenes
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ['raw.githubusercontent.com']
  }
}

module.exports = nextConfig
