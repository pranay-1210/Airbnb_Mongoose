exports.get404 = (req, res, next) => {
  res.statusCode = 404;
  res.render('404', {pagetTitle: "Page Not Found" });
}