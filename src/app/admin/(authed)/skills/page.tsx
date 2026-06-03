import { getPortfolioData } from "@/lib/portfolio";
import {
  createSkill,
  updateSkill,
  deleteSkill,
} from "../_actions/skills";
import { Field, SubmitButton, Card } from "../_components/Form";
import { ConfirmButton } from "@/app/admin/_components/ConfirmButton";
import { Icon } from "@/components/Icon";

export default async function SkillsEditor() {
  const data = await getPortfolioData();

  async function createAction(formData: FormData) {
    "use server";
    await createSkill(formData);
  }
  async function updateAction(formData: FormData) {
    "use server";
    await updateSkill(formData.get("id") as string, formData);
  }
  async function deleteAction(formData: FormData) {
    "use server";
    await deleteSkill(formData.get("id") as string);
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">Skills</h1>
      <p className="mb-8 text-sm text-[var(--color-fg-muted)]">
        Technologies shown as badges in the Skills section.
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {data.skills.map((s) => (
          <form
            key={s.id}
            action={updateAction}
            className="group flex items-center gap-1 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] pl-3 pr-1 py-1"
          >
            <input type="hidden" name="id" value={s.id} />
            <input
              name="name"
              defaultValue={s.name}
              className="w-24 bg-transparent text-sm outline-none"
            />
            <button
              type="submit"
              className="rounded p-1 text-[var(--color-fg-subtle)] opacity-0 transition-opacity hover:text-[var(--color-accent)] group-hover:opacity-100"
              title="Save"
            >
              <Icon name="check" className="h-3.5 w-3.5" />
            </button>
            <ConfirmButton
              formAction={deleteAction}
              message="Delete this skill?"
              className="rounded p-1 text-[var(--color-fg-subtle)] opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
            >
              <Icon name="close" className="h-3.5 w-3.5" />
            </ConfirmButton>
          </form>
        ))}
      </div>

      <Card>
        <h2 className="mb-4 text-lg font-semibold">Add a skill</h2>
        <form action={createAction} className="flex items-end gap-3">
          <div className="flex-1">
            <Field label="Name" name="name" required placeholder="React" />
          </div>
          <div className="w-24">
            <Field label="Order" name="sort_order" type="number" defaultValue={data.skills.length} />
          </div>
          <SubmitButton label="Add" />
        </form>
      </Card>
    </div>
  );
}

