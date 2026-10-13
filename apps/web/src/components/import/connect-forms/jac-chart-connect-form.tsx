import { useTranslation } from "react-i18next";
import { ConnectFieldRow } from "@/components/import/connect-forms/connect-field-row";
import type { ConnectFormProps } from "@/components/import/connect-forms/connect-form-props";
import { fieldDescribedBy } from "@/components/import/connect-forms/field-ids";
import { SecretInput } from "@/components/import/connect-forms/secret-input";
import { Input } from "@/components/ui/input";

const URL_ID = "import-jac-chart-url";
const API_KEY_ID = "import-jac-chart-api-key";

export function JacChartConnectForm({
  values,
  onChange,
  error,
}: ConnectFormProps) {
  const { t } = useTranslation();
  const apiKeyLabel = t("settings:workspaceImport.jacChart.apiKeyLabel");

  return (
    <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
      <ConnectFieldRow
        id={URL_ID}
        labelFor={URL_ID}
        label={t("settings:workspaceImport.jacChart.urlLabel")}
        description={t("settings:workspaceImport.jacChart.urlDescription")}
      >
        <Input
          id={URL_ID}
          type="url"
          inputMode="url"
          value={values.url}
          onChange={(event) => onChange({ url: event.target.value })}
          placeholder="https://cloud.jac-chart.app"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-describedby={fieldDescribedBy(URL_ID, false)}
        />
      </ConnectFieldRow>
      <ConnectFieldRow
        id={API_KEY_ID}
        labelFor={API_KEY_ID}
        label={apiKeyLabel}
        description={t("settings:workspaceImport.jacChart.apiKeyDescription")}
        error={error}
      >
        <SecretInput
          id={API_KEY_ID}
          label={apiKeyLabel}
          value={values.apiKey}
          onValueChange={(apiKey) => onChange({ apiKey })}
          placeholder={t("settings:workspaceImport.jacChart.apiKeyPlaceholder")}
          invalid={Boolean(error)}
        />
      </ConnectFieldRow>
    </div>
  );
}
