import UserService from './user.service.js';

class UserController {
    // Get all users
    getAll(req, res, next) {
        UserService.readUsersFromFile((err, users) => {
            if (err) return res.status(500).json({ message: err.error });
            return res.json(users);
        });
    }

    // Get a user
    getUser(req, res, next) {
        UserService.readUsersFromFile((err, users) => {
            if (err) return res.status(500).json({ message: err.error });

            const user = users.find((u) => u.id === Number(req.params.id));
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(user);
        });
    }

    // Create a new user
    async postUser(req, res, next) {
        UserService.readUsersFromFile((err, users) => {
            if (err) return res.status(500).json({ message: err.error });

            const userId = users.length ? users[users.length - 1].id + 1 : 1;
            const newUser = { id: userId, name: req.body.name };
            users.push(newUser);

            UserService.writeUserToFile(users, (err) => {
                if (err) return res.status(500).json({ message: err.error });
                return res.status(201).json(users);
            });
        });
    }

    // Update a user
    async putUser(req, res, next) {
        UserService.readUsersFromFile((err, users) => {
            if (err) return res.status(500).json({ message: err.error });

            const userId = Number(req.params.id);
            const userIndex = users.findIndex((u) => u.id === userId);

            if (userIndex === -1) {
                return res.status(404).json({ message: "User not found" });
            }

            users[userIndex].name = req.body.name;

            UserService.writeUserToFile(users, (err) => {
                if (err) return res.status(500).json({ message: err.error });
                return res.json(users[userIndex]);
            });
        });
    }

    // Delete a user
    deleteUser(req, res, next) {
        UserService.readUsersFromFile((err, users) => {
            if (err) return res.status(500).json({ message: err.error });

            const userId = Number(req.params.id);
            const userIndex = users.findIndex((u) => u.id === userId);

            if (userIndex === -1) {
                return res.status(404).json({ message: "User not found" });
            }

            const deletedUser = users.splice(userIndex, 1)[0];

            UserService.writeUserToFile(users, (err) => {
                if (err) return res.status(500).json({ message: err.error });
                return res.json(users);
            });
        });
    }
}

export default new UserController();
