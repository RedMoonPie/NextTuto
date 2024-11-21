import { getSuppliersByStoreId } from '@/app/api/suppliers/server/serverFunctions';
import { getUserById } from '@/app/api/users/server/serverFunctions';
import { fetchCustomers } from '@/app/lib/data';
import Form from '@/app/ui/products/create-form';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  let suppliers = [];
  if (session?.user?.id) {
    const { data: user } = await getUserById(session?.user?.id);
    if (user) {
      suppliers = (await getSuppliersByStoreId(user?.store_id)).data ?? [];
    }
    
  }

  console.log(suppliers, 'SUPPLIERS');
  return (
    <main>
      <Form suppliers={suppliers} />
    </main>
  );
}
