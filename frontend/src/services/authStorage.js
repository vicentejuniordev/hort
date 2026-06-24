const USERS_STORAGE_KEY = 'hort:users';
const CURRENT_USER_STORAGE_KEY = 'hort:current-user';

function getStoredUsers() {
  try {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  } catch {
    return [];
  }
}

function setCurrentUser(user) {
  const {
    id,
    name,
    email,
    phone = null,
    cnpj = null,
    role = 'client',
  } = user;
  localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify({
    id,
    name,
    email,
    phone,
    cnpj,
    role,
  }));
}

export function getCurrentUser() {
  try {
    const storedUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    if (!storedUser) return null;

    const currentUser = JSON.parse(storedUser);
    const persistedUser = getStoredUsers().find((user) => user.id === currentUser.id);

    return {
      ...currentUser,
      phone: currentUser.phone ?? persistedUser?.phone ?? null,
      cnpj: currentUser.cnpj ?? persistedUser?.cnpj ?? null,
    };
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
}

export function updateCurrentUser({ name, phone }) {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;
  const users = getStoredUsers();
  const updatedUser = { ...currentUser, name: name.trim(), phone: phone.trim() };
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users.map((user) => user.id === currentUser.id ? { ...user, ...updatedUser } : user)));
  setCurrentUser(updatedUser);
  return updatedUser;
}

async function hashPassword(password) {
  const encodedPassword = new TextEncoder().encode(password);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', encodedPassword);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function registerUser({ name, email, phone, password, role = 'client', cnpj }) {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error('Já existe uma conta cadastrada com este e-mail.');
  }

  const user = {
    id: window.crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    phone: phone.trim(),
    cnpj: cnpj?.trim() || null,
    role,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([...users, user]));
  setCurrentUser(user);

  return user;
}

export async function authenticateUser(identifier, password) {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const numericIdentifier = identifier.replace(/\D/g, '');
  const passwordHash = await hashPassword(password);
  const user = getStoredUsers().find(
    (storedUser) => (
      storedUser.email === normalizedIdentifier
      || storedUser.phone?.replace(/\D/g, '') === numericIdentifier
      || storedUser.cnpj?.replace(/\D/g, '') === numericIdentifier
    ) && storedUser.passwordHash === passwordHash,
  );

  if (user) setCurrentUser(user);

  return user ?? null;
}
