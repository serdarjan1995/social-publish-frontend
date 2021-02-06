import general from "@/store/modules/general_settings/general"
import appearance from "@/store/modules/general_settings/appearance"
import file_manager from "@/store/modules/general_settings/file_manager"
import others from "@/store/modules/general_settings/others"
import social_pages from "@/store/modules/general_settings/social_pages"
import payment from "@/store/modules/general_settings/payment"
import notifications from "@/store/modules/general_settings/notifications"
import email_server from "@/store/modules/general_settings/email_server"
import email_template from "@/store/modules/general_settings/email_template"
import configure_proxies from "@/store/modules/general_settings/configure_proxies"
import oauth_login from "@/store/modules/general_settings/oauth_login"

export default {
    general,
    appearance,
    file_manager,
    others,
    social_pages,
    payment,
    notifications,
    email_server,
    email_template,
    configure_proxies,
    oauth_login
}