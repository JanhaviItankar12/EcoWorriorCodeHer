import bcrypt from "bcryptjs";
async function hashPassword() {
  const plainPassword = "admin123";
  const hashed = await bcrypt.hash(plainPassword, 10);
  console.log("Hashed Password:", hashed);
}

hashPassword();
