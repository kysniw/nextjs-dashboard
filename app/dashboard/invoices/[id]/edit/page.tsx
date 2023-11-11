import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import { InvoiceForm } from "@/app/lib/definitions";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/edit-form";

export default async function EditInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (typeof invoice === undefined) {
    return <main>No invoice!!</main>;
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "Invoices",
            href: "/dashboard/invoices",
          },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice as InvoiceForm} customers={customers} />
    </main>
  );
}
