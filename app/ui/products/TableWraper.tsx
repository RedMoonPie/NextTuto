// TableWrapper.tsx
'use client';

import { useState } from 'react';
import { ProductType } from '@/app/models/Product';
import { IoDuplicateOutline } from 'react-icons/io5';
import { FloatingButton } from '../shared/FloatingButton';
import { Table } from '../shared/Table';

interface TableWrapperProps {
  products: ProductType[];
}

export function TableWrapper({ products }: TableWrapperProps) {
  const [data, setData] = useState(products);

  const handleAction = (action: string, row: ProductType) => {
    console.log(`${action} action on`, row);
  };

  return (
    <>
      <FloatingButton
        href={'/dashboard/products/create'}
        icon={<IoDuplicateOutline style={{ height: '100%', width: '100%' }} />}
      />
      <Table
        header="Productos"
        data={data}
        keyAccessor="_id"
        columns={[
          { header: 'Nombre', accessor: 'name', isHightlight: true },
          { header: 'Categoria', accessor: 'category', isHightlight: false },
          {
            header: 'Descripción',
            accessor: 'description',
            isHightlight: false,
          },
          { header: 'Precio compra', accessor: 'price', isHightlight: false },
          {
            header: 'Precio Final',
            accessor: 'final_price',
            isHightlight: false,
          },
        ]}
        onAction={handleAction}
        mobileRender={(row) => (
          <div>
            <p>{row.name}</p>
            <p>{row.price}</p>
          </div>
        )}
      />
    </>
  );
}
