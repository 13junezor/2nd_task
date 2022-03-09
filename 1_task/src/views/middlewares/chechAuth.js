/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable import/newline-after-import */
/* eslint-disable linebreak-style */

const checkAuth = (req, res, next) => {
  const currentUser = req.session?.user
  if (currentUser) {
    return next()
  }
  return res.redirect('/auth/signin')
}
module.exports = {
  checkAuth,
}