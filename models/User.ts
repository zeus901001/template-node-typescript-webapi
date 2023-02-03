import bcryptjs from 'bcryptjs'
import { Schema, model, Document } from 'mongoose';

export interface IUser {
    email: string
    firstName: string
    lastName: string
    password: string
    permission: boolean
    role: string
}

export interface IUserModel extends IUser, Document {
    hashPassword(): string
    verifyPassword(password: string): boolean
    fullName(): string
}

const schema = new Schema<IUserModel>({
    email: { type: String, require: true, trim: true },
    firstName: { type: String, require: true, trim: true },
    lastName: { type: String, require: true, trim: true },
    password: { type: String, require: true, trim: true },
    permission: { type: Boolean, require: true, default: true },
    role: { type: String, require: true, trim: true, default: 'user' },
}, {
    timestamps: true
})

/**
 * Hash user's password.
 */
schema.method('hashPassword', function hashPassword(): string {
    const salt = bcryptjs.genSaltSync(10)
    return bcryptjs.hashSync(this.password, salt)
})

/**
 * Verify user's password.
 */
schema.method('verifyPassword', function verifyPassword(password: string): boolean {
    return bcryptjs.compareSync(password, this.password)
})

/**
 * Get user's full name.
 */
schema.method('fullName', function fullName(): string {
    return `${this.firstName} ${this.lastName}`
})

export default model<IUserModel>('User', schema)