import { getPortfolioData } from "@/lib/portfolio";
import {
  createProject,
  updateProject,
  deleteProject,
} from "../_actions/projects";
import { Field, SubmitButton, Card, FormSection } from "../_components/Form";
import { ConfirmButton } from "@/app/admin/_components/ConfirmButton";

export default async function ProjectsEditor() {
  const data = await getPortfolioData();

  async function createAction(formData: FormData) {
    "use server";
    await createProject(formData);
  }
  async function updateAction(formData: FormData) {
    "use server";
    await updateProject(formData.get("id") as string, formData);
  }
  async function deleteAction(formData: FormData) {
    "use server";
    await deleteProject(formData.get("id") as string);
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">Projects</h1>
      <p className="mb-8 text-sm text-[var(--color-fg-muted)]">
        Featured projects in the Projects section.
      </p>

      <div className="mb-10 space-y-4">
        {data.projects.map((p) => (
          <form
            key={p.id}
            action={updateAction}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5"
          >
            <input type="hidden" name="id" value={p.id} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title" name="title" required defaultValue={p.title} />
              <Field label="Subtitle" name="subtitle" defaultValue={p.subtitle} />
              <Field label="Year" name="year" defaultValue={p.year} placeholder="2024" />
              <Field label="Order" name="sort_order" type="number" defaultValue={p.sort_order} />
            </div>
            <div className="mt-4">
              <Field
                label="Description"
                name="description"
                type="textarea"
                rows={3}
                defaultValue={p.description}
              />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field
                label="Tags (comma separated)"
                name="tags"
                defaultValue={p.tags.join(", ")}
                placeholder="React, Next.js"
              />
              <Field
                label="Highlights (comma separated)"
                name="highlights"
                defaultValue={p.highlights.join(", ")}
                placeholder="10K+ users, Fast, Reliable"
              />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="GitHub URL" name="github_url" type="url" defaultValue={p.github_url} />
              <Field label="Live URL" name="live_url" type="url" defaultValue={p.live_url} />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <ConfirmButton
                formAction={deleteAction}
                message="Delete this project?"
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
        <FormSection title="Add a project">
          <form action={createAction} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title" name="title" required />
              <Field label="Subtitle" name="subtitle" />
              <Field label="Year" name="year" placeholder="2024" />
              <Field label="Order" name="sort_order" type="number" defaultValue={data.projects.length} />
            </div>
            <Field label="Description" name="description" type="textarea" rows={3} required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Tags (comma separated)" name="tags" placeholder="React, Next.js" />
              <Field label="Highlights (comma separated)" name="highlights" placeholder="Fast, Reliable" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="GitHub URL" name="github_url" type="url" />
              <Field label="Live URL" name="live_url" type="url" />
            </div>
            <SubmitButton label="Add project" />
          </form>
        </FormSection>
      </Card>
    </div>
  );
}

