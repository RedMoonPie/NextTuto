// ProductsTableServer.tsx
import { getAllProducts } from '@/app/api/products/server/serverFunctions';
import { TableWrapper } from './TableWraper';

export default async function ProductsTableServer() {
  const { data: products } = await getAllProducts();
  console.log(products,"PRODUCTWSU")
  if (!products) {
    return <>No Products Found</>;
  }


  return <TableWrapper products={products} />;
}
