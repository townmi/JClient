import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';

import { createGoods } from '../../actions/goods';
import { getGoodsTypeList } from '../../actions/goodsType';

class Goods extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    goodsTypeList: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      sku: '',
      price: '',
      description: '',
      picture: '',
      type: '',
    };

    this.doSubmit = this.doSubmit.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeSku = this.changeSku.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changePicture = this.changePicture.bind(this);
    this.changeType = this.changeType.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getGoodsTypeList({}));
  }

  changeName(event) {
    this.setState({ name: event.target.value });
  }

  changeSku(event) {
    this.setState({ sku: event.target.value });
  }

  changePrice(event) {
    this.setState({ price: event.target.value });
  }

  changeDescription(event) {
    this.setState({ description: event.target.value });
  }

  changePicture(event) {
    const files = event.target.files;
    if (files.length > 0) {
      this.setState({
        picture: files[0],
      });
    }
  }

  changeType(event) {
    this.setState({ type: event.target.value });
  }

  doSubmit(e) {
    this.props.dispatch(createGoods({
      name: this.state.name,
      sku: this.state.sku,
      price: this.state.price,
      description: this.state.description,
      picture: this.state.picture,
      type: this.state.type,
    }, this.props.history)); // eslint-disable-line
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h1 className="page-title">产品</h1>
        <Form onSubmit={this.doSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="name">产品名称</Label>
                <Input type="text" value={this.state.name} onChange={this.changeName} id="name" placeholder="请输入产品名称" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="price">产品类型</Label>
                <Input type="select" onChange={this.changeType} id="type">
                  <option value="">请选择货物的类型</option>
                  {
                    this.props.goodsTypeList.map(cell => (
                      <option key={cell.id} value={cell.id}>{cell.name}</option>
                    ))
                  }
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="sku">产品SKU码</Label>
                <Input type="text" value={this.state.sku} onChange={this.changeSku} id="sku" placeholder="请输入产品SKU码" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="price">产品价格</Label>
                <Input type="number" value={this.state.price} onChange={this.changePrice} id="price" placeholder="请输入产品价格" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="description">产品描述</Label>
            <Input type="textarea" value={this.state.description} onChange={this.changeDescription} id="请输入产品描述" />
          </FormGroup>
          <FormGroup>
            <Label for="picture">产品图片</Label>
            <Input type="file" id="picture" accept="image/*" onChange={this.changePicture} />
            <FormText color="muted">
              选择产品封面图片
            </FormText>
          </FormGroup>
          {
            this.props.errorMessage && ( // eslint-disable-line
              <Alert className="alert-sm" color="danger">
                {this.props.errorMessage}
              </Alert>
            )
          }
          <Button color="primary" block>提交</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.goods.isFetching,
    errorMessage: state.goods.errorMessage,
    goodsTypeList: state.goodsType.goodsTypeList,
    // newGoods: state.goods.newGoods,
  };
}

export default withRouter(connect(mapStateToProps)(Goods));
