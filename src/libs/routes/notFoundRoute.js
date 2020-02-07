export default (req, res, next) => {
  next({ message: 'Not Found', status: 404 });
};
