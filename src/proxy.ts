import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Files at the root (icons, manifest) are served as they are; only pages get a language prefix
  matcher: ["/((?!api|_next|_vercel|icon1|apple-icon|.*\\..*).*)"],
};
