export function debounce (cb, t) {
    let time = null
    return function () {
        if (time) {
            clearTimeout(time)
        }
        time = setTimeout(cb, t)
    } 
}