export default {
  projectname: 'Task Manager',
  priority: 'Priority',
  path: 'Path',
  cpu: 'CPU',
  memory: 'RAM',
  pid: 'PID',
  execTime: 'ExecTime',
  editModalTitle: (taskID: number) => `Editing Task №${taskID}`,
  notification: {
    deleted: 'Task has been deleted succesfully!',
    notdeleted: 'Error: Task has not been deleted!',
    edited: 'Task has been edited succesfully!',
    notedited: 'Error: Task has not been edited!',
  }
};
