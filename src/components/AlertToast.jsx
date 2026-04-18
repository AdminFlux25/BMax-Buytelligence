export default function AlertToast({ alert }) {
  return (
    <div className={`alert-toast ${alert.severity}`}>
      {alert.message}
    </div>
  );
}
