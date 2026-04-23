import { signUp } from "@/utils/db/servicefirebase";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // VALIDASI
    if (!email) {
      return res.status(400).json({ message: "Email wajib diisi" });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password minimal 6 karakter",
      });
    }

    await signUp(req.body, (result: { status: string; message: string }) => {
      if (result.status === "success") {
        res.status(200).json({ message: result.message });
      } else {
        res.status(400).json({ message: result.message });
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}