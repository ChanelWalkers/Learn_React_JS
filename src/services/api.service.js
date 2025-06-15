
import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        phone: phoneNumber,
        email: email,
        password: password,
    };
    return axios.post(URL_BACKEND, data)
}

const updateUserAPI = (_id, fullName, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phoneNumber,
    };
    return axios.put(URL_BACKEND, data);
}

const fetchAllUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND)
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;
    return axios.delete(URL_BACKEND);
}

const uploadFileAPI = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data",
        }
    }

    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file);

    return axios.post(URL_BACKEND, bodyFormData, config)
}

const updateUserAvatarAPI = (_id, fullName, phone, avatar) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        avatar: avatar,
        fullName: fullName,
        phone: phone,
    };
    return axios.put(URL_BACKEND, data);
}


const registerUserAPI = (fullName, email, password, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        phone: phoneNumber,
        email: email,
        password: password,
    };
    return axios.post(URL_BACKEND, data)
}

const loginAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: email,
        password: password,
        delay: 2000,
    }
    return axios.post(URL_BACKEND, data);
}

const getAccountAPI = () => {
    const URL_BACKEND = 'api/v1/auth/account';
    return axios.get(URL_BACKEND);
}

const logOutAPI = () => {
    const URL_BACKEND = 'api/v1/auth/logout';
    return axios.post(URL_BACKEND);
}

const fetchAllBookAPI = (current, pageSize) => {
    const URL_BACKEND = `api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const createBookAPI = (mainText, author, price, quantity, category, thumbnail) => {
    const URL_BACKEND = 'api/v1/book';
    const payload = {
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category,
    }
    return axios.post(URL_BACKEND, payload);
}

export {
    createUserAPI, fetchAllUserAPI, updateUserAPI,
    deleteUserAPI, uploadFileAPI, updateUserAvatarAPI,
    registerUserAPI, loginAPI, getAccountAPI,
    logOutAPI, fetchAllBookAPI, createBookAPI
}