import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';

import { createBrand } from '../../actions/brand';

class Brand extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      logo: '',
    };

    this.doSubmit = this.doSubmit.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changePicture = this.changePicture.bind(this);
  }

  changeName(event) {
    this.setState({ name: event.target.value });
  }

  changePicture(event) {
    const files = event.target.files;
    if (files.length > 0) {
      this.setState({
        logo: files[0],
      });
    }
  }

  doSubmit(e) {
    this.props.dispatch(createBrand({
      name: this.state.name,
      logo: this.state.logo,
    }, this.props.history)); // eslint-disable-line
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h1 className="page-title">品牌</h1>
        <Form onSubmit={this.doSubmit}>
          <FormGroup>
            <Label for="name">品牌名称</Label>
            <Input type="text" value={this.state.name} onChange={this.changeName} id="name" placeholder="请输入品牌名称" />
          </FormGroup>
          <FormGroup>
            <Label for="picture">品牌图片</Label>
            <Input type="file" id="picture" accept="image/*" onChange={this.changePicture} />
            <FormText color="muted">
              选择品牌封面图片
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
    isFetching: state.brand.isFetching,
    errorMessage: state.brand.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Brand));
