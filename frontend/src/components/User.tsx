import React, { useState, useCallback } from 'react';

// Define types inline to remove external dependencies
type UserRole = 'ADMIN' | 'MANAGER' | 'CONTRIBUTOR';

interface User {
    id?: string;
    name: string;
    email: string;
    role: UserRole;
}

// Simple mock service function
const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
    // Simulate API call with fetch or axios
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('User creation failed');
        }

        return {
            id: crypto.randomUUID(), // Generate a temporary ID
            ...userData
        };
    } catch (error) {
        console.error('User creation error', error);
        throw error;
    }
};

interface UserFormProps {
    onUserCreated?: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onUserCreated }) => {
    const [formData, setFormData] = useState<Omit<User, 'id'>>({
        name: '',
        email: '',
        role: 'CONTRIBUTOR'
    });

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newUser = await createUser(formData);
            onUserCreated?.(newUser);
            setFormData({ name: '', email: '', role: 'CONTRIBUTOR' });
        } catch (error) {
            console.error('User creation failed', error);
        }
    }, [formData, onUserCreated]);

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Full Name"
                required
            />
            <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Email Address"
                required
            />
            <select
                value={formData.role}
                onChange={(e) => setFormData(prev => ({
                    ...prev,
                    role: e.target.value as UserRole
                }))}
            >
                <option value="CONTRIBUTOR">Contributor</option>
                <option value="MANAGER">Manager</option>
                <option value="ADMIN">Admin</option>
            </select>
            <button type="submit">Create User</button>
        </form>
    );
};

export default UserForm;