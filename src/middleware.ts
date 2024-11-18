// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoutes = createRouteMatcher(['/dashboard(.*)', '/api/payment', '/payment(.*)']);
// export default clerkMiddleware(async (auth, req) => {
//     if (isProtectedRoutes(req)) {
//         const authObject = await auth();
//         authObject.redirectToSignIn();
//     }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };



import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000']

const isProtectedRoutes = createRouteMatcher(['/dashboard(.*)', '/payment(.*)'])
export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth()
  
  if (isProtectedRoutes(req) && !authObject.userId) {
    // Redirect to sign-in page if user is not authenticated
    return NextResponse.redirect('/sign-in')
  }
  
  // Continue to the requested route if authenticated or not protected
  return NextResponse.next()
})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}