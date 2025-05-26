export interface Photo {
  id: number;
  title: string;
  description: string;
  amount: number;
  file_path: any;
  uploadDate: string;
  user_id: number;
  imageUrl?: string;
}
