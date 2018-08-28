export const lambda = func => (event, context, callback) => {
  if (context.LOCAL_EXECUTION_ENV) {
    func({
      queryStringParameters: event.query
    }, context, callback);
  } else {
    func(event, context, callback);
  }
};
