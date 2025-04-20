import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

class UserController {
    private userService = new UserService();

    public create = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error creating user' });
        }
    };

    public findAll = async (_req: Request, res: Response): Promise<void> => {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching users' });
        }
    };

    public findOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.userService.getUserById(req.params.id);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user' });
        }
    };

    public update = async (req: Request, res: Response): Promise<void> => {
        try {
            const updatedUser = await this.userService.updateUser(req.params.id, req.body);
            if (!updatedUser) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: 'Error updating user' });
        }
    };

    public delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const deleted = await this.userService.deleteUser(req.params.id);
            if (!deleted) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Error deleting user' });
        }
    };
}

export { UserController };
