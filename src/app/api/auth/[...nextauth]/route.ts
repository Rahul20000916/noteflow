import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/db";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      // clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      clientId: process.env.GOOGLE_CLIENT_ID ?? "921325980041-mnk3kn026apvt1n2191hhav4afs9vb52.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "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",
    }),
  ],
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
