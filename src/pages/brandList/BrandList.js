import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Table } from 'reactstrap';

import { getBrandList } from '../../actions/brand';

class BrandList extends React.Component {

  static propTypes = {
    brandList: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.dispatch(getBrandList({})); // eslint-disable-line
  }

  render() {
    return (
      <div>
        <Row>
          <h1 className="page-title">品牌列表</h1>
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>品牌名称</th>
                <th>品牌Logo</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.brandList.map((cell, index) => (
                  <tr key={cell.id}>
                    <th scope="row">{ index + 1 }</th>
                    <td>{ cell.name }</td>
                    <td>{ cell.logo }</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Row>
      </div>
    );
  }

}


function mapStateToProps(state) {
  return {
    isFetching: state.brand.isFetching,
    errorMessage: state.brand.errorMessage,
    brandList: state.brand.brandList,
  };
}

export default withRouter(connect(mapStateToProps)(BrandList));
