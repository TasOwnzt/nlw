import axios from "axios";

export const api = axios.create({
    // baseURL: 'https://nlw-journey.apidocumentation.com'
    baseURL: 'http://localhost:3333'
})