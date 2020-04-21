import AppBar from '@material-ui/core/AppBar'
import Link from '@material-ui/core/Link'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      marginLeft: 16,
    },
  }),
)

interface Props {
  title: string
}

const Header = ({title}: Props) => {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Link color="inherit" href="/lab">
          laboratórium
        </Link>
        <Link color="inherit" href="/create-lab-result" className={classes.link}>
          nová mriežka
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Header
