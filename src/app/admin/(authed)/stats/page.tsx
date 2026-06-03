import { getPortfolioData } from "@/lib/portfolio";
import {
  createStat,
  updateStat,
  deleteStat,
} from "../_actions/stats";
import { Field, SubmitButton, Card } from "../_components/Form";
import { ConfirmButton } from "@/app/admin/_components/ConfirmButton";
import { Icon } from "@/components/Icon";

export default async function StatsEditor() {
  const data = await getPortfolioData();

  async function createAction(formData: FormData) {
    "use server";
    await createStat(formData);
  }
  async function updateAction(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await updateStat(id, formData);
  }
  async function deleteAction(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await deleteStat(id);
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">Stats</h1>
      <p className="mb-8 text-sm text-[var(--color-fg-muted)]">
        Numbers shown in the About section.
      </p>

      <div className="mb-10 space-y-3">
        {data.stats.map((s) => (
          <form key={s.id} action={updateAction} className="flex items-end gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4">
            <input type="hidden" name="id" value={s.id} />
            <div className="flex-1">
              <Field label="Value" name="value" required defaultValue={s.value} />
            </div>
            <div className="flex-1">
              <Field label="Label" name="label" required defaultValue={s.label} />
            </div>
            <div className="w-20">
              <Field label="Order" name="sort_order" type="number" defaultValue={s.sort_order} />
            </div>
            <button
              type="submit"
              className="rounded-md border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Save
            </button>
            <ConfirmButton
              formAction={deleteAction}
              message="Delete this stat?"
              className="rounded-md border border-red-300 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:border-red-900 dark:text-red-400"
            >
              <Icon name="close" className="h-4 w-4" />
            </ConfirmButton>
          </form>
        ))}
      </div>

      <Card>
        <h2 className="mb-4 text-lg font-semibold">Add a stat</h2>
        <form action={createAction} className="grid gap-4 sm:grid-cols-[1fr_2fr_100px_auto] sm:items-end">
          <Field label="Value" name="value" required placeholder="5+" />
          <Field label="Label" name="label" required placeholder="Years of experience" />
          <Field label="Order" name="sort_order" type="number" defaultValue={data.stats.length} />
          <SubmitButton label="Add" />
        </form>
      </Card>
    </div>
  );
}

