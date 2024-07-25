import createMiddleware from 'next-intl/middleware';
import { locales } from './navigation';

export default createMiddleware({
  defaultLocale: 'zh-CN',
  locales
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|zh-CN)/:path*']
};