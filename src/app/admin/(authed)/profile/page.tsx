import { getPortfolioData } from "@/lib/portfolio";
import { updateProfile } from "../_actions/profile";
import { Field, FormSection, SubmitButton, Card } from "../_components/Form";

export default async function ProfileEditor() {
  const data = await getPortfolioData();
  const p = data.profile;

  async function action(formData: FormData) {
    "use server";
    await updateProfile(formData);
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">Profile</h1>
      <p className="mb-8 text-sm text-[var(--color-fg-muted)]">
        Personal info shown in the sidebar, hero, and contact section.
      </p>

      <form action={action}>
        <FormSection title="Identity" description="Your public identity.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" name="full_name" required defaultValue={p.full_name} />
            <Field label="Short name (used in hero)" name="short_name" required defaultValue={p.short_name} />
            <Field label="Initials (avatar)" name="initials" required defaultValue={p.initials} maxLength={3} />
            <Field label="Role / Title" name="role" required defaultValue={p.role} />
          </div>
          <Field
            label="Tagline"
            name="tagline"
            type="textarea"
            rows={2}
            defaultValue={p.tagline}
            help="Shown under the hero heading."
          />
        </FormSection>

        <FormSection title="Contact" description="How people reach you.">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email" name="email" type="email" required defaultValue={p.email} />
            <Field label="Location" name="location" defaultValue={p.location} />
            <Field label="Availability" name="availability" defaultValue={p.availability} placeholder="Available for freelance" />
            <Field label="Website URL" name="website_url" type="url" defaultValue={p.website_url} />
          </div>
        </FormSection>

        <FormSection title="Social links" description="Leave blank to hide.">
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="GitHub" name="github_url" type="url" defaultValue={p.github_url} placeholder="https://github.com/you" />
            <Field label="LinkedIn" name="linkedin_url" type="url" defaultValue={p.linkedin_url} placeholder="https://linkedin.com/in/you" />
            <Field label="Twitter / X" name="twitter_url" type="url" defaultValue={p.twitter_url} placeholder="https://twitter.com/you" />
          </div>
        </FormSection>

        <Card>
          <SubmitButton label="Save profile" />
        </Card>
      </form>
    </div>
  );
}
