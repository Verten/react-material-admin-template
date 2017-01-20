/**
 * Created by ebinhon on 1/19/2017.
 */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PageBase from '../../components/PageBase'
import UserList from '../../components/user/UserList'
import Actions from '../../actions'

class UserListPage extends React.Component {
  static propTypes = {
    users: React.PropTypes.array,
    actions: React.PropTypes.object,
    isProcessing: React.PropTypes.bool,
  }

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {

  }

  componentDidMount() {
    const {actions} = this.props
    actions.fetchUser()
  }

  render() {
    const { users, isProcessing, actions } = this.props
    return (
      <PageBase title="Users Page"
                navigation="Application / Users Page">
        <UserList isProcessing={isProcessing} data={users} {...actions}/>
      </PageBase>
    )
  }
}

function mapStateToProps(state) {
  const { userReducer } = state
  const { users, isProcessing, error } = userReducer.toJS()
  return {
    users,
    isProcessing,
    error,
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(Actions.userAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatch)(UserListPage)
