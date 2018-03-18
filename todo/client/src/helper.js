export const handleNetworkServerErrors = e => {
  if (!e.response) {
    return e.message;
  }
  return e.response.data;
};

export const handleNetworkServerMongooseErrors = e => {
  if (!e.response) {
    return e.message;
  }
  return e.response.data.errors.task.message;
};
