import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method != "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    res.setHeader(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      path: "/",           // حتما همین مسیر باشه
      maxAge: 0,           // صفر یعنی حذف
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );
    return res.status(200).json({ message: "User Logged Out Successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
}

// localhost:port/api/auth/logout
