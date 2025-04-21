export interface TrackedItemWithUser {
  id: string;
  userId: string;
  skinId: string;
  skinName: string;
  addedAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
    createdAt: Date;
    pushToken: string | null;
    donations: number | null;
    isDonor: boolean;
  };
}
