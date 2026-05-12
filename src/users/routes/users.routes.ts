import { Router } from "express";
import {v7} from "uuid";
import { User } from "../users.type";

const router = Router();

const users: User[] = [{
    id: v7(),
    name: "Olena",        
    email: " usik@gmail.com",      
    password: "2573EDCrfv",   
    role: "user",
    createdAt: new Date().toDateString(),
},];

// GET / users
router.get ("/", (_req, res) => {
    res.status(200).json(users);
});

// GET / users/:id
router.get ("/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find((user) => user.id === id);
    if (!users) {
          res.status(404).json({ 
        error: `user item with id ${id} not found` 
    });

    }
        
    res.status(200).json(user);
});
// POST / users
router.post ("/", (req, res) => {
    const {name, email, password, role} = req.body;
    if (!name || !email || !password || !role) {
        res.status(400).json({
        error: "name, email, password and role ara required"
    });
    }
    const newUser: User ={
    id: v7(),
    name,
    email,
    password,
    role: "user",
    createdAt: new Date().toDateString(),
};
users.push(newUser);
res.status(201).json({message: "New user is created.", id: newUser.id });

});   

//PATCH /users/:id
router.patch("/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ 
        error: `user item with id ${id} not found` 
    });
    }
    
    const {name, email, password, role} = req.body;

     if (!name && !email && !password && !role) {
        res.status(400).json({
        error: "At least one field is required",
    });
    }
     if (name) {
        user.name = name;
     }
      if (email) {
        user.email = email;
     }

      if (password) {
        user.password = password;
     }
    if (role) {
        user.role = role;
     }
     
     res.status(200).json(user)
});

// DELETE /users/:id
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    const indexOfUser = users.findIndex((user) => user.id === id);

    if (indexOfUser === -1) {
        return res.status(404).json({ 
        error: `User item with id ${id} not found` 

    });
}
    const deletedUser = users[indexOfUser];

    users.splice(indexOfUser, 1)

    res.status(200).json({message: "User deleted", deletedUser});
});

export default router;