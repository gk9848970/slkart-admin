import React from "react";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "27ch",
    },
  },
}));

const MyCard = ({ styles, children }) => {
  const classes = useStyles();
  return (
    <div style={{ margin: "auto" }}>
      <Card className={classes.root} style={styles}>
        {children}
      </Card>
    </div>
  );
};
export default MyCard;
