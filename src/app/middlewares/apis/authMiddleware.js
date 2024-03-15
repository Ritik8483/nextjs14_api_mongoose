const validateToken = (token) => {
  // const validToken = token?.length;
    const validToken = true;
  if (!token || !validToken) {
    return false;
  }
  return true;
};

export function authMiddleware(req) {
  console.log("authorization", req.headers.get("authorization"));
  const token = req.headers.get("Authorization")?.split(" ")[1];
  console.log("token : ", token);
  return { isValid: validateToken(token) };
}
