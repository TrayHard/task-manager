export default {
  projectname: 'Task Manager',
  priority: 'Priority',
  cpu: 'CPU',
  ram: 'RAM',
  pid: 'PID',
  exectime: 'ExecTime',
  editModalTitle: (taskID: number) => `Editing Task №${taskID}`,
  notification: {
    deleted: 'Task has been deleted succesfully!',
    notdeleted: 'Error: Task has not been deleted!',
    edited: 'Task has been edited succesfully!',
    notedited: 'Error: Task has not been edited!',
  }
};
