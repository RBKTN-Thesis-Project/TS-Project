import React, { Component } from "react";
import { connect } from "react-redux";
import { addInfo } from "../../../actions/cvActions";

import { Form, FormGroup, Col, Label, Button, Input, Alert } from "reactstrap";

class PersonalInfoForm extends Component {
  state = {
    displayInformation: {},
    key: 1
  };

  handleSubmit = e => {
    e.preventDefault();
    let newInformation = new FormData();
    newInformation.append("photo", document.getElementById("photo").files[0]);
    newInformation.append(
      "nationality",
      document.getElementById("nationality").value
    );
    newInformation.append("gender", document.getElementById("gender").value);
    newInformation.append(
      "expertise",
      document.getElementById("expertise").value
    );
    newInformation.append(
      "location",
      document.getElementById("locationUser").value
    );
    newInformation.append("phone", document.getElementById("phone").value);

    const id = this.props.cvUser[0].user_id;
    //console.log(id);
    this.props.addInfo(id, newInformation);
    this.setState({ displayInformation: [] });
  };

  renderForm = () => {
    return (
      <Form
        encType="multipart/form-data"
        id={this.state.key}
        onSubmit={this.handleSubmit}
        key={this.state.key}
      >
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="diploma">Photo</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="file" id="photo" name="photo" accept="image/*" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="phone">Phone Number</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="phone" id="phone" name="phone" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="gender">Gender</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="select" name="gender" id="gender" bsSize="sm">
              <option value="Male">Male </option>
              <option value="Female">Female</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="nationality">Nationality</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text" id="nationality" name="nationality" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="location">Location</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text" id="locationUser" name="location" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md="3">
            <Label htmlFor="start">Experience Level </Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="select" name="expertise" id="expertise" bsSize="sm">
              <option value="Junior">Junior </option>
              <option value="Senior">Senior</option>
              <option value="Expert">Expert</option>
            </Input>
          </Col>
        </FormGroup>

        <Button
          type="submit"
          size="sm"
          color="primary"
          onSubmit={this.handleSubmit}
        >
          Add to my profil
        </Button>
      </Form>
    );
  };

  renderNewForm() {
    const informationForms = this.state.displayInformation;
    informationForms[this.state.key] = this.renderForm();
    this.setState({
      displayInformation: informationForms
    });
  }
  render() {
    return (
      <div>
        <div className="card animated fadeInLeft">
          <div className="card-body">
            <h3 className="card-title">My Informations</h3>
            <hr />
            <div>
              <button
                className="btn btn-info"
                onClick={this.renderNewForm.bind(this)}
              >
                Complete Personal information
              </button>
            </div>
          </div>
        </div>

        <div>{Object.values(this.state.displayInformation)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state;
};

export default connect(mapStateToProps, { addInfo })(PersonalInfoForm);