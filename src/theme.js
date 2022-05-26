export default class themeChanger {
    /**
     * @constructor
     */
    constructor() {}
    _addDarkTheme() {
        const darkThemeLinkEl = document.createElement('link')
        darkThemeLinkEl.setAttribute('rel', 'stylesheet')
        darkThemeLinkEl.setAttribute('href', '/main.css')
        darkThemeLinkEl.setAttribute('id', 'dark-theme-style')
        const docHead = document.querySelector('head')
        docHead.append(darkThemeLinkEl)
    }
    _removeDarkTheme() {
        const darkThemeLinkEl = document.querySelector('#dark-theme-style')
        if (darkThemeLinkEl){
            const parentNode = darkThemeLinkEl
            parentNode.remove()
        }
        
    }
    _darkThemeSwitch() {
        const darkThemeLinkEl = document.querySelector('#dark-theme-style')
        if (!darkThemeLinkEl) {
            this._addDarkTheme()
        } else {
            this._removeDarkTheme()
        }
    }
}