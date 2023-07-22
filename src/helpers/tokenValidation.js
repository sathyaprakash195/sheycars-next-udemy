import jwt from "jsonwebtoken";

export async function validateTokenAndGetUserId(request) {
  const token = request.cookies.get("token")?.value;
  try {
    if (!token) {
      throw new Error("No token found");
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.jwt_secret);
    const userId = decodedToken._id;

    return userId;
  } catch (error) {
    return error;
  }
}
