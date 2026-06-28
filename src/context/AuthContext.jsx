import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

/* ════════════════════════════════════════════════════════ */
/*  PASSWORD HASHING UTILITIES                              */
/* ════════════════════════════════════════════════════════ */

async function generateSalt() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
}

async function hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const passwordBytes = encoder.encode(password);
    const saltBytes = Uint8Array.from(atob(salt), (c) => c.charCodeAt(0));

    const keyMaterial = await crypto.subtle.importKey("raw", passwordBytes, "PBKDF2", false, [
        "deriveBits",
    ]);

    const derivedBits = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: saltBytes,
            iterations: 100000,
            hash: "SHA-256",
        },
        keyMaterial,
        256
    );

    const hashArray = new Uint8Array(derivedBits);
    return btoa(String.fromCharCode(...hashArray));
}

async function verifyPassword(password, salt, storedHash) {
    const newHash = await hashPassword(password, salt);
    return newHash === storedHash;
}

function serializeHash(salt, hash) {
    return `${salt}:${hash}`;
}

function deserializeHash(serialized) {
    const [salt, hash] = serialized.split(":");
    return { salt, hash };
}

/* ════════════════════════════════════════════════════════ */
/*  LOCALSTORAGE HELPERS                                    */
/* ════════════════════════════════════════════════════════ */

function getStoredUsers() {
    try {
        return JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
        localStorage.setItem("users", "[]");
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

/* ════════════════════════════════════════════════════════ */
/*  AUTH PROVIDER                                           */
/* ════════════════════════════════════════════════════════ */

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(
        localStorage.getItem("currentUserEmail")
            ? { email: localStorage.getItem("currentUserEmail") }
            : null
    );

    async function signUp(email, password) {
        const users = getStoredUsers();
        const cleanEmail = email.trim().toLowerCase();

        if (users.find((u) => u.email === cleanEmail)) {
            return {
                success: false,
                error: "This email is already registered.",
            };
        }

        const salt = await generateSalt();
        const hash = await hashPassword(password, salt);
        const passwordHash = serializeHash(salt, hash);

        const newUser = {
            email: cleanEmail,
            passwordHash,
        };

        users.push(newUser);
        saveUsers(users);

        localStorage.setItem("currentUserEmail", cleanEmail);
        setUser({ email: cleanEmail });

        return {
            success: true,
            message: "Account created successfully.",
        };
    }

    async function login(email, password) {
        const users = getStoredUsers();
        const cleanEmail = email.trim().toLowerCase();

        const foundUser = users.find((u) => u.email === cleanEmail);

        if (!foundUser) {
            return {
                success: false,
                error: "Invalid email or password.",
            };
        }

        const { salt, hash: storedHash } = deserializeHash(foundUser.passwordHash);
        const isValid = await verifyPassword(password, salt, storedHash);

        if (!isValid) {
            return {
                success: false,
                error: "Invalid email or password.",
            };
        }

        localStorage.setItem("currentUserEmail", cleanEmail);
        setUser({ email: cleanEmail });

        return {
            success: true,
            message: "Logged in successfully.",
        };
    }

    function logout() {
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signUp, user, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
