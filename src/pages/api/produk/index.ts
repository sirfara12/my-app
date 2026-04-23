import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveProducts } from "../../../utils/db/servicefirebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await retrieveProducts("products");
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
