module.exports = {
    isAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) return next();
      res.redirect("/auth/google");
    },
  
    isAdmin: (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === "admin") return next();
      res.status(403).send("Access Denied: Admins Only");
    },
  
    isApplicant: (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === "applicant") return next();
      res.status(403).send("Access Denied: Applicants Only");
    },
  };
  