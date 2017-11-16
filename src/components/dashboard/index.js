import React from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { Pagination } from '../../components';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 20,
      totalPages: 228,
      boundaryPagesRange: 1,
      siblingPagesRange: 1,
      hidePreviousAndNextPageLinks: false,
      hideFirstAndLastPageLinks: true,
      hideEllipsis: false
    };
    this.onPageChangeFromPagination = this.onPageChangeFromPagination.bind(this);
  }
  onPageChangeFromPagination(newPage) {
    this.setState({currentPage: newPage});
  }
  render() {
    return (
      <div>
        <AppBar
          title={<span style={{
              color: 'rgba(0, 0, 0, 0.4)',
            }}>Danh sách khách hàng</span>}
          iconStyleLeft={{display: 'none'}}
          style={{
            backgroundColor: '#e8e8e8',
            border: 'rgba(0, 0, 0, 0.12) 1px'
          }}
          iconElementRight={
            <MenuItem
              style={{
                color: '#009688',
                letterSpacing: '0px'
              }}
              leftIcon={
                <FontIcon
                  style={{
                    color: '#009688',
                  }}
                  className="material-icons"
                >refresh</FontIcon>}>
                REFRESH
            </MenuItem>
          }
        />
        <Table style={{color: 'rgba(0, 0, 0, 0.87)'}}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{paddingRight: '0px'}}>
                <span style={{float: 'left', lineHeight: '58px'}}>TÊN</span>
                <FontIcon style={{float: 'right', lineHeight: '58px'}} className="material-icons">keyboard_arrow_up</FontIcon>
              </TableHeaderColumn>
              <TableHeaderColumn>HỌ</TableHeaderColumn>
              <TableHeaderColumn>NHÓM</TableHeaderColumn>
              <TableHeaderColumn>KHOA | PHÒNG BAN</TableHeaderColumn>
              <TableHeaderColumn>CHỨC VỤ</TableHeaderColumn>
              <TableHeaderColumn>NGÀY KHỞI TẠO</TableHeaderColumn>
              <TableHeaderColumn>TRẠNG THÁI</TableHeaderColumn>
              <TableHeaderColumn style={{width: '30px'}}></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} stripedRows>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn style={{width: '30px'}}><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>Randal White</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>3</TableRowColumn>
              <TableRowColumn>Stephanie Sanders</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Steve Brown</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>5</TableRowColumn>
              <TableRowColumn>Christopher Nolan</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>Randal White</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>3</TableRowColumn>
              <TableRowColumn>Stephanie Sanders</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Steve Brown</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>5</TableRowColumn>
              <TableRowColumn>Christopher Nolan</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
              <TableRowColumn><FontIcon className="material-icons">mode_edit</FontIcon></TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
        <div style={{backgroundColor: '#fff', padding: '7px', fontSize: '14px', color: 'rgba(0, 0, 0, 0.87)'}}>
          <span style={{float: 'left', lineHeight: '50px'}}>200-210 of 2580</span>
          <div style={{float: 'right', display: 'inline-block', lineHeight: '50px'}}>
            <Pagination
              currentPage={this.state.currentPage}
              totalPages={this.state.totalPages}
              boundaryPagesRange={this.state.boundaryPagesRange}
              siblingPagesRange={this.state.siblingPagesRange}
              hidePreviousAndNextPageLinks={this.state.hidePreviousAndNextPageLinks}
              hideFirstAndLastPageLinks={this.state.hideFirstAndLastPageLinks}
              hideEllipsis={this.state.hideEllipsis}
              onChange={this.onPageChangeFromPagination}
            />
          </div>
          <div style={{clear: 'both'}} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
