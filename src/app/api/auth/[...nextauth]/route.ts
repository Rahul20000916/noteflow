import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/db";

console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
     
    }),
  ],
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ profile }) {
      try {
        await handleProfile(profile);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});

async function handleProfile(profile :any) {
  try {
    const {email , name} = profile;
    let semail: string = email.toString();
    let sname: string = name.toString();

   const verifyUser = await db.users.findUnique({
    where: {
      email: semail
    },
   })
   if(!verifyUser){
    const user = await db.users.create({
      data:{
        email: semail ?? '',
        name: sname ?? '',
      }
    });
   }
  } catch (error) {
    console.error('Error handling profile:', error);
  }
}


export { handler as GET, handler as POST };
