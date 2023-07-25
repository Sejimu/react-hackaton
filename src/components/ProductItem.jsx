import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ProductItem({ item }) {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#176B87", color: "#dafffb" }}>
      <CardMedia sx={{ height: 140 }} image={item.photo} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.price}$
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.category}
        </Typography>
        <Typography variant="h6" color="text.dark">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ color: "#64CCC5" }}>
          Share
        </Button>
        <Button size="small" sx={{ color: "#64CCC5" }}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
