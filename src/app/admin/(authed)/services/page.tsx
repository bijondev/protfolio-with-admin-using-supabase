import { getPortfolioData } from "@/lib/portfolio";
import {
  createService,
  updateService,
  deleteService,
} from "../_actions/services";
import { Field, SubmitButton, Card, FormSection } from "../_components/Form";
import { ConfirmButton } from "@/app/admin/_components/ConfirmButton";

const ICON_OPTIONS = [
  "globe", "mobile", "server", "palette", "cart", "wrench", "mail", "briefcase", "check", "map-pin",
];

export default async function ServicesEditor() {
  const data = await getPortfolioData();

  async function createAction(formData: FormData) {
    "use server";
    await createService(formData);
  }
  async function updateAction(formData: FormData) {
    "use server";
    await updateService(formData.get("id") as string, formData);
  }
  async function deleteAction(formData: FormData) {
    "use server";
    await deleteService(formData.get("id") as string);
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">Services</h1>
      <p className="mb-8 text-sm text-[var(--color-fg-muted)]">
        What you offer, shown in the Services section.
      </p>

      <div className="mb-10 space-y-4">
        {data.services.map((s) => (
          <form
            key={s.id}
            action={updateAction}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5"
          >
            <input type="hidden" name="id" value={s.id} />
            <div className="grid gap-4 sm:grid-cols-[1fr_140px_80px]">
              <Field label="Title" name="title" required defaultValue={s.title} />
              <Field label="Icon" name="icon" defaultValue={s.icon} help={ICON_OPTIONS.join(", ")} />
              <Field label="Order" name="sort_order" type="number" defaultValue={s.sort_order} />
            </div>
            <div className="mt-4">
              <Field
                label="Description"
                name="description"
                type="textarea"
                rows={2}
                defaultValue={s.description}
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <ConfirmButton
                formAction={deleteAction}
                message="Delete this service?"
                className="rounded-md border border-red-300 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:border-red-900 dark:text-red-400"
              >
                Delete
              </ConfirmButton>
              <SubmitButton label="Save" />
            </div>
          </form>
        ))}
      </div>

      <Card>
        <FormSection title="Add a service">
          <form action={createAction} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-[1fr_140px_80px]">
              <Field label="Title" name="title" required />
              <Field label="Icon" name="icon" defaultValue="globe" help={ICON_OPTIONS.join(", ")} />
              <Field label="Order" name="sort_order" type="number" defaultValue={data.services.length} />
            </div>
            <Field label="Description" name="description" type="textarea" rows={2} required />
            <SubmitButton label="Add service" />
          </form>
        </FormSection>
      </Card>
    </div>
  );
}

