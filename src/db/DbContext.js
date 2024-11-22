import mongoose, { mongo } from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BugsSchema } from '../models/Bugs';
import { NotesSchema } from '../models/Notes';
import { TrackedBugsSchema } from '../models/TrackedBugs';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bugs', BugsSchema)
  Notes = mongoose.model('Notes', NotesSchema)
  TrackedBugs = mongoose.model('TrackedBugs', TrackedBugsSchema)
}

export const dbContext = new DbContext()
