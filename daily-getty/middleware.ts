export { default } from "next-auth/middleware"

export const config = {
   matcher: ['/((?!api/database/|favicon.ico|auth/).*)']
}
 