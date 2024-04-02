
const baseUrl = "https://175.41.165.127";

export function register({ fullname, phoneNumber, email, password, address }) {
    const data = {
        fullname,
        phoneNumber,
        email,
        password, address
    };
    return fetch(`${baseUrl}/register/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export async function login({ phoneNumber, password }) {
    return await fetch(`${baseUrl}/login/`, {
        method: "POST",
        body: JSON.stringify({ phoneNumber, password }),
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export async function verification({ id, otp }) {
    const data = {
        id, otp
    };
    return await fetch(`${baseUrl}/ActivateUser`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    });
}

//Users GET
export async function getUsers(isToken) {
    const res = await fetch(`${baseUrl}/users`, {
        method: "GET", headers: {
            Authorization: `Bearer ${isToken}`,
        }
    });
    if (!res.ok) throw new Error(data.message);
    const data = res.json();
    return data;
}

// User : GET // By Id 
export async function getUser(id, isToken) {
    const res = await fetch(`${baseUrl}/users/${id}`, {
        method: "GET", headers: {
            Authorization: `Bearer ${isToken}`,
        }
    });
    if (!res.ok) throw new Error(data.message);
    const data = res.json();
    return data;
}

//Stores : GET // By User ID
export async function getStoresByUserId(isToken, userId) {
    const res = await fetch(`${baseUrl}/Store?userId=${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${isToken}`,
        },
    });
    if (!res.ok) throw new Error(data.message)

    const data = await res.json()
    return data;
}

//Store : GET // By Id 
export async function getStore(isToken, id) {
    const res = await fetch(`${baseUrl}/Store/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${isToken}`,
        },
    });
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json()
    return data;
}


//Services : GET // By Store ID 
export async function getServices(isToken) {
    const res = await fetch(`${baseUrl}/Service`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${isToken}`,
        },
    });
    if (!res.ok) throw new Error(res.statusText)

    const data = await res.json()
    return data;
}

//Services : GET // By ID 
export async function getService(isToken, id) {
    const res = await fetch(`${baseUrl}/Service/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${isToken}`,
        },
    });
    if (!res.ok) throw new Error(res.statusText)
    const data = await res.json()
    return data;
}

//Services : POST // 
export async function postService(isToken, data) {
    return await fetch(`${baseUrl}/Service`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isToken}`,
        },
        body: JSON.stringify(data),
    });
}

//Services : PATCH // 
export async function patchService(isToken, id, data) {
    return await fetch(`${baseUrl}/Service/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isToken}`,
        },
        body: JSON.stringify(data),
    });
}





