
export type ReceiptItem = {
  name: string;
  price: number;
  quantity?: number;
}

export type ReceiptData = {
  shopName: string;
  date?: string;
  totalAmount: number;
  items: ReceiptItem[];
}
