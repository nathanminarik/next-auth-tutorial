// disable-tslint:page
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const options = {
  providers: [
    GitHubProvider({
      profile(profile: GithubProfile) {
        let userRole = 'Github User';
        console.log('Profile Github: ', profile);
        if (profile?.email === 'nathanminarik@gmail.com') {
          userRole = 'admin';
        }

        return {
          ...profile,
          id: profile.id.toString(), // Convert the id to string
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log('Profile Google: ', profile);
        let userRole = 'Google User';
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
