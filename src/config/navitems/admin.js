export default [
    {
        header: "Admins", i18n: "Admins", menu_type: 'admin'
    },
    {
        id: 1,
        menu_type: 'admin',
        permission:'proxy_management_access',
        icon: "settings_input_composite",
        title: "Proxy manager",
        name: "ProxyManager",
        i18n: "Proxy manager"
    },
    {
        id: 2,
        menu_type: 'admin',
        title: "User management",
        permission:'user_managment_access',
        group: "user_set",
        icon: "people",
        i18n: "UserManagement",
        items: [
            {
                name: "users",
                permission:'users_access',
                title: "Users",
                prependIcon: "people",
                i18n: "Users",
            },
            {
                name: "permissions",
                permission:'permissions_access',
                title: "Permissions",
                prependIcon: "people",
                i18n: "Permissions",
            },
            {
                name: "roles",
                permission:'roles_access',
                title: "Roles",
                prependIcon: "people",
                i18n: "Roles",
            }
        ],
    },
    {
        id: 3,
        menu_type: 'admin',
        icon: "monetization_on",
        title: "Payment manager",
        name: "PaymentManager",
        permission:'payment_admin_access',
        i18n: "Payment manager"
    },
    {
        id: 4,
        menu_type: 'admin',
        title: "Settings",
        permission:'admin_settings_access',
        group: "settings",
        icon: "settings",
        i18n: "Settings",
        items: [
            {
                name: "GeneralSettings",
                permission:'admin_settings_general_access',
                title: "General settings",
                prependIcon: "settings",
                i18n: "General settings",
            },
            {
                name: "SocialNetworkSettings",
                permission:'admin_settings_social_access',
                title: "Social network settings",
                prependIcon: "settings",
                i18n: "Social network settings",
            },
            {
                name: "Language",
                permission:'admin_cron_jobs_access',
                title: "Language",
                prependIcon: "settings",
                i18n: "Language",
            },
            {
                name: "CronJobs",
                permission:'admin_cron_jobs_access',
                title: "CronJobs",
                prependIcon: "settings",
                i18n: "CronJobs",
            },
        ],
    },

];