export default [
    {
        params: {
            name: "social-media/Post",
            path: "/social-media/share/post/:any",
        },
        defaultComponentPath: "SocialMedia/Post/Post",
        navs: true,
    },
    {
        params: {
            name: "social-media/LiveStream",
            path: "/social-media/share/live-stream/:any",
        },
        defaultComponentPath: "SocialMedia/Post/LiveStream",
        navs: true,
    },
    {
        params: {
            name: "social-media/DirectMessage",
            path: "/social-media/share/direct-message/:any",
        },
        defaultComponentPath: "SocialMedia/Post/DirectMessage",
        navs: true,
    }
];