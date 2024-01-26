import clsx from "clsx";
import styles from "./Layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={
    clsx(styles.layout)
  }>{children}</div>;
}
