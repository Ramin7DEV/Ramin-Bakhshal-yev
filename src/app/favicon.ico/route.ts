// Browsers, crawlers and link previews still ask for /favicon.ico by habit; the icon is icon.svg
export function GET(request: Request) {
  return Response.redirect(new URL('/icon.svg', request.url), 308);
}
