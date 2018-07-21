import React from 'react'

import {
  Form,
  FormGroup,
  FormControl,
  Col,
  Button,
  ControlLabel
} from 'react-bootstrap'

import style from './style.scss'

export default class RocketChatModule extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      hostName: '',
      useSsl: '',
      BotName: '',
      Channel: '',
    }
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({
      [name]: value      
    })
  }

  handleSaveConfig = () => {
    console.log(this.state.hostName)
    console.log(this.state.useSsl)
    console.log(this.state.BotName)
    console.log(this.state.Channel)
  }


  // ----- render functions -----

  renderHeader = title => (
    <div className={style.header}>
      <h4>{title}</h4>
    </div>
  )

  renderLabel = label => {
    return (
      <Col componentClass={ControlLabel} sm={3}>
        {label}
      </Col>
    )
  }

  renderInput = (label, name, props = {}) => (
    <FormGroup>
      {this.renderLabel(label)}
      <Col sm={7}>
        <FormControl name={name} {...props}
          value={this.state[name]}
          onChange={this.handleChange} />
      </Col>
    </FormGroup>
  )

  renderTextInput = (label, name, props = {}) => this.renderInput(label, name, {
    type: 'text', ...props
  })

  renderTextAreaInput = (label, name, props = {}) => {
    return this.renderInput(label, name, {
      componentClass: 'textarea',
      rows: 2,
      ...props
    })
  }

  renderSaveButton = () => {
    return <Button
      className={style.formButton}
      onClick={this.handleSaveConfig}>
      Save
      </Button>
  }

  renderConfigSection = () => {
    return (
      <div className={style.section}>
        {this.renderHeader('Rocket.Chat Configuration')}

        {this.renderTextInput('HostName', 'hostname')}

        {this.renderTextInput('UseSsl', 'usessl')}

        {this.renderTextInput('BotName', 'botname')}

        {this.renderTextInput('Channel', 'channel')}

        {this.renderSaveButton()}
      </div>
    )
  }

  render() {
    return <Col md={10} mdOffset={1}>
      <Form horizontal>
        {this.renderConfigSection()}
      </Form>
    </Col>
  }
}
