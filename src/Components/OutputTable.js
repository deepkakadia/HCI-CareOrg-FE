import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { TableHead, TableCell } from "@material-ui/core";

const row = (x, i, header) => (
  <TableRow key={`tr-${i}`}>
    {header.map((y, k) => (
      <TableCell key={`trc-${k}`}>{x[y.prop]}</TableCell>
    ))}
  </TableRow>
);

export default ({ data, header }) => (
  <div>
    <Table>
      <TableHead>
        <TableRow>
          {header.map((x, i) => (
            <TableCell key={`thc-${i}`}>{x.name}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{data.map((x, i) => row(x, i, header))}</TableBody>
    </Table>
  </div>
);
