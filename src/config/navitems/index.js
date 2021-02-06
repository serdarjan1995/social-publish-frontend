import social from "@/config/navitems/social"
import accounting from "@/config/navitems/accounting"
import admin from "@/config/navitems/admin"
//import {sidebarfilter} from "@/utils/helpers"
/*function arrEquals(one) {
        let user_per = localStorage.getItem('user_permissions')
        let meta = one.map(el => el.meta)
        let per = meta.map(el => el.permission)
        let arr = [];
        for (let i = 0; i < user_per.length; i++) {
            if (user_per.indexOf(per.includes(user_per[i])) > -1) {
                let newObj = new Object()
                newObj.path = one[i].path
                newObj.name = one[i].name
                newObj.components = one[i].components
                newObj.meta = new Object()
                newObj.meta.permission = per[i]
                arr.push(newObj)
            }
        }
    console.log('user_per',per)
        return arr
}
let navitems = sidebarfilter([...social,...accounting,...admin])
*/




let navitems =[...social,...accounting,...admin]



export default navitems