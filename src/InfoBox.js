import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function InfoBox({ title, cases }) {
  return (
    <Card className="infoBOx">
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>

        <h2 className="infoBox_cases">{cases}</h2>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
