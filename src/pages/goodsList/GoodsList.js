import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Table } from 'reactstrap';

import s from './Products.scss';
import { getGoodsList } from '../../actions/goods';

class GoodsList extends React.Component {

  static propTypes = {
    goodsList: React.PropTypes.arrayOf(React.PropTypes.object)
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.dispatch(getGoodsList({})); // eslint-disable-line
  }

  render() {
    return (
      <div className={s.root}>
        <Row>
          <h1 className="page-title">货品列表</h1>
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>货物名称</th>
                <th>货物的描述</th>
                <th>货物的价格</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.goodsList.map((cell, index) => (
                  <tr key={cell.id}>
                    <th scope="row">{ index + 1 }</th>
                    <td>{ cell.name }</td>
                    <td>{ cell.desc }</td>
                    <td>{ cell.price }</td>
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
    isFetching: state.goods.isFetching,
    errorMessage: state.goods.errorMessage,
    goodsList: state.goods.goodsList,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(GoodsList)));
