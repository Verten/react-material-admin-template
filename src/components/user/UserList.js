/**
 * Created by ebinhon on 1/19/2017.
 */
import React from 'react'
import CSSModules from 'react-css-modules'
import { Link, withRouter } from 'react-router'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentCreate from 'material-ui/svg-icons/content/create'
import Avatar from 'material-ui/Avatar'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import * as Colors from 'material-ui/styles/colors'

import styles from '../style/components.scss'

const MUI_styles = {
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  editButton: {
    fill: Colors.grey500
  },
  columns: {
    id: {
      width: '10%'
    },
    name: {
      width: '15%'
    },
    avatar: {
      width: '20%'
    },
    category: {
      width: '20%'
    },
    edit: {
      width: '10%'
    }
  },
  avatar: {
    icon: {
      float: 'left',
      display: 'block',
      marginRight: 15,
      boxShadow: '0px 0px 0px 4px rgba(0,0,0,0.2)'
    },
  },
  loading: {
    display: 'inline-block',
    position: 'relative',
  },
};

export class UserList extends React.Component {
  static propTypes = {
    data: React.PropTypes.array,
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

  componentWillReceiveProps(nextProps) {
    console.info(nextProps)
  }

  render() {
    const users = this.props.data
    const { isProcessing } = this.props
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={MUI_styles.columns.id}>ID</TableHeaderColumn>
              <TableHeaderColumn style={MUI_styles.columns.avatar}>Avatar</TableHeaderColumn>
              <TableHeaderColumn style={MUI_styles.columns.name}>Name</TableHeaderColumn>
              <TableHeaderColumn style={MUI_styles.columns.category}>Category</TableHeaderColumn>
              <TableHeaderColumn style={MUI_styles.columns.edit}>Edit</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              isProcessing ?
                <RefreshIndicator size={40}
                                  left={50}
                                  top={0}
                                  status="loading"
                                  style={MUI_styles.loading}/>
                : null
            }
            {users && users.map(user =>
              <TableRow key={user.id}>
                <TableRowColumn style={MUI_styles.columns.id}>{user.id}</TableRowColumn>
                <TableRowColumn style={MUI_styles.columns.avatar}>
                  <Avatar src={user.avatar_url}
                          size={30}
                          style={MUI_styles.avatar.icon}/>
                </TableRowColumn>
                <TableRowColumn style={MUI_styles.columns.name}>{user.login}</TableRowColumn>
                <TableRowColumn style={MUI_styles.columns.category}>{user.organizations_url}</TableRowColumn>
                <TableRowColumn style={MUI_styles.columns.edit}>
                  <Link className="button" to={`/users/${user.id}`}>
                    <FloatingActionButton zDepth={0}
                                          mini={true}
                                          backgroundColor={Colors.grey200}
                                          iconStyle={MUI_styles.editButton}>
                      <ContentCreate  />
                    </FloatingActionButton>
                  </Link>
                </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default withRouter(CSSModules(UserList, styles))
