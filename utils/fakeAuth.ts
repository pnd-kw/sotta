export const fakeLogin = (username: string, password: string) => {
  if (username === "alfian_persie" && password === "rahasia") {
    const fakePayload = {
      username,
      role: "superadmin",
      exp: Math.floor(Date.now() / 1000) + 3600,
    };

    const base64Payload = btoa(JSON.stringify(fakePayload));
    const fakeToken = `fakeHeader.${base64Payload}.fakeSignature`;

    // localStorage.setItem("token", fakeToken);
    document.cookie = `token=${fakeToken}; path=/; max-age=3600`
    
    return fakePayload;
  }

  throw new Error("Username atau password salah");
};

export const parseFakeToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
    return payload;
  } catch (err) {
    console.error(err);
    return null;
  }
};
