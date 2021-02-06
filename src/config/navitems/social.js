import social_media_list from "@/config/navitems/social_media_list"

export default [
    {header: "Social", i18n: "Social", menu_type: 'social'},
    {
        id: 1,
        menu_type: 'social',
        title: "Dashboard",
        group: "dashboard",
        icon: "dashboard",
        i18n: "Dashboard",
        items: [
            {
                name: "Operational",
                permission:'dashboard_operational_access',
                title: "Operational",
                prependIcon: "dashboard",
                i18n: "Operational",
                icon: "mdi-monitor"
            },
            {
                name: "Analytical",
                permission:'dashboard_analytical_access',
                title: "Analytical",
                prependIcon: "dashboard",
                i18n: "Analytical",
                icon: "mdi-home-analytics"
            },
            {
                name: "Media",
                permission:'dashboard_media_access',
                title: "Media",
                prependIcon: "dashboard",
                i18n: "mediaAnalyse",
                icon: "mdi-web"
            },
            {
                name: "Admin",
                permission:'dashboard_admin_access',
                title: "Admin",
                prependIcon: "dashboard",
                i18n: "Admin",
                icon: "mdi-shield-account"
            },
            {
                name: "Shipment",
                permission:'dashboard_shipment_access',
                title: "Shipment",
                prependIcon: "dashboard",
                i18n: "shipment",
                icon: "mdi-ferry"
            }
        ],
    },
    {
        id: 2,
        menu_type: 'social',
        icon: "share",
        title: "Publish",
        name: "Publish",
        permission:'publish_access',
        i18n: "Publish"
    },
    {
        id: 3,
        menu_type: 'social',
        title: "Social",
        permission:'dashboard_social_post_access',
        group: "social-media",
        icon: "mdi-web",
        i18n: "Social",
        items: social_media_list,
    },
    {
        id: 4,
        menu_type: 'social',
        icon: "date_range",
        title: "Schedules",
        name: "Schedules",
        permission:'calendar_access',
        i18n: "Schedules"
    },
    {
        id: 5,
        menu_type: 'social',
        icon: "live_help",
        title: "Ticket",
        name: "Ticket",
        permission:'ticket_access',
        i18n: "Ticket"
    },
    {
        id: 6,
        menu_type: 'social',
        title: "Ticket",
        permission:'ticket_access',
        group: "ticket",
        icon: "live_help",
        i18n: "Ticket",
        items: [
            {
                name: "UserTicket",
                permission:'ticket_user_access',
                title: "UserTicket",
                prependIcon: "settings_input_svideo",
                i18n: "UserTicket",
            },
            {
                name: "AdminTicket",
                permission:'ticket_admin_access',
                title: "AdminTicket",
                prependIcon: "settings_input_svideo",
                i18n: "AdminTicket",
            },
            {
                name: "ModeratorTicket",
                permission:'ticket_moder_access',
                title: "ModeratorTicket",
                prependIcon: "settings_input_svideo",
                i18n: "ModeratorTicket",
            }
        ],
    },
    {
        id: 7,
        menu_type: 'social',
        icon: "recent_actors",
        title: "Account manager",
        name: "Accountmanager",
        permission:'social_account_access',
        i18n: "Account manager"
    },
    {
        id: 8,
        menu_type: 'social',
        title: "Post Details",
        group: "post_details",
        icon: "settings_input_svideo",
        i18n: "Post Details",
        items: [
            {
                name: "FileManager",
                permission:'user_profile_access',
                title: "FileManager",
                prependIcon: "settings_input_svideo",
                i18n: "FileManager",
            },
            {
                name: "Caption",
                permission:'dashboard_caption_access',
                title: "Caption",
                prependIcon: "settings_input_svideo",
                i18n: "Caption",
            },
            {
                name: "Watermark",
                permission:'dashboard_watermark_access',
                title: "Watermark",
                prependIcon: "settings_input_svideo",
                i18n: "Watermark",
            }
        ],
    }
]