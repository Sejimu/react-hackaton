{
  cart.products.map((item) => (
    <TableRow
      key={item.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {item.title}
      </TableCell>
      <TableCell align="right">
        <img src={item.image} width={30} alt="" />
      </TableCell>
      <TableCell align="right">{item.category}</TableCell>
      <TableCell align="right">{item.price}</TableCell>
      <TableCell align="right">{item.subPrice.toFixed(2)}</TableCell>
      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          sx={{ color: "#D8D9DA" }}
          onClick={(e) => {
            if (item.count <= 1) {
              deleteProductFromCart(item.id);
            } else {
              decreaseCount(item.id);
            }
          }}
        >
          <RemoveIcon />
        </IconButton>
        <Typography component={"span"} variant="h6">
          {item.count}
        </Typography>
        <IconButton color="primary" onClick={(e) => increaseCount(item.id)}>
          <AddIcon sx={{ color: "#D8D9DA" }} />
        </IconButton>
      </TableCell>
    </TableRow>
  ));
}
