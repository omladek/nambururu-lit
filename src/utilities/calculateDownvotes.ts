export default function calculateDownvotes(
  score: number,
  upvoteRatio: number,
): number {
  return score - Math.floor(score * upvoteRatio)
}
