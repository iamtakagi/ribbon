import { useLoaderData } from "@remix-run/react";
import { OAuth2Profile } from "remix-auth-oauth2";
import AuthMiddleware from "../authentication/AuthMiddleware";
import clsx from "clsx";
import styles from "./Header.module.css";

export default function Header() {
  const { profile } = useLoaderData<{
    profile: OAuth2Profile | null;
  }>();
  return (
    <header>
      <div className={clsx(styles.brand)}>ribbon</div>
      <AuthMiddleware
        authenticated={
          profile && (
            <div>
              <img
                src={profile.photos![0].value}
                alt={profile.displayName}
                width={"100px"}
              />
              <p>
                {profile.provider} アカウントで {profile.displayName}{" "}
                としてログイン中
              </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <a href="/auth/logout">ログアウト</a>
                <a href="/edit">記事を書く</a>
              </div>
            </div>
          )
        }
        notAuthenticated={
          <a href="/auth/login">記事を書くにはログインしてください</a>
        }
      />
    </header>
  );
}
