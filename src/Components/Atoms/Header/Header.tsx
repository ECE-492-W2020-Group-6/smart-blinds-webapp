import React from "react";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Toolbar,
  IconButton,
  AppBar,
  Typography
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  });

interface Props extends WithStyles<typeof styles> {
  title: string;
}

const Header: React.FC<Props> = props => {
  const { classes, title } = props;
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withStyles(styles)(Header);
