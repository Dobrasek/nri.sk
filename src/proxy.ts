import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Web je verejný, chránia sa len samotné stupne členskej sekcie.
// `/clenstvo` (ponuka) aj `/clenstvo/dakujeme` zostávajú otvorené — ponuku má
// vidieť aj neprihlásený, inak nemá ako zistiť, čo si vlastne kupuje.
// `/api/clenstvo` tu zámerne nie je — `auth.protect()` by na neprihlásenom
// requeste vrátil redirect na prihlásenie a `fetch` z prehliadača by dostal HTML
// namiesto chyby. Route si prihlásenie overuje sama a vracia 401 v JSON.
const isProtectedRoute = createRouteMatcher([
  '/clenstvo/teoria(.*)',
  '/clenstvo/deti(.*)',
  '/clenstvo/dospeli(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
