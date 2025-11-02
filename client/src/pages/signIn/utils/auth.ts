export interface SignInPayload {
    email: string;
    password: string;
}

export interface SignInResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

const API_URL = import.meta.env.VITE_API;

export async function signIn(payload: SignInPayload): Promise<SignInResponse> {
    const response = await fetch(`${API_URL}/auth/signIn`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Failed to sign in");
    }

    return response.json();
}
