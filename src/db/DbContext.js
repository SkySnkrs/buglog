import mongoose, { mongo } from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BugsSchema } from '../models/Bugs';
import { NotesSchema } from '../models/Notes';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bugs', BugsSchema)
  Notes = mongoose.model('Notes', NotesSchema)
}

export const dbContext = new DbContext()
