export function camel(str) {
    const camel = (str || "").replace(/-([^-])/g, (g) => g[1].toUpperCase());

    return capitalize(camel);
}

export function camelActual(str) {
    return (str || "").replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}

export function kebab(str) {
    return (str || "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export function capitalize(str) {
    str = str || "";

    return `${str.substr(0, 1).toUpperCase()}${str.slice(1)}`;
}

export function getLongId(id) {
    // btoa() but for node
    return Buffer.from(`gid://shopify/Product/${id}`, "binary").toString(
        "base64"
    );
}

export function findProduct(store, id) {
    return store.state.store.products.find((p) => p.id === id);
}

export function isOnSale(variants) {
    return variants.some((variant) => {
        return parseFloat(variant.price) < parseFloat(variant.compareAtPrice);
    });
}

export function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

export function randomString(length = 5) {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

export function getMathRandom(length) {
    return Math.floor(
        Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    );
}

// Must be called in Vue context
export function goTo(id) {
    this.$vuetify.goTo(id).then(() => {
        if (!id) {
            return (document.location.hash = "");
        }

        if (history.replaceState) {
            history.replaceState(null, null, id);
        } else {
            document.location.hash = id;
        }
    });
}

export function ConvertTime(seconds) {
    let timestamp = {seconds: seconds, nanoseconds: 0}
    return new Date(timestamp.seconds * 1000)
}

export function sidebarfilter(navitems) {
    let name = navitems.map(el => el.permission).filter(a => a !== undefined)
    let items = navitems.map(el => el.items).filter(a => a !== undefined)
    let arr = []
    for (let i = 0; i < items.length; i++) {
        arr.push(...items[i])
    }
    let q = []
    for (let i = 0; i < arr.length; i++) {

        q.push(arr[i].permission)
    }
    let s = q.filter(a => a !== undefined)
    return [...s, ...name]
}

export function navfilter(permission) {
    let permissions = JSON.parse(localStorage.getItem('user_permissions'))

    if (permissions !== null || permissions !== '' || typeof permissions !== "undefined") {
        let index
        if (permissions.indexOf(permission) > -1) {
            index = permission
        } else {
            index = false
        }
        return index
    }
}
