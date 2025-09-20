import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // 로그인 후 리디렉션 URL 처리
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/google-login", // 커스텀 로그인 페이지
  },
};

export default NextAuth(authOptions);

// http://localhost:3000/api/auth/callback/google
// 754004498014-hji03upsjriqrbgv0k8ms6s1briad137.apps.googleusercontent.com
