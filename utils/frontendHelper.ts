import download from 'downloadjs'
import qs from 'qs'

// there are limits to next.js code-splitting, and it can't handle
// requiring some files on both api routes and frontend

// turns out fetch-ing a file (with auth headers) isn't so straightforward
// this should do it - basically pasted together from following stackoverflows :hackerman:
// https://stackoverflow.com/questions/32545632/how-can-i-download-a-file-using-window-fetch
// https://stackoverflow.com/questions/40939380/how-to-get-file-name-from-content-disposition
// if this is too big of a hurdle, just remove the required authentication on backend
export const fetchFile = (url, headers, query) => {
  let filename = 'download' // fallback in case it's not parsed out
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
  fetch(`${url}${qs.stringify(query, {addQueryPrefix: true})}`, {
    headers,
  })
    .then(function(resp) {
      // try to read filename from Content-Disposition header
      const disposition = resp.headers.get('Content-Disposition')
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const matches = filenameRegex.exec(disposition)
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '')
        }
      }
      return resp.blob()
    })
    .then(function(blob) {
      download(blob, filename)
    })
}
