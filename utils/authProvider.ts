// from https://marmelab.com/react-admin/Tutorial.html
// TODO the admin login info needs to be stored in cookies instead of localstorage (to avoid XSS vulnerabilities)
export default {
  // called when the user attempts to log in
  login: ({username, password}) => {
    localStorage.setItem('admin-header', btoa(`${username}:${password}`))
    return Promise.resolve()
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem('admin-header')
    return Promise.resolve()
  },
  // called when the API returns an error
  checkError: ({status}) => {
    console.log('check error!')
    if (status === 401 || status === 403) {
      localStorage.removeItem('admin-header')
      return Promise.reject()
    }
    return Promise.resolve()
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => (localStorage.getItem('admin-header') ? Promise.resolve() : Promise.reject()),
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () =>
    localStorage.getItem('admin-header') ? Promise.resolve() : Promise.reject(),
}
