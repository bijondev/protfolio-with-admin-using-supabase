import { getPortfolioData } from "@/lib/portfolio";
import {
  createExperience,
  updateExperience,
  deleteExperience,
} from "../_actions/experience";
import { Field, SubmitButton, Card, FormSection } from "../_components/Form";
import { ConfirmButton } from "@/app/admin/_components/ConfirmButton";

export default async function ExperienceEditor() {
  const data = await getPortfolioData();

  async function createAction(formData: FormData) {
    "use server";
    await createExperience(formData);
  }
  async function updateAction(formData: FormData) {
    "use server";
    await updateExperience(formData.get("id") as string, formData);
  }
  async function deleteAction(formData: FormData) {
    "use server";
    await deleteExperience(formData.get("id") as string);
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">Experience</h1>
      <p className="mb-8 text-sm text-[var(--color-fg-muted)]">
        Work history shown in the Experience section.
      </p>

      <div className="mb-10 space-y-4">
        {data.experience.map((e) => (
          <form
            key={e.id}
            action={updateAction}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5"
          >
            <input type="hidden" name="id" value={e.id} />
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <Field label="Role" name="role" required defaultValue={e.role} />
              <Field label="Company" name="company" required defaultValue={e.company} />
              <Field label="Period" name="period" required defaultValue={e.period} placeholder="2023 — Present" />
              <Field label="Location" name="location" defaultValue={e.location} placeholder="Remote" />
            </div>
            <Field
              label="Description"
              name="description"
              type="textarea"
              rows={3}
              defaultValue={e.description}
            />
            <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_100px]">
              <Field
                label="Skills (comma separated)"
                name="skills"
                defaultValue={e.skills.join(", ")}
                placeholder="React, Next.js, Django"
              />
              <Field label="Order" name="sort_order" type="number" defaultValue={e.sort_order} />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <ConfirmButton
                formAction={deleteAction}
                message="Delete this experience?"
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
        <FormSection title="Add experience">
          <form action={createAction} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Role" name="role" required />
              <Field label="Company" name="company" required />
              <Field label="Period" name="period" required placeholder="2023 — Present" />
              <Field label="Location" name="location" placeholder="Remote" />
            </div>
            <Field label="Description" name="description" type="textarea" rows={3} required />
            <div className="grid gap-4 sm:grid-cols-[1fr_100px]">
              <Field label="Skills (comma separated)" name="skills" placeholder="React, Next.js" />
              <Field label="Order" name="sort_order" type="number" defaultValue={data.experience.length} />
            </div>
            <SubmitButton label="Add experience" />
          </form>
        </FormSection>
      </Card>
    </div>
  );
}

