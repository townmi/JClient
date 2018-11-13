import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';

import { getGoodsTypeList, createGoodsType } from '../../actions/goodsType';

class GoodsType extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    goodsTypeList: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      picture: '',
      type: '',
    };

    this.doSubmit = this.doSubmit.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeType = this.changeType.bind(this);
    this.changePicture = this.changePicture.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getGoodsTypeList({}));
  }

  changeName(event) {
    this.setState({ name: event.target.value });
  }

  changeType(event) {
    this.setState({ type: event.target.value });
  }

  changePicture(event) {
    const files = event.target.files;
    if (files.length > 0) {
      this.setState({
        picture: files[0],
      });
    }
  }

  doSubmit(e) {
    this.props.dispatch(createGoodsType({
      name: this.state.name,
      type: this.state.type,
      picture: this.state.picture,
    }, this.props.history)); // eslint-disable-line
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h1 className="page-title">货物种类</h1>
        <Form onSubmit={this.doSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="name">货物种类名称</Label>
                <Input type="text" value={this.state.name} onChange={this.changeName} id="name" placeholder="请输入货物种类名称" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="type">货物种类类型</Label>
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
          <FormGroup>
            <Label for="picture">货物种类图片</Label>
            <Input type="file" id="picture" accept="image/*" onChange={this.changePicture} />
            <FormText color="muted">
              选择货物种类封面图片
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
    isFetching: state.goodsType.isFetching,
    errorMessage: state.goodsType.errorMessage,
    goodsTypeList: state.goodsType.goodsTypeList,
  };
}

export default withRouter(connect(mapStateToProps)(GoodsType));
