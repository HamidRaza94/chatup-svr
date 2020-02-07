const errorHandlerRoute = ({ error, message, status }, _, res, next) => {
  const errMsg = {
    error: error || 'Undefined',
    message: message || 'Error Ocurred',
    status: status || 500,
    timestamp: new Date(),
  };

  res.status(status).send(errMsg);
  next();
};

// import httpStatus from 'http-status';


// const errorHandlerRoute = (stack = false) => (err, _, res, __) => {
//   res.status(err.status).json({
//     data: err.data || [],
//     message: err.isPublic ? err.message : (httpStatus)[err.status],
//     stack: stack ? err.stack : '',
//     status: 'error',
//   });
// };

export default errorHandlerRoute;
