/**
 * Created by ebinhon on 1/20/2017.
 */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Actions from '../../actions'
import PageBase from '../../components/PageBase'
import UserDetail from '../../components/user/UserDetail'

class UserDetailPage extends React.Component {
  static propTypes = {
    params: React.PropTypes.object,
    actions: React.PropTypes.object,
    user: React.PropTypes.object,
    isProcessing: React.PropTypes.bool,
  }

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    const { params, actions } = this.props
    actions.fetchUserDetail(params.id)
  }

  componentDidMount() {

  }

  render() {
    const { user, isProcessing, actions } = this.props
    return (
      <PageBase title="Users Detail Page"
                navigation="Application / Users Page / Users Detail Page">
        <UserDetail isProcessing={isProcessing} data={user} {...actions}/>
      </PageBase>
    )
  }
}

function mapStateToProps(state) {
  const { userReducer } = state
  const { user, isProcessing, error } = userReducer.toJS()
  return {
    user,
    isProcessing,
    error,
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(Actions.userAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatch)(UserDetailPage)
