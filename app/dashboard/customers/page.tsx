import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import Table from "@/app/ui/customers/table";
import { Metadata } from "next"
import { Suspense } from "react";
import { CustomersTableSkeleton } from "@/app/ui/skeletons";
import { CreateCustomer } from "@/app/ui/customers/buttons";

export const metadata: Metadata = {
  title: 'Customers',
}

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string; }>
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page || 1);

  return (
    <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search customer..." />
            <CreateCustomer />
          </div>
           <Suspense key={query + currentPage}  fallback={<CustomersTableSkeleton/>}>
            <Table query={query} currentPage={currentPage} />
          </Suspense> 
          
        </div>
  );
}