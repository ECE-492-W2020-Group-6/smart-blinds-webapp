import React from "react";
import { Theme, createStyles, withStyles, WithStyles } from "@material-ui/core";

import StatusPaper from "../../../Components/Molecules/StatusPaper";
import { IStats } from "../../../res/Interfaces";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(0)
    },
    title: {
      flexGrow: 1,
      padding: theme.spacing(2)
    }
  });

interface Props extends WithStyles<typeof styles> {
  stats: IStats;
}

const Splash: React.FC<Props> = props => {
  const { stats } = props;
  return (
    <React.Fragment>
      <StatusPaper stats={stats} />
    </React.Fragment>
  );
};

export default withStyles(styles)(Splash);
