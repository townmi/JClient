import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router';

// an example of react-router code-splitting
/* eslint-disable */
import loadAnother from 'bundle-loader?lazy!../../pages/another/Another';
import loadGoodsList from 'bundle-loader?lazy!../../pages/goodsList/GoodsList';
import loadGoods from 'bundle-loader?lazy!../../pages/goods/Goods';
import loadBrand from 'bundle-loader?lazy!../../pages/brand/Brand';
import loadBrandList from 'bundle-loader?lazy!../../pages/brandList/BrandList';
import loadGoodsType from 'bundle-loader?lazy!../../pages/goodsType/GoodsType';
/* eslint-enable */

import s from './Layout.scss';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Bundle from '../../core/Bundle';

// Dashboard component is loaded directly as an example of server side rendering
import Dashboard from '../../pages/dashboard/Dashboard';

const AnotherBundle = Bundle.generateBundle(loadAnother);
const GoodsListBundle = Bundle.generateBundle(loadGoodsList);
const GoodsBundle = Bundle.generateBundle(loadGoods);
const BrandBundle = Bundle.generateBundle(loadBrand);
const BrandListBundle = Bundle.generateBundle(loadBrandList);
const GoodsTypeBundle = Bundle.generateBundle(loadGoodsType);

class Layout extends React.Component {

  static propTypes = {
    sidebarState: PropTypes.string.isRequired,
    sidebarPosition: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <Header toggleSidebar={this.toggleSidebar} />
        <div className={[s.wrap, this.props.sidebarState === 'hide' ? 'sidebar-hidden' : '', this.props.sidebarPosition === 'right' ? 'sidebar-right' : ''].join(' ')}>
          <Sidebar />
          <main className={[s.content].join(' ')}>
            <Switch>
              <Route path="/app" exact component={Dashboard} />
              <Route path="/app/another" exact component={AnotherBundle} />
              <Route path="/app/goods" exact component={GoodsListBundle} />
              <Route path="/app/goods/:id" exact component={GoodsBundle} />
              <Route path="/app/new/goods" exact component={GoodsBundle} />
              <Route path="/app/new/type" exact component={GoodsTypeBundle} />
              <Route path="/app/brand" exact component={BrandListBundle} />
              <Route path="/app/new/brand" exact component={BrandBundle} />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarState: store.navigation.sidebarState,
    sidebarPosition: store.navigation.sidebarPosition,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Layout)));

