import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const columns = [
  { id: 'role_listing_id', label: 'Role Listing ID', minWidth: 170 },
  { id: 'role_name', label: 'Role Listing Name', minWidth: 100 },
  {
    id: 'role_listing_desc',
    label: 'Description',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'skills',
    label: 'Skills',
    minWidth: 170,
    align: 'right',
    format: (values: string[]) => values.join(', '),
  },
  {
    id: 'role_listing_source',
    label: 'Source',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'role_listing_close',
    label: 'Closing date',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

const rows = [
  {
      "role_listing_id": 1,
      "role_id": 2,
      "role_listing_desc": "Delivers diverse learning products, adapts facilitation for optimal outcomes, drives continuous learning, and evaluates curriculum effectiveness in various environments, while maintaining strong communication and stakeholder management skills.",
      "role_listing_source": 2,
      "role_listing_open": "2023-10-01T16:34:54",
      "role_listing_close": "2023-11-01T16:34:54",
      "role_listing_creator": 2,
      "role_listing_updater": null,
      "role_listing_ts_create": "2023-10-01T17:20:18",
      "role_listing_ts_update": null,
      "dept": "HUMAN RESOURCE AND ADMIN",
      "role_name": "Learning Facilitator / Trainer",
      "role_description": "The Learning Facilitator delivers learning products and services in a variety of environments, using multiple learning delivery modes and methods. He/She assesses learning needs and adapts the facilitation approach to reflect desired learning outcomes and learner needs. He is responsible for knowledge and skills transfer by delivering learning content, facilitating group discussions and responding to queries. He drives learner development and commitment to continuous learning by actively providing feedback and learner support. He evaluates curriculum effectiveness and recommends improvement areas by collecting learner feedback as well as analysing learning delivery approaches and materials.He is a strong communicator who builds trusted relationships and creates a cooperative and engaging learning environment. He is adaptable and adept at managing multiple stakeholders.He works in multiple different environments, including different learning venues and client sites, and regularly interacts with digital systems.",
      "skills": [
          "Python Programming"
      ]
  },
  {
      "role_listing_id": 2,
      "role_id": 3,
      "role_listing_desc": "Coaches teams in Agile practices, facilitates Agile methodologies, and acts as an effective Scrum Master for seamless implementation within the organization.",
      "role_listing_source": 2,
      "role_listing_open": "2023-10-01T16:34:54",
      "role_listing_close": "2023-11-01T16:34:54",
      "role_listing_creator": 2,
      "role_listing_updater": null,
      "role_listing_ts_create": "2023-10-01T17:20:18",
      "role_listing_ts_update": null,
      "dept": "HUMAN RESOURCE AND ADMIN",
      "role_name": "Agile Coach (SM)",
      "role_description": "The Agile Coach (SM) coaches teams in the conduct of Agile practices and the implementation of Agile methodologies and practices in the organisation and acts as an effective Scrum Master in Agile Scrum teams.",
      "skills": [
          "Python Programming",
          "Certified Scrum Master"
      ]
  },
  {
      "role_listing_id": 3,
      "role_id": 4,
      "role_listing_desc": "Responsible for testing fire safety equipment, implementing risk assessment recommendations, and ensuring safe evacuation during fire alarms or drills.",
      "role_listing_source": 2,
      "role_listing_open": "2023-10-01T16:34:54",
      "role_listing_close": "2023-11-01T16:34:54",
      "role_listing_creator": 2,
      "role_listing_updater": null,
      "role_listing_ts_create": "2023-10-01T17:20:18",
      "role_listing_ts_update": null,
      "dept": "HUMAN RESOURCE AND ADMIN",
      "role_name": "Fire Warden",
      "role_description": "The Fire Warden is responsible for testing fire alarms and firefighting equipment and implementing risk assessment recommendations. In the event of a confirmed fire alarm or fire drill, the warden assists in the safe evacuation of staff and visitors from the premise immediately.",
      "skills": [
          "Python Programming"
      ]
  }
]



export default function EditListings() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 1000 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'object'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}