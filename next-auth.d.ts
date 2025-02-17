// next-auth.d.ts
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    realm?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    realm?: string;
  }
}
