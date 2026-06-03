import { getPortfolioData } from "@/lib/portfolio";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../_actions/testimonials";
import { Field, SubmitButton, Card, FormSection } from "../_components/Form";
import { ConfirmButton } from "@/app/admin/_components/ConfirmButton";

export default async function TestimonialsEditor() {
  const data = await getPortfolioData();

  async function createAction(formData: FormData) {
    "use server";
    await createTestimonial(formData);
  }
  async function updateAction(formData: FormData) {
    "use server";
    await updateTestimonial(formData.get("id") as string, formData);
  }
  async function deleteAction(formData: FormData) {
    "use server";
    await deleteTestimonial(formData.get("id") as string);
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">Testimonials</h1>
      <p className="mb-8 text-sm text-[var(--color-fg-muted)]">
        Quotes from clients shown in the Testimonials section.
      </p>

      <div className="mb-10 space-y-4">
        {data.testimonials.map((t) => (
          <form
            key={t.id}
            action={updateAction}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5"
          >
            <input type="hidden" name="id" value={t.id} />
            <Field
              label="Quote"
              name="quote"
              type="textarea"
              rows={3}
              required
              defaultValue={t.quote}
            />
            <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr_80px_80px]">
              <Field label="Name" name="name" required defaultValue={t.name} />
              <Field label="Role" name="role" required defaultValue={t.role} />
              <Field label="Initials" name="initials" required defaultValue={t.initials} maxLength={2} />
              <Field label="Order" name="sort_order" type="number" defaultValue={t.sort_order} />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <ConfirmButton
                formAction={deleteAction}
                message="Delete this testimonial?"
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
        <FormSection title="Add a testimonial">
          <form action={createAction} className="space-y-4">
            <Field label="Quote" name="quote" type="textarea" rows={3} required />
            <div className="grid gap-4 sm:grid-cols-[1fr_1fr_80px_80px]">
              <Field label="Name" name="name" required />
              <Field label="Role" name="role" required />
              <Field label="Initials" name="initials" required maxLength={2} />
              <Field label="Order" name="sort_order" type="number" defaultValue={data.testimonials.length} />
            </div>
            <SubmitButton label="Add testimonial" />
          </form>
        </FormSection>
      </Card>
    </div>
  );
}

