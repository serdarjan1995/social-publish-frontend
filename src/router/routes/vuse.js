export default [
    {
        params: {
            path: "/auth/login",
            name: "auth/LoginPage"
        },
        defaultComponentPath: "SocialMedia/Auth/Login",
    },
    {
        params: {
            path: "/auth/forgot",
            name: "auth/RestorePasswordPage"
        },
        defaultComponentPath: "SocialMedia/Auth/Restore",
    },
    {
        params: {
            path: "/auth/restore/:token",
            name: "auth/ResetPassword"
        },
        defaultComponentPath: "SocialMedia/Auth/Components/ResetPassword",
    },
    /*{
        params: {
            path: "/auth/signup",
            name: "auth/SignupPage"
        },
        defaultComponentPath: "SocialMedia/Auth/Register",
    },*/
    {
        params: {
            path: "/auth/verify/:uuID",
            name: "auth/VerifyPage",
        },
        defaultComponentPath: "SocialMedia/Auth/Verify",
    },
    {
        params: {
            path: "/callback/:provider",
            name: "social/CallBack"
        },
        defaultComponentPath: "SocialMedia/Social/Callback",
        navs: true,
    },
    {
        params: {
            path: "/auth/lock",
            name: "auth/LockScreenPage"
        },
        defaultComponentPath: "SocialMedia/Auth/Lock",
    },
    {
        params: {
            path: "/dashboard/operational",
            name: "dashboard/Operational",
        },
        defaultComponentPath: "SocialMedia/Dashboard/Operation/Operational",
        navs: true,
    },
    {
        params: {
            path: "/dashboard/analytical",
            name: "dashboard/Analytical",
        },
        defaultComponentPath: "SocialMedia/Dashboard/Analytic/Analytical",
        navs: true,
    },
    {
        params: {
            path: "/dashboard/admin",
            name: "dashboard/Admin",
        },
        defaultComponentPath: "SocialMedia/Dashboard/Admin/Admin",
        navs: true,
    },
    {
        params: {
            path: "/dashboard/media",
            name: "dashboard/Media",
        },
        defaultComponentPath: "SocialMedia/Dashboard/Media/Media",
        navs: true,
    },
    {
        params: {
            path: "/dashboard/shipment",
            name: "dashboard/Shipment",
        },
        defaultComponentPath: "SocialMedia/Dashboard/Shipment/Shipment",
        navs: true,
    },
    {
        params: {
            path: "/dashboard/traffic",
            name: "dashboard/Traffic",
        },
        defaultComponentPath: "SocialMedia/Dashboard/Traffic/Traffic",
        navs: true,
    },
    {
        params: {
            path: "/social/account_manager",
            name: "Accountmanager",
        },
        defaultComponentPath: "SocialMedia/Social/AccountManager",
        navs: true,
    },
    {
        params: {
            path: "/post_details/filemanager",
            name: "post_details/FileManager",
        },
        defaultComponentPath: "SocialMedia/Postdetails/FileManager",
        navs: true,
    },
    {
        params: {
            path: "/post_details/caption",
            name: "post_details/Caption",
        },
        defaultComponentPath: "SocialMedia/Postdetails/Caption",
        navs: true,
    },
    {
        params: {
            path: "/post_details/watermark",
            name: "post_details/Watermark",
        },
        defaultComponentPath: "SocialMedia/Postdetails/Watermark",
        navs: true,
    },
    {
        params: {
            path: "/post_details/bookmark",
            name: "post_details/Bookmark",
        },
        defaultComponentPath: "SocialMedia/Postdetails/Bookmark",
        navs: true,
    },
    /*For Admins*/
    {
        params: {
            path: "/social/accountmanager",
            name: "AccountManager",
        },
        defaultComponentPath: "SocialMedia/Social/AccountManager",
        navs: true,
    },
    {
        params: {
            path: "/proxy-manager",
            name: "ProxyManager",
        },
        defaultComponentPath: "SocialMedia/Admin/Proxy/ProxyManager",
        navs: true,
    },
    {
        params: {
            path: "/user_set/users",
            name: "user_set/Users",
        },
        defaultComponentPath: "SocialMedia/Admin/User/User",
        navs: true,
    },

    {
        params: {
            path: "/user_set/permissions",
            name: "user_set/Permissions",
        },
        defaultComponentPath: "SocialMedia/Admin/Permission/Permissions",
        navs: true,
    },
    {
        params: {
            path: "/user_set/roles",
            name: "user_set/Roles",
        },
        defaultComponentPath: "SocialMedia/Admin/Role/Roles",
        navs: true,
    },
    {
        params: {
            path: "/payment/list",
            name: "PaymentManager",
        },
        defaultComponentPath: "SocialMedia/Admin/Payment/Payment",
        navs: true,
    },
    {
        params: {
            path: "/settings/general",
            name: "settings/GeneralSettings",
        },
        defaultComponentPath: "SocialMedia/Admin/Settings/GeneralSettings",
        navs: true,
    },
    {
        params: {
            path: "/settings/social",
            name: "settings/SocialNetworkSettings",
        },
        defaultComponentPath: "SocialMedia/Admin/Settings/SocialNetworkSettings",
        navs: true,
    },
    {
        params: {
            path: "/settings/language",
            name: "settings/Language",
        },
        defaultComponentPath: "SocialMedia/Admin/Settings/Language",
        navs: true,
    },
    {
        params: {
            path: "/settings/cronjobs",
            name: "settings/CronJobs",
        },
        defaultComponentPath: "SocialMedia/Admin/Settings/CronJobs",
        navs: true,
    },
    /*Toolbar*/
    {
        params: {
            path: "/user/profile",
            name: "UserProfile",
        },
        defaultComponentPath: "SocialMedia/User/Profile",
        navs: true,
    },
    {
        params: {
            path: "/user/billing",
            name: "UserBilling",
        },
        defaultComponentPath: "SocialMedia/User/Billing",
        navs: true,
    },
    {
        params: {
            path: "/user/settings",
            name: "UserSettings",
        },
        defaultComponentPath: "SocialMedia/User/Settings",
        navs: true,
    },
    {
        params: {
            path: "/payment/makePayment",
            name: "MakePayment",
        },
        defaultComponentPath: "SocialMedia/Admin/Payment/Component/PaymentMake",
        navs: false,
    },
    {
        params: {
            path: "/ticket/userTicket",
            name: "ticket/UserTicket",
        },
        defaultComponentPath: "SocialMedia/Ticket/UserTicket",
        navs: true,
    },
    {
        params: {
            path: "/ticket/adminTicket",
            name: "ticket/AdminTicket",
        },
        defaultComponentPath: "SocialMedia/Ticket/AdminTicket",
        navs: true,
    },
    {
        params: {
            path: "/ticket/moderatorTicket",
            name: "ticket/ModeratorTicket",
        },
        defaultComponentPath: "SocialMedia/Ticket/ModeratorTicket",
        navs: true,
    },
];
