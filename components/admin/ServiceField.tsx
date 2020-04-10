import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const servicesToList = (services) =>
  _.map(_.flatten(services.map((category) => category.categories)), 'name')

export const ServiceField = ({source, record = {}}) => {
  return <span>{servicesToList(record[source]).join('; ')}</span>
}

ServiceField.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
}

ServiceField.defaultProps = {
  addLabel: true,
}

export const GroupedServiceField = ({source, record = {}}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category number</TableCell>
            <TableCell>Services</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.orderBy(record[source], (o) => o.number).map((category) => (
            <TableRow key={category.name}>
              <TableCell>{category.number}</TableCell>
              <TableCell>{servicesToList([category]).join('; ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

GroupedServiceField.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
}

GroupedServiceField.defaultProps = {
  addLabel: true,
}
