const checkAdmin = (req, res, next) => {
    // Check if user is an admin
    if (req.user && (req.user.email === process.env.ADMIN_EMAIL || req.user.email === "nayemhasan1314@gmail.com")) {
        return next();
    }
    return res.status(403).json({ message: "Access denied. Admins only." });
};

export { checkAdmin };