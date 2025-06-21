export interface Photo {
  id: number;
  title: string;
  description: string;
  amount: number;
  category: string;
  file_path: any;
  uploadDate: string;
  owner_id: number;
  owner_username: string;
  imageUrl?: string;
}
