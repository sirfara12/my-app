import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import style from "../../auth/register/register.module.scss";

const TampilanRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const onSubmitEvent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const fullname = formData.get("fullname") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullname, password }),
      });

      const result = await response.json();

      if (response.status === 200) {
        form.reset();
        push("/auth/login");
      } else {
        setError(
          response.status === 400 
            ? "Email already exists" 
            : "An error occurred"
        );
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.register}>
      <h1 className={style.register__title}>Halaman Register</h1>

      <div className={style.register__form}>
        {error && (
          <div style={{ color: "red", marginBottom: 16, textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={onSubmitEvent}>
          <div className={style.register__form__item}>
            <label className={style.register__form__item__label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={style.register__form__item__input}
              required
            />
          </div>

          <div className={style.register__form__item}>
            <label className={style.register__form__item__label}>
              Fullname
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Fullname"
              className={style.register__form__item__input}
              required
            />
          </div>

          <div className={style.register__form__item}>
            <label className={style.register__form__item__label}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={style.register__form__item__input}
              required
            />
          </div>

          <button
            type="submit"
            className={style.register__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>

        <br />

        <p className={style.register__form__item__text}>
          Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanRegister;