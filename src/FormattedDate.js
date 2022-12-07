export default function FormattedDate() {
  const date = new Date();
  const hours = date.getHours();
  let minutes = String(date.getMinutes());
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }
  const day = date.getDay();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return (
    <p className="card-text">
      Last updated:
      <span> {days[day]}</span>
      <span> {hours}</span>:<span>{minutes}</span>
    </p>
  );
}
