export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callback: {
        authorized({ auth, request }) {
            return false;
        },
    },
};