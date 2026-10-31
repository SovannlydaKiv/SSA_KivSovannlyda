export interface Restaurant { id: number; name: string; area: string} 
export interface Order{id: string; restaurantId: number; items: string[]; status: string}  

export const RESTAURANTS: Restaurant[]=[ 
    {id:1,name:'NumBanhChokCorner',area:'DaunPenh'}, 
    {id:2,name:'LokLakHouse',area:'BKK1'}, 
    {id:3,name:'AmokGarden',area:'ToulKork'}, 
]; 

export const ORDERS= new Map<string,Order>(); 
export const IDEMPOTENCY= new Map<string,string>();
export const SESSIONS= new Map<string,string>();