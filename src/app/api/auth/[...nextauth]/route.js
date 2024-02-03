import NextAuth from 'next-auth/next'
import {connectMongoDB} from "../../../../lib/mongoDb"
import User from "../../../../models/user"
import CredentialProviders from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'

export const authOptions = {
   providers: [
    CredentialProviders({
        name: "crdentials",
        credentials: {},
        async authorize(credentials){
            const {email, password} = credentials
            try {
                await connectMongoDB();
                const user = await User.findOne({email})
                if (!user) {
                    return null;
                }

               const verify = await bcrypt.compare(password, user.password)

               if(!verify){
                return null;
               }
               return user;
            } catch (error) {
                console.log("error");
            }
        
        }
    })
   ],
   session:{
    stratergy: "jwt"
   },
   secret: process.env.NEXTAUTH_SECRET,
   pages:{
    signIn: "/"
   }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST};