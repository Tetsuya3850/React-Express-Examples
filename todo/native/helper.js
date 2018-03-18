export const handleMongooseError = e => {
  if (e.response.data.errors.task) {
    return e.response.data.errors.task.message;
  }
  return "Something went wrong!";
};
