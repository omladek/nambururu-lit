function removeTargetFromLinks(htmlString: string): string {
  const regex = /(<a[^>]+?)\s+target\s*=\s*("[^"]*"|'[^']*'|\S+)\s*/gi
  return htmlString.replace(regex, '$1')
}

function removeRelFromLinks(htmlString: string): string {
  const regex = /(<a[^>]+?)\s+rel\s*=\s*("[^"]*"|'[^']*'|\S+)\s*/gi
  return htmlString.replace(regex, '$1')
}

function addTargetBlank(html: string): string {
  const regex = /(<a\b[^>]*)(>)/gi
  return html.replace(regex, '$1 target="_blank" rel="noopener noreferrer"$2')
}

export default function updateAnchorTags(html: string): string {
  const withoutTarget = removeTargetFromLinks(html)
  const withoutRel = removeRelFromLinks(withoutTarget)
  return addTargetBlank(withoutRel)
}
