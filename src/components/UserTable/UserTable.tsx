import {useContext, useState} from 'react';
import {Role, User} from '../../models/User';
import {
  TableRow,
  TableCell,
  TextField,
  Select,
  MenuItem,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Fab,
  makeStyles,
  Theme,
  createStyles,
  Modal,
  Box,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddUser from '../AddUser/AddUser';
import {UserDataContext} from '../../context/userdata.context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      textAlign: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      transform: 'translate(-50%, -50%)',
      width: 400,
      border: '2px solid #000',
      borderRadius: '24px',
      boxShadow: '24',
      p: 4,
      paddingBottom: '20px',
    },
  }),
);

const UserTable: React.FC = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [buttonText, setButtonText] = useState<string>('Load data');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userRepository = useContext(UserDataContext);

  const handleLoadData = () => {
    setUsers([...userRepository.getUsers()]);
    setButtonText('Refresh data');
  };

  const handleDelete = (id: number) => {
    userRepository.deleteUser(id);
    setUsers([...userRepository.getUsers()]);
  };

  const handleEdit = (id: number) => {
    setEditingUserId(id);
  };

  const handleSave = (updatedUser: User) => {
    userRepository.updateUser(updatedUser);
    setEditingUserId(null);
    setUsers([...userRepository.getUsers()]);
  };

  const handleCancel = () => {
    setEditingUserId(null);
  };

  const handleCreate = (newUser: User) => {
    userRepository.createUser(newUser);
    setOpen(false);
    setUsers([...userRepository.getUsers()]);
  };

  const renderTableRow = (user: User) => {
    if (user.id === editingUserId) {
      return (
        <TableRow key={user.id} className="table-row">
          <TableCell className="table-data">
            <TextField
              type="text"
              value={user.firstName}
              onChange={e =>
                setUsers(
                  users.map(u => {
                    if (u.id === user.id) {
                      u.firstName = e.target.value;
                    }
                    return u;
                  }),
                )
              }
            />
          </TableCell>
          <TableCell className="table-data">
            <TextField
              type="text"
              value={user.middleName || ''}
              onChange={e =>
                setUsers(
                  users.map(u => {
                    if (u.id === user.id) {
                      u.middleName = e.target.value;
                    }
                    return u;
                  }),
                )
              }
            />
          </TableCell>
          <TableCell className="table-data">
            <TextField
              type="text"
              value={user.lastName}
              onChange={e =>
                setUsers(
                  users.map(u => {
                    if (u.id === user.id) {
                      u.lastName = e.target.value;
                    }
                    return u;
                  }),
                )
              }
            />
          </TableCell>
          <TableCell className="table-data">
            <TextField
              type="text"
              value={user.email}
              onChange={e =>
                setUsers(
                  users.map(u => {
                    if (u.id === user.id) {
                      u.email = e.target.value;
                    }
                    return u;
                  }),
                )
              }
            />
          </TableCell>
          <TableCell className="table-data">
            <TextField
              type="text"
              value={user.phone}
              onChange={e =>
                setUsers(
                  users.map(u => {
                    if (u.id === user.id) {
                      u.phone = e.target.value;
                    }
                    return u;
                  }),
                )
              }
            />
          </TableCell>
          <TableCell className="table-data">
            <Select
              value={user.role}
              onChange={e =>
                setUsers(
                  users.map(u => {
                    if (u.id === user.id) {
                      u.role = e.target.value as Role;
                    }
                    return u;
                  }),
                )
              }
            >
              <MenuItem value={Role.SUPERADMIN}>Super Admin</MenuItem>
              <MenuItem value={Role.ADMIN}>ADMIN</MenuItem>
              <MenuItem value={Role.USER}>USER</MenuItem>
            </Select>
          </TableCell>
          <TableCell className="table-data">
            <TextField
              type="text"
              value={user.address}
              onChange={e =>
                setUsers(
                  users.map(u => {
                    if (u.id === user.id) {
                      u.address = e.target.value;
                    }
                    return u;
                  }),
                )
              }
            />
          </TableCell>
          <TableCell className="table-data">
            <Button onClick={() => handleSave(user)}>Save</Button>
            <Button onClick={() => handleCancel()}>Cancel</Button>
          </TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow key={user.id} className="table-row">
          <TableCell align="center">{user.firstName}</TableCell>
          <TableCell align="center">{user.middleName}</TableCell>
          <TableCell align="center">{user.lastName}</TableCell>
          <TableCell align="center">{user.email}</TableCell>
          <TableCell align="center">{user.phone}</TableCell>
          <TableCell align="center">{user.role}</TableCell>
          <TableCell align="center">{user.address}</TableCell>
          <TableCell align="center">
            <Button color="secondary" onClick={() => handleEdit(user.id)}>
              Edit
            </Button>
            <Button color="secondary" onClick={() => handleDelete(user.id)}>
              Delete
            </Button>
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleLoadData()}
      >
        {buttonText}
      </Button>
      {users.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table className="table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Middle Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center">Address</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{users.map(user => renderTableRow(user))}</TableBody>
            </Table>
          </TableContainer>
          <Fab
            color="primary"
            onClick={handleOpen}
            className={classes.fab}
            aria-label="add"
          >
            <AddIcon />
          </Fab>
          <Modal open={open} onClose={handleClose} disableEnforceFocus>
            <Box className={classes.modal}>
              <h2>Add User</h2>
              <AddUser onSave={handleCreate} />
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default UserTable;
