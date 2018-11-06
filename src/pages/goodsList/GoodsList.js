import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Row, Table, Button } from 'reactstrap';
import s from './Products.scss';

class GoodsList extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Row>
          <h1 className="page-title">Products</h1>
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
          <div>
            <Button color="primary">primary</Button>
          </div>
        </Row>
      </div>
    );
  }
}

export default (withStyles(s)(GoodsList));
