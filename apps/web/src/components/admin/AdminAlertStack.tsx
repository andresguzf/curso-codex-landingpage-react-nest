type AdminAlert = {
  id: number;
  kind: 'success' | 'error';
  message: string;
};

type AdminAlertStackProps = {
  alerts: AdminAlert[];
  onDismiss: (id: number) => void;
};

export function AdminAlertStack({ alerts, onDismiss }: AdminAlertStackProps) {
  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="admin-alert-stack" aria-live="polite" aria-atomic="true">
      {alerts.map((alert) => (
        <article key={alert.id} className={`admin-alert admin-alert-${alert.kind}`}>
          <p>{alert.message}</p>
          <button className="admin-alert-close" type="button" aria-label="Cerrar alerta" onClick={() => onDismiss(alert.id)}>
            ×
          </button>
        </article>
      ))}
    </div>
  );
}
