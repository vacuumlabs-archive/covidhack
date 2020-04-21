const Lab = () => 'Redirect'

Lab.getInitialProps = ({res}) => {
  if (res) {
    res.writeHead(301, {
      Location: '/',
    })
    res.end()
  }

  return {}
}

export default Lab
