import React, { Component } from "react";
import { Item, Input, Icon, Label } from "native-base";

class TextBox extends Component {
  render() {
    const { label, icon, onChange } = this.props;
    return (
      <Item floatingLabel>
        <Icon active name={icon} />
        <Label>{label}</Label>
        <Input onChangeText={(e) => onChange(e)} />
      </Item>
    );
  }
}

export default TextBox;
