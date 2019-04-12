/*
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function UsersTable(props) {
  const { classes,users } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>نام</CustomTableCell>
            <CustomTableCell align="right">نام خانوادگی</CustomTableCell>
            <CustomTableCell align="right">جنسیت</CustomTableCell>
            <CustomTableCell align="right">تاریخ تولد</CustomTableCell>
            <CustomTableCell align="right">شماره تلفن همراه</CustomTableCell>
            <CustomTableCell align="right">ایمیل</CustomTableCell>
            <CustomTableCell align="right">تحصیلات</CustomTableCell>
            <CustomTableCell align="right">مجرد/متاهل</CustomTableCell>
            <CustomTableCell align="right">نام کاربری</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(n => (
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">{n.firstName}</TableCell>
              <TableCell align="right">{n.lastName}</TableCell>
              <TableCell align="right">{n.sex===0?'زن':'مرد'}</TableCell>
              <TableCell align="right">{n.bDate}</TableCell>
              <TableCell align="right">{n.mobileNumber}</TableCell>
              <TableCell align="right">{n.email}</TableCell>
              <TableCell align="right">{n.education}</TableCell>
              <TableCell align="right">{n.maritalStatus===0?'مجرد':'متاهل'}</TableCell>
              <TableCell align="right">{n.userName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

UsersTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersTable);

*/
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';

const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily,
  },
  flexContainer: {
    direction: 'rtl',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    direction: 'rtl',
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc',
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
          {label}
        </TableSortLabel>
      ) : (
        label
      );

    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ cellContentRenderer = null, className, dataKey, ...other }, index) => {
              let renderer;
              if (cellContentRenderer != null) {
                renderer = cellRendererProps =>
                  this.cellRenderer({
                    cellData: cellContentRenderer(cellRendererProps),
                    columnIndex: index,
                  });
              } else {
                renderer = this.cellRenderer;
              }

              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classNames(classes.flexContainer, className)}
                  cellRenderer={renderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func,
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56,
};

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

function UsersTable(props) {
  const { users } = props;
  users.forEach(user =>{
    user.maritalStatus= user.maritalStatus===0?'مجرد':'متاهل';
    user.sex = user.sex===0?'زن':'مرد';
  })
  
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <WrappedVirtualizedTable
        rowCount={users.length}
        rowGetter={({ index }) => users[index]}
        onRowClick={event => console.log(event)}
        
        columns={[
          {
            width: 80,
            label: 'نام',
            dataKey: 'firstName',
          },
          {
            width: 120,
            flexGrow: 1.0,
            label: 'نام خانوادگی',
            dataKey: 'lastName',

          },
          {
            width: 120,
            label: 'جنسیت',
            dataKey: 'sex',
          },
          {
            width: 120,
            label: 'تاریخ تولد',
            dataKey: 'bDate',
            numeric: true,
          },
          {
            width: 120,
            label: 'شماره تلفن همراه',
            dataKey: 'mobileNumber',
            numeric: true,
          },
          {
            width: 120,
            label: 'ایمیل',
            dataKey: 'email',
          },
          {
            width: 120,
            label: 'تحصیلات',
            dataKey: 'education',

          },
          {
            width: 120,
            label: 'مجرد/متاهل',
            dataKey: 'maritalStatus',
          },
          {
            width: 120,
            label: 'نام کاربری',
            dataKey: 'userName',
          },          
        ]}
      />
    </Paper>
  );
}

export default UsersTable;