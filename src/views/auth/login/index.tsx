import Link from "next/link";
import style from "../../auth/login/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const Tampilanlogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";
  const [error, setError] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError(res?.error || "Login failed");
      }
    } catch (error) {
      setIsLoading(false);
      setError("wrong email or password");
    }
  };

  return (
    <>
    <div className={style.login}>
      <h1 className={style.login__title}>Halaman login</h1>

      <div className={style.login__form}>
        {error && (
          <div style={{ color: "red", marginBottom: 16, textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={style.login__form__item}>
            <label className={style.login__form__item__label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={style.login__form__item__input}
              required
            />
          </div>

          {/* <div className={style.login__form__item}>
            <label className={style.login__form__item__label}>
              Fullname
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Fullname"
              className={style.login__form__item__input}
              required
            />
          </div> */}

          <div className={style.login__form__item}>
            <label className={style.login__form__item__label}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={style.login__form__item__input}
              required
            />
          </div>

          <button
            type="submit"
            className={style.login__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "login"}
          </button>
        

        <br /> <br />
        <button
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
            className={style.login__form__item__button}
            disabled={isLoading}
        >
        {isLoading ? "Loading..." : "sign in with google"}
        </button>
         <br /> <br />
        <button
            onClick={() => signIn("github", { callbackUrl, redirect: false })}
            className={style.login__form__item__button}
            disabled={isLoading}
        >
        {isLoading ? "Loading..." : "sign in with github"}
        </button>
        </form>


        <p className={style.login__form__item__text}>
          Tidak punya {"'"} akun? <Link href="/auth/register">Ke Halaman Register</Link>
        </p>
      </div>
    </div> 
    </>
  );
};

export default Tampilanlogin;