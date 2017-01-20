/**
 * Created by ebinhon on 1/20/2017.
 */
import React from 'react'
import CSSModules from 'react-css-modules'
import { Link, withRouter } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import RefreshIndicator from 'material-ui/RefreshIndicator';

import styles from '../style/components.scss'

const MUI_styles = {
  form: {
    position: 'relative',
  },
  buttons: {
    marginTop: 30,
    float: 'right',
  },
  saveButton: {
    marginLeft: 5,
  },
  loading: {
    display: 'inline-block',
    position: 'relative',
  },
}

export class UserDetail extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    isProcessing: React.PropTypes.bool,
  }

  static defaultProps = {}

  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    const { data, isProcessing } = this.props
    return (
      <form style={MUI_styles.form}>
        {
          isProcessing || !data ? <RefreshIndicator size={40}
                                           left={50}
                                           top={0}
                                           status="loading"
                                           style={MUI_styles.loading}/>
            :
            <div>
              <TextField
                hintText="Name"
                floatingLabelText="Name"
                fullWidth={true}
                disabled={true}
                defaultValue={data.name}
              />
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                fullWidth={true}
                disabled={true}
                defaultValue={data.email}
              />
              <TextField
                hintText="Location"
                floatingLabelText="Location"
                fullWidth={true}
                disabled={true}
                defaultValue={data.location}
              />
              <TextField
                hintText="Company"
                floatingLabelText="Company"
                fullWidth={true}
                disabled={true}
                defaultValue={data.company}
              />
              <DatePicker
                hintText="Created Date"
                floatingLabelText="Created Date"
                fullWidth={true}
                disabled={true}
                defaultDate={new Date(data.created_at)}
              />

              <div style={MUI_styles.buttons}>
                <Link to="/users">
                  <RaisedButton label="Back"
                                style={MUI_styles.saveButton}
                                type="button"
                                primary={true}/>
                </Link>
              </div>
            </div>
        }
      </form>
    )
  }
}

export default withRouter(CSSModules(UserDetail, styles))
