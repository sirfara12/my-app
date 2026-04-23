import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

// 🔹 GET ALL DATA
export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// 🔹 GET BY ID
export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  return snapshot.data();
}

// 🔹 LOGIN CREDENTIAL
export async function signIn(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data.length > 0 ? data[0] : null;
}

// 🔹 REGISTER
export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function,
) {
  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email),
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return callback({
      status: "error",
      message: "Email sudah ada",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    await addDoc(collection(db, "users"), {
      fullname: userData.fullname,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || "member",
      createdAt: new Date(),
    });

    callback({
      status: "success",
      message: "Register berhasil",
    });
  } catch (error) {
    callback({
      status: "error",
      message: "Gagal register",
    });
  }
}

export async function signInWithGoogle(userData: any, callback: any) {
  try {
    const q = query(
      collection(db, "users"),
      where("email", "==", userData.email),
    );

    const querySnapshot = await getDocs(q);
    const data: any = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data.length > 0) {
      userData.role = data[0].role; 

      await updateDoc(doc(db, "users", data[0].id), {
        ...userData,
        updatedAt: new Date(),
      });

      callback({
        status: true,
        message: "Login Google berhasil",
        data: userData,
      });
    } else {
      userData.role = userData.role || "member"; // default

      await addDoc(collection(db, "users"), {
        ...userData,
        createdAt: new Date(),
      });

      callback({
        status: true,
        message: "Register + Login Google berhasil",
        data: userData,
      });
    }
  } catch (error: any) {
    callback({
      status: false,
      message: "Gagal login Google",
    });
  }
}
  export async function signInWithGithub(userData: any, callback: any) {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", userData.email),
      );

      const querySnapshot = await getDocs(q);
      const data: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (data.length > 0) {
        // User sudah ada, update data
        userData.role = data[0].role;
        await updateDoc(doc(db, "users", data[0].id), userData);
        callback({
          status: true,
          message: "User registered and logged in with Github",
          data: userData,
        });
      } else {
        // User belum ada, buat data baru
        userData.role = "member";
        await addDoc(collection(db, "users"), userData);
        callback({
          status: true,
          message: "User registered and logged in with Github",
          data: userData,
        });
      }
    } catch (error: any) {
      // Tangani error di sini
      callback({
        status: false,
        message: "Failed to register user with Github",
      });
    }
  }
  export async function signInWithOAuth(provider: string, userData: any, callback: any) {
  try {
    const q = query(
      collection(db, "users"),
      where("email", "==", userData.email),
    );
    const querySnapshot = await getDocs(q);
    const data: any = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data.length > 0) {
      // User sudah ada, update data
      userData.role = data[0].role;
      await updateDoc(doc(db, "users", data[0].id), userData);
      callback({
        status: true,
        message: `User registered and logged in with ${provider}`,
        data: userData,
      });
    } else {
      // User belum ada, buat data baru
      userData.role = "member";
      await addDoc(collection(db, "users"), userData);
      callback({
        status: true,
        message: `User registered and logged in with ${provider}`,
        data: userData,
      });
    }
  } catch (error: any) {
    // Tangani error di sini
    callback({
      status: false,
      message: `Failed to register user with ${provider}`,
    });
  }
}
