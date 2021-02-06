import Vue from 'vue'
export default Vue.mixin({
    methods: {
        can(permission) {
            let permissions = JSON.parse(localStorage.getItem('user_permissions'))

            if (permissions !== null || permissions !== '' || typeof permissions !== "undefined") {
                return permissions.indexOf(permission) > -1;
            }else{
                return false
            }
        }
    }
})