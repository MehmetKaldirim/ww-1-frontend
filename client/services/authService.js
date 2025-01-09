import apiClient from "./apiClient";

export const signUp = async ({ name, email, password }) => {
    const params = {
        name,
        email,
        password
    };

    return await apiClient.post('auth/signup/', params);
};


export const signIn = async ({ name, email, password }) => {
    const params = {
        name,
        email,
        password
    };

    return await apiClient.post('auth/signin/', params);
};

export const checkToken = async () => {
    return apiClient.get('auth/check');
};
