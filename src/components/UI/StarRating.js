import styles from "./StarRating.module.css";

function StarRating({ rating, scale = 5, className = "" }) {
  const ratingSplit = rating + "".split(".");
  const fullStars = Number(ratingSplit[0]);
  const emptyStars = scale - Math.ceil(Number(ratingSplit));

  return (
    <div className={styles.layout}>
      {Array.from({ length: fullStars }, () => (
        <svg
          height="100%"
          width="100%"
          className={`${styles.filled} ${className}`}
          key={crypto.randomUUID()}
        >
          <use href="/sprite.svg#star-filled" />
        </svg>
      ))}
      {fullStars < scale && rating !== 0 && (
        <svg height="100%" width="100%" className={className}>
          <use href="/sprite.svg#star-half" />
        </svg>
      )}
      {Array.from({ length: emptyStars }, () => (
        <svg
          height="100%"
          width="100%"
          className={`${styles.empty} ${className}`}
          key={crypto.randomUUID()}
        >
          <use href="/sprite.svg#star-filled" />
        </svg>
      ))}
    </div>
  );
}

export default StarRating;
