import Script from 'next/dist/client/script';
import styles from "./navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data }: any = useSession();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__brand} id="title"></div>
      
      <Script id="title-script" strategy="lazyOnload">
        {`document.getElementById('title').innerHTML = 'MyApp';`}
      </Script>

      <div className={styles.navbar__auth}>
        {data ? (
          <>
            <div className={styles.navbar__user}>
              Welcome, {data.user?.fullname}
              {data.user?.image && (
                <Image
                  src={data.user.image}
                  alt={data.user.fullname || "User Profile"}
                  className={styles.navbar__user__image}
                  width={50}
                  height={50}
                />
              )}
            </div>
            <button
              className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`}
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            className={`${styles.navbar__button} ${styles["navbar__button--primary"]}`}
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;