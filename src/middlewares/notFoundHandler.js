// handle not found routes
const notFoundHandler = (req, res) => {
  return res.status(401).json({
    status: 401,
    title: "Unauthorized",
  });
};

export default notFoundHandler;
