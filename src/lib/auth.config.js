export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }) {
                if (user) {
                    token.id = user.id;
                    token.isAdmin = user.isAdmin;
                }
                return token;
            },
        async session({ session, token }) {
            if (token) {
                 session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
            }  
            
             
            return session;
        },
        authorized({ auth, request }) {
            const user = auth?.user;
            const isOnAdminPanel = request.NextUrl?.pathname.startsWith('./admin');
            const isOnBlogPage = request.NextUrl?.pathname.startsWith('/blog');
            const isOnLoginPage = request.NextUrl?.pathname?.startsWith('/login');


            

        },
    },

};
